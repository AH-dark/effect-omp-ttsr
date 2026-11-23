import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { argumentsOf, libraryRoot, readJson, sha256, walkFiles, writeFile, writeJson } from "./common.mjs";
import { build } from "./build.mjs";

export function install({ target, scopeFile, force = false }) {
  if (!target) throw new Error("Provide --target /path/to/project");
  target = fs.realpathSync(path.resolve(target));
  if (!fs.statSync(target).isDirectory()) throw new Error("The target must be an existing project directory");
  for (const rel of [".omp", ".omp/rules", ".omp/effect-template"]) {
    const p = path.join(target, rel);
    if (fs.existsSync(p) && (fs.lstatSync(p).isSymbolicLink() || !fs.statSync(p).isDirectory())) throw new Error(`Expected a normal directory: ${p}`);
  }
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "effect-template-install-"));
  try {
    const generated = build({ output: scratch, target, scopeFile });
    const destination = path.join(target, ".omp/effect-template");
    const previousPath = path.join(destination, "installed-files.json");
    const previous = fs.existsSync(previousPath) ? readJson(previousPath) : { files: {} };
    const plan = new Map();
    for (const file of walkFiles(path.join(scratch, ".omp/rules"))) plan.set(path.relative(scratch, file), fs.readFileSync(file));
    for (const directory of ["catalog", "config", "scripts", "guides", "docs", "examples", "tests", "templates", "validation"]) {
      for (const file of walkFiles(path.join(libraryRoot, directory))) plan.set(`.omp/effect-template/${path.relative(libraryRoot, file)}`, fs.readFileSync(file));
    }
    for (const name of ["package.json", "README.md", "CATALOG.md", "SOURCES.md", "NOTICE.md"]) plan.set(`.omp/effect-template/${name}`, fs.readFileSync(path.join(libraryRoot, name)));
    for (const name of ["scope.json", "tsgo-options.json", "summary.json"]) plan.set(`.omp/effect-template/${name}`, fs.readFileSync(path.join(scratch, name)));
    // Validate every conflict before writing anything. Never overwrite an unrelated file.
    for (const [rel, bytes] of plan) {
      const file = path.join(target, rel);
      if (fs.existsSync(file)) {
        if (fs.lstatSync(file).isSymbolicLink()) throw new Error(`Refusing symbolic link: ${file}`);
        const actual = sha256(fs.readFileSync(file));
        if (actual !== sha256(bytes) && (!previous.files[rel] || (actual !== previous.files[rel] && !force))) {
          throw new Error(`Existing file differs: ${rel}. Preserve it or use --force for previously installed files only.`);
        }
      }
    }
    const hashes = {};
    for (const [rel, bytes] of plan) {
      const file = path.join(target, rel);
      writeFile(file, bytes);
      hashes[rel] = sha256(bytes);
    }
    writeJson(previousPath, { version: "1.0.0", files: hashes });
    return { target, policies: generated.policies.length, rules: generated.rules.length };
  } finally { fs.rmSync(scratch, { recursive: true, force: true }); }
}
if (import.meta.url === new URL(process.argv[1], "file:").href) {
  const args = argumentsOf();
  if (args.help) console.log("Usage: node scripts/install.mjs --target /path/to/project [--scope scope.json] [--force]");
  else {
    const result = install({ target: args.target, scopeFile: args.scope, force: args.force });
    console.log(`Installed ${result.rules} project-scoped TTSR rules and ${result.policies} policies into ${result.target}`);
    console.log("No global OMP settings, package.json, or tsconfig.json were changed.");
    console.log("Run: node .omp/effect-template/scripts/check.mjs --project tsconfig.json");
  }
}
