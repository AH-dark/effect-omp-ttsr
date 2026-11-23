import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

export const libraryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
export const writeJson = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + "\n");
export const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
export function writeFile(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value);
}
export function argumentsOf(argv = process.argv.slice(2)) {
  const result = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith("--")) throw new Error(`Unexpected argument: ${token}`);
    const name = token.slice(2);
    if (["force", "allow-older-tsgo", "help", "all"].includes(name)) result[name] = true;
    else {
      if (!argv[i + 1] || argv[i + 1].startsWith("--")) throw new Error(`Missing value for ${token}`);
      result[name] = argv[++i];
    }
  }
  return result;
}
export function loadScope(file) {
  const defaults = readJson(path.join(libraryRoot, "config/business-scope.json"));
  const custom = file ? readJson(path.resolve(file)) : {};
  const result = { ...defaults, ...custom };
  for (const key of ["businessInclude", "businessExclude"]) {
    if (!Array.isArray(result[key]) || result[key].some((p) => typeof p !== "string" || !p || p.includes("\\") || /[()\n\r]/.test(p))) {
      throw new Error(`${key} must contain non-empty POSIX globs without parentheses or newlines`);
    }
  }
  if (!result.businessInclude.length) throw new Error("Select at least one business source glob");
  if (result.businessInclude.some((p) => p.startsWith("/") || p.startsWith("!") || p.split("/").includes("..") || !p.includes("/"))) {
    throw new Error("Business includes must be project-relative positive globs with a directory component");
  }
  if (!new Set(["once", "after-gap", "always"]).has(result.repeatMode)) throw new Error("Unsupported repeatMode");
  return result;
}
export function exclusionGate(scope) {
  // OMP matches each path, then its basename. The '*' alternative rejects every
  // basename so that an excluded directory cannot re-enter through that fallback.
  return `!{*,${scope.businessExclude.join(",")}}`;
}
export function includeGlobs(scope, target) {
  return scope.businessInclude.flatMap((glob) => [glob, `${target.replaceAll("\\", "/")}/${glob}`]);
}
export function expandBraces(pattern) {
  const match = /\{([^{}]*)\}/.exec(pattern);
  if (!match) return [pattern];
  const alternatives = match[1].split(",");
  if (alternatives.length < 2 || alternatives.some((s) => !s)) throw new Error(`Use comma-separated, non-empty brace alternatives: ${pattern}`);
  const result = alternatives.flatMap((part) => expandBraces(pattern.slice(0, match.index) + part + pattern.slice(match.index + match[0].length)));
  if (result.length > 1024) throw new Error("Scope brace expansion exceeds 1024 patterns");
  return result;
}
export function renderRule(rule, scope, target) {
  const gate = exclusionGate(scope);
  const lines = ["---", "globs:", ...includeGlobs(scope, target).map((s) => `  - ${JSON.stringify(s)}`),
    "scope:", `  - ${JSON.stringify(`tool:edit(${gate})`)}`, `  - ${JSON.stringify(`tool:write(${gate})`)}`,
    "astCondition:", ...rule.patterns.map((s) => `  - ${JSON.stringify(s)}`),
    `interruptMode: ${rule.interrupt === "tool-only" && !scope.interruptClearImports ? "never" : rule.interrupt}`,
    `repeatMode: ${scope.repeatMode}`, "---", rule.body, ""];
  return lines.join("\n");
}
export function tsgoOptions(scope, diagnostics, target) {
  const disabled = Object.fromEntries(diagnostics.rules.map((r) => [r.name, "off"]));
  const enabled = Object.fromEntries(diagnostics.rules.filter((r) => r.severity !== "off").map((r) => [r.name, r.severity]));
  return {
    name: "@effect/language-service", diagnostics: true,
    includeSuggestionsInTsc: true,
    ignoreEffectSuggestionsInTscExitCode: true,
    ignoreEffectWarningsInTscExitCode: true,
    ignoreEffectErrorsInTscExitCode: false,
    diagnosticSeverity: disabled,
    // tsgo uses TypeScript's file-pattern matcher, not Bun.Glob.
    overrides: [{ include: includeGlobs(scope, target).flatMap(expandBraces), exclude: scope.businessExclude.flatMap(expandBraces),
      options: { diagnosticSeverity: enabled,
        allowedUnstableApis: scope.allowedUnstableApis,
        allowedExperimentalApis: scope.allowedExperimentalApis } }]
  };
}
export function walkFiles(root) {
  const result = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const file = path.join(root, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Refusing a symbolic link in the template: ${file}`);
    if (entry.isDirectory()) result.push(...walkFiles(file));
    else if (entry.isFile()) result.push(file);
  }
  return result;
}
