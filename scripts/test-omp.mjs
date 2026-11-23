import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { argumentsOf, libraryRoot, readJson, writeFile, writeJson } from "./common.mjs";
import { build } from "./build.mjs";

const args = argumentsOf();
const omp = args.omp ?? "omp";
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "effect-template-omp-"));
const target = path.join(temp, "project");
fs.mkdirSync(target, { recursive: true });
const { rules } = build({ output: temp, target });
function run(argv, state) {
  return new Promise((resolve, reject) => {
    const child = spawn(omp, argv, { cwd: target,
      env: { ...process.env, PI_CODING_AGENT_DIR: state, NO_COLOR: "1" }, stdio: ["ignore", "pipe", "pipe"] });
    let output = "", error = "";
    child.stdout.on("data", (d) => { output += d; }); child.stderr.on("data", (d) => { error += d; });
    child.on("error", reject);
    child.on("close", (code) => code ? reject(new Error(`OMP exited ${code}: ${error || output}`)) : resolve(output));
  });
}
const cases = [];
const base = "src/domain/order.ts";
for (const rule of rules) {
  cases.push({ rule, name: "positive", snippet: rule.positive, path: base, expected: true });
  cases.push({ rule, name: "negative", snippet: rule.negative, path: base, expected: false });
  cases.push({ rule, name: "comment", snippet: `// ${rule.positive.replaceAll("\n", "\n// ")}`, path: base, expected: false });
  cases.push({ rule, name: "string", snippet: `const example = ${JSON.stringify(rule.positive)};`, path: base, expected: false });
  cases.push({ rule, name: "prose", snippet: rule.positive, path: base, source: "text", expected: false });
  cases.push({ rule, name: "other-tool", snippet: rule.positive, path: base, tool: "bash", expected: false });
  cases.push({ rule, name: "excluded-adapter", snippet: rule.positive, path: "src/domain/adapters/nested/order.ts", expected: false });
}
const rule = rules.find((r) => r.name === "effect-v4-global-console");
for (const p of [
  "src/domain/order.test.ts", "src/domain/order.spec.tsx", "src/domain/order.bench.mts", "src/domain/order.stories.tsx",
  "src/domain/order.d.ts", "src/domain/order.d.mts", "src/domain/order.config.cts",
  "src/domain/__tests__/nested/order.ts", "src/domain/__mocks__/order.ts", "src/domain/fixtures/order.ts",
  "src/domain/generated/nested/order.ts", "src/domain/__generated__/order.ts", "src/domain/infrastructure/order.ts",
  "src/domain/integrations/order.ts", "src/domain/scripts/order.ts", "src/domain/node_modules/a/order.ts",
  "src/domain/config/order.ts", "src/domain/configuration/order.ts", "src/domain/dist/order.ts",
  "src/adapters/order.ts", "src/index.ts", "src/components/order.tsx", "scripts/task.ts", "tests/order.ts",
  "src/domain/order.js", "README.md", "order.ts", "/another/project/src/domain/order.ts"
]) cases.push({ rule, name: `exclude:${p}`, snippet: rule.positive, path: p, expected: false });
for (const p of [base, "src/domain/nested/order.ts", "src/application/order.ts", "src/use-cases/order.ts",
  "src/domain/order.tsx", "src/domain/order.mts", "src/domain/order.cts", path.join(target, base)]) {
  cases.push({ rule, name: `include:${p}`, snippet: rule.positive, path: p, expected: true });
}
for (const tool of ["edit", "write"]) cases.push({ rule, name: `tool:${tool}`, snippet: rule.positive, path: base, tool, expected: true });
// Test each declarative pattern using concrete syntax, including named,
// namespace, default, require, and dynamic import forms.
for (const r of rules) for (const pattern of r.patterns) {
  let snippet = pattern;
  if (pattern.startsWith("import $$$ from")) {
    const module = JSON.parse(pattern.slice(pattern.indexOf('"')));
    for (const binding of ["{ readFile }", "* as native", "native"]) cases.push({ rule: r,
      name: `import:${module}:${binding}`, snippet: `import ${binding} from ${JSON.stringify(module)};`, path: base, expected: true });
    continue;
  }
  snippet = snippet.replaceAll("$$$", "").replaceAll("$NAME", "DomainError");
  cases.push({ rule: r, name: `pattern:${pattern}`, snippet, path: base, expected: true });
}
let cursor = 0;
const failures = [], records = [];
const version = (await run(["--version"], path.join(temp, "version-state"))).trim();
try {
  await Promise.all(Array.from({ length: 4 }, async (_, worker) => {
    const state = path.join(temp, `state-${worker}`);
    while (cursor < cases.length) {
      const item = cases[cursor++];
      try {
        const output = await run(["ttsr", "test", "--rule", path.join(temp, ".omp/rules", `${item.rule.name}.md`),
          "--source", item.source ?? "tool", "--tool", item.tool ?? "edit", "--path", item.path, "--json", item.snippet], state);
        const result = JSON.parse(output);
        assert(!result.error, result.error);
        assert.equal(result.evaluated, 1);
        const triggered = result.triggered.some((r) => r.name === item.rule.name);
        assert.equal(triggered, item.expected, `${item.rule.name} ${item.name}: expected ${item.expected}, got ${triggered}`);
        records.push({ rule: item.rule.name, case: item.name, passed: true });
      } catch (error) { failures.push({ rule: item.rule.name, case: item.name, error: error.message }); }
    }
  }));
  const report = { ompVersion: version, total: cases.length, passed: records.length, failed: failures.length,
    coverage: ["positive and negative syntax", "all declared AST patterns", "comments and string literals", "tool and prose scope", "relative and absolute paths", "business inclusions and nested exclusions"],
    notTested: ["live interruption and resume lifecycle", "partial JSON tool streams", "multi-file matcherEntries", "repeat state across compaction", "semantic symbol resolution"], failures };
  writeJson(path.join(libraryRoot, "validation/omp-fixtures.json"), report);
  console.log(JSON.stringify(report, null, 2));
  if (failures.length) process.exitCode = 1;
} finally { fs.rmSync(temp, { recursive: true, force: true }); }
