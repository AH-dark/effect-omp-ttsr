import fs from "node:fs";
import path from "node:path";
import { argumentsOf, libraryRoot, loadScope, readJson, renderRule, tsgoOptions, writeFile, writeJson } from "./common.mjs";

export function build({ output = path.join(libraryRoot, "preview"), target = "/path/to/project", scopeFile } = {}) {
  const scope = loadScope(scopeFile);
  const rules = readJson(path.join(libraryRoot, "catalog/triggers.json"));
  const policies = readJson(path.join(libraryRoot, "catalog/policies.json"));
  const diagnostics = readJson(path.join(libraryRoot, "catalog/diagnostics.json"));
  const rulesDir = path.join(output, ".omp/rules");
  if (fs.existsSync(rulesDir)) {
    for (const name of fs.readdirSync(rulesDir)) {
      if (name.startsWith("effect-v4-") && name.endsWith(".md")) fs.unlinkSync(path.join(rulesDir, name));
    }
  }
  for (const rule of rules) writeFile(path.join(rulesDir, `${rule.name}.md`), renderRule(rule, scope, target));
  writeJson(path.join(output, "tsgo-options.json"), tsgoOptions(scope, diagnostics, target));
  writeJson(path.join(output, "scope.json"), scope);
  writeJson(path.join(output, "summary.json"), {
    version: "1.0.0", policies: policies.length, targetedRules: rules.length,
    diagnostics: diagnostics.rules.filter((r) => r.severity !== "off").length,
    alwaysApplyRules: 0, judgedRules: 0,
    target: target === "/path/to/project" ? "Replace this placeholder by running the installer" : target
  });
  return { output, scope, rules, policies, diagnostics };
}
if (import.meta.url === new URL(process.argv[1], "file:").href) {
  const args = argumentsOf();
  const result = build({ output: args.output ? path.resolve(args.output) : undefined,
    target: args.target ? path.resolve(args.target) : undefined, scopeFile: args.scope });
  console.log(`Built ${result.policies.length} policies and ${result.rules.length} targeted TTSR rules in ${result.output}`);
}
