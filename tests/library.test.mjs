import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import { test } from "node:test";
import { exclusionGate, expandBraces, libraryRoot, loadScope, readJson } from "../scripts/common.mjs";
import { build } from "../scripts/build.mjs";
import { install } from "../scripts/install.mjs";

test("all 120 policy IDs are present and diagnostic links exist", () => {
  const policies = readJson(path.join(libraryRoot, "catalog/policies.json"));
  const diagnostics = new Set(readJson(path.join(libraryRoot, "catalog/diagnostics.json")).rules.map((d) => d.name));
  assert.deepEqual(policies.map((p) => p.id), [..."ABCDEFGHIJKLMNOPQRST"].flatMap((l) => Array.from({ length: 6 }, (_, i) => `${l}${i + 1}`)));
  for (const p of policies) for (const d of p.diagnostics) assert(diagnostics.has(d));
  assert.equal(fs.readdirSync(path.join(libraryRoot, "guides")).filter((n) => n.endsWith(".md")).length, 20);
});
test("exclusion gate rejects OMP basename fallback", () => {
  const gate = exclusionGate(loadScope());
  assert(gate.startsWith("!{*,"));
  assert(gate.includes("**/adapters/**"));
});
test("generated diagnostics are off globally and enabled only in an excluded business override", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "effect-build-test-"));
  try {
    build({ output: tmp, target: "/example/project" });
    const o = readJson(path.join(tmp, "tsgo-options.json"));
    assert(Object.values(o.diagnosticSeverity).every((s) => s === "off"));
    assert.equal(o.overrides.length, 1);
    assert(o.overrides[0].include.every((g) => !g.includes("{")));
    assert(o.overrides[0].exclude.includes("**/adapters/**"));
    assert.equal(o.overrides[0].options.diagnosticSeverity.floatingEffect, "error");
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
});
test("installation is idempotent and preserves project configuration", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "effect-install-test-"));
  try {
    const initial = '{"name":"existing","scripts":{"check":"existing"}}\n';
    fs.writeFileSync(path.join(tmp, "package.json"), initial);
    fs.writeFileSync(path.join(tmp, "tsconfig.json"), '// Keep this JSONC file intact\n{}\n');
    const first = install({ target: tmp });
    assert.equal(first.rules, 26);
    install({ target: tmp });
    assert.equal(fs.readFileSync(path.join(tmp, "package.json"), "utf8"), initial);
    assert(fs.readFileSync(path.join(tmp, "tsconfig.json"), "utf8").startsWith("// Keep"));
    assert(!fs.existsSync(path.join(tmp, ".omp/RULES.md")));
    assert(!fs.existsSync(path.join(tmp, ".omp/settings.json")));
    const rule = path.join(tmp, ".omp/rules/effect-v4-global-console.md");
    fs.appendFileSync(rule, "Local customization\n");
    assert.throws(() => install({ target: tmp }), /Existing file differs/);
    install({ target: tmp, force: true });
    assert(!fs.readFileSync(rule, "utf8").includes("Local customization"));
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
});
test("tsgo brace alternatives expand into real TypeScript globs", () => {
  assert.deepEqual(expandBraces("src/{domain,application}/**/*.{ts,tsx}").sort(), [
    "src/domain/**/*.ts", "src/application/**/*.ts", "src/domain/**/*.tsx", "src/application/**/*.tsx"
  ].sort());
});
test("unrelated conflicting rule files are never overwritten, including force mode", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "effect-conflict-test-"));
  try {
    fs.mkdirSync(path.join(tmp, ".omp/rules"), { recursive: true });
    const file = path.join(tmp, ".omp/rules/effect-v4-global-console.md");
    fs.writeFileSync(file, "Unrelated rule\n");
    assert.throws(() => install({ target: tmp, force: true }), /Existing file differs/);
    assert.equal(fs.readFileSync(file, "utf8"), "Unrelated rule\n");
    assert(!fs.existsSync(path.join(tmp, ".omp/effect-template")));
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
});
test("custom monorepo includes retain standard exclusions", () => {
  const scope = loadScope(path.join(libraryRoot, "config/business-scope.monorepo.json"));
  assert(scope.businessInclude.some((g) => g.startsWith("packages/*/")));
  assert(scope.businessExclude.includes("**/generated/**"));
});
