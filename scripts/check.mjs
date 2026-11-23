import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { argumentsOf, libraryRoot, readJson } from "./common.mjs";

const args = argumentsOf();
const target = path.resolve(args.target ?? process.cwd());
const requireFromProject = createRequire(path.join(target, "package.json"));
const packageFile = requireFromProject.resolve("@effect/tsgo/package.json");
const pkg = readJson(packageFile);
const scope = readJson(path.join(libraryRoot, "scope.json"));
const options = readJson(path.join(libraryRoot, "tsgo-options.json"));
const versionParts = (v) => v.split(".").slice(0, 3).map((s) => Number.parseInt(s, 10));
function older(actual, expected) {
  const a = versionParts(actual), e = versionParts(expected);
  for (let i = 0; i < 3; i++) { if (a[i] !== e[i]) return a[i] < e[i]; }
  return false;
}
const schema = readJson(path.join(path.dirname(packageFile), "schema.json"));
const supported = schema.definitions?.effectLanguageServicePluginDiagnosticSeverityDefinition?.properties;
if (!supported) throw new Error("The installed tsgo schema does not expose diagnostic names");
// Future installed rules must not acquire their default severity outside the
// business override. Only the reviewed snapshot is enabled inside that scope.
for (const name of Object.keys(supported)) options.diagnosticSeverity[name] = "off";
const wanted = Object.keys(options.overrides[0].options.diagnosticSeverity);
const missing = wanted.filter((name) => !Object.hasOwn(supported, name));
if ((older(pkg.version, scope.minimumTsgoVersion) || missing.length) && !args["allow-older-tsgo"]) {
  throw new Error(`Install @effect/tsgo >= ${scope.minimumTsgoVersion}; found ${pkg.version}. Unsupported diagnostics: ${missing.join(", ") || "none"}. Use --allow-older-tsgo only for an explicitly reduced compatibility check.`);
}
if (args["allow-older-tsgo"]) {
  for (const map of [options.diagnosticSeverity, options.overrides[0].options.diagnosticSeverity]) {
    for (const name of Object.keys(map)) if (!Object.hasOwn(supported, name)) delete map[name];
  }
  console.error(`Compatibility mode: @effect/tsgo ${pkg.version}; omitted ${missing.length} unsupported diagnostics. This is not a full baseline-version verification.`);
}
const bins = typeof pkg.bin === "string" ? pkg.bin : pkg.bin?.["effect-tsgo"];
if (!bins) throw new Error("Cannot locate the installed effect-tsgo entry point");
const bin = path.resolve(path.dirname(packageFile), bins);
if (!fs.existsSync(bin)) throw new Error(`Missing effect-tsgo binary: ${bin}`);
const cli = [bin, "diagnostics", "--project", path.resolve(target, args.project ?? "tsconfig.json"),
  "--lspconfig", JSON.stringify(options), "--format", args.format ?? "pretty"];
const result = spawnSync(process.execPath, cli, { cwd: target, stdio: "inherit", env: process.env });
if (result.error) throw result.error;
if (result.signal) throw new Error(`Effect diagnostics terminated by ${result.signal}`);
process.exitCode = result.status ?? 1;
