import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { libraryRoot, readJson, walkFiles, writeJson } from "./common.mjs";

export function verify() {
  const policies = readJson(path.join(libraryRoot, "catalog/policies.json"));
  const rules = readJson(path.join(libraryRoot, "catalog/triggers.json"));
  const diagnostics = readJson(path.join(libraryRoot, "catalog/diagnostics.json")).rules;
  const ids = new Set(policies.map((p) => p.id));
  assert.equal(policies.length, 120);
  assert.equal(ids.size, 120);
  for (const letter of "ABCDEFGHIJKLMNOPQRST") for (let i = 1; i <= 6; i++) assert(ids.has(`${letter}${i}`));
  const names = new Set(rules.map((r) => r.name));
  assert.equal(names.size, rules.length);
  const diagnosticNames = new Set(diagnostics.map((d) => d.name));
  for (const policy of policies) {
    assert(policy.instruction && policy.exceptions && policy.source && policy.coverage.length);
    for (const d of policy.diagnostics) assert(diagnosticNames.has(d), `${policy.id}: unknown diagnostic ${d}`);
    for (const name of policy.triggers) assert(names.has(name), `${policy.id}: unknown trigger ${name}`);
  }
  for (const rule of rules) {
    assert(rule.body.trim().split(/\s+/).length <= 80, `${rule.name}: reminder exceeds 80 words`);
    assert(rule.patterns.length && rule.positive && rule.negative && rule.limitation);
    assert(["never", "tool-only"].includes(rule.interrupt));
    for (const id of rule.policies) assert(ids.has(id));
  }
  for (const file of walkFiles(libraryRoot)) {
    if (file.includes(`${path.sep}node_modules${path.sep}`)) continue;
    assert(!/[^\x00-\x7F]/.test(fs.readFileSync(file, "utf8")), `Non-English/non-ASCII content in ${path.relative(libraryRoot, file)}`);
  }
  return {
    policies: policies.length, groups: 20, targetedTtsrRules: rules.length,
    astPatterns: rules.reduce((n, r) => n + r.patterns.length, 0),
    enabledTsgoDiagnostics: diagnostics.filter((d) => d.severity !== "off").length,
    policiesWithTtsrReminders: policies.filter((p) => p.triggers.length).length,
    policiesWithListedDiagnostics: policies.filter((p) => p.diagnostics.length).length,
    policiesWithoutAutomaticDetectors: policies.filter((p) => !p.triggers.length && !p.diagnostics.length).length,
    alwaysApplyRules: 0, judgedRules: 0, status: "passed"
  };
}
if (import.meta.url === new URL(process.argv[1], "file:").href) {
  const result = verify();
  writeJson(path.join(libraryRoot, "validation/catalog-verification.json"), result);
  console.log(JSON.stringify(result, null, 2));
}
