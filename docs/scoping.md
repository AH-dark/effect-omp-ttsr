# Business-only scope

## OMP path gates

OMP 19.0.1 combines a rule's `globs` as alternatives. Negative patterns in that
list are not an exclusion list. OMP also tries the basename when a full path
does not match.

The generator uses two intersecting gates:

1. Positive business includes in `globs`, with relative and target-absolute forms.
2. A single negative-union exclusion glob in each `tool:edit(...)` and
   `tool:write(...)` scope.

The exclusion glob begins with `!{*,...}`. The `*` alternative matches bare
filenames but not paths containing a slash. Consequently, every basename is
rejected by the negative union. An excluded directory cannot be admitted again
by OMP's basename fallback.

This gate is exercised through the installed OMP matcher in the fixture suite.
Do not remove the `*` alternative or turn the union into separate OR-ed globs.

The generator accepts POSIX globs without parentheses or newlines because OMP's
tool-scope grammar uses parentheses as delimiters. Avoid exotic nested patterns;
run the OMP fixtures after any scope change.

## tsgo path gates

All known Effect diagnostic names are off in the base configuration. One
override enables selected diagnostics for the business includes and excludes
the non-business patterns. Normal TypeScript checking is a separate concern.

tsgo uses TypeScript file-pattern matching rather than Bun.Glob. The generator
expands brace alternatives such as `*.{ts,tsx}` into separate patterns. A literal
brace pattern would otherwise silently select no files in this matcher.

Paths in the generated output are tied to the installation target. Re-run the
installer if the repository moves. Monorepo includes are rooted at the target
you supplied, not at each package's current working directory.

## Explicit exceptions

Keep unavoidable native APIs in an adapter or infrastructure directory already
excluded by the scope. Inject that adapter through a business-facing service.
Do not move business logic into an excluded folder merely to avoid diagnostics.

If an exception is required inside a business directory, narrow the exclusion
to the exact file and explain the reason in the project. Do not exclude the
entire business tree.

Tests remain outside automatic enforcement. The testing guide describes how to
test business behavior without enabling production API restrictions on test
frameworks, fixtures, or runner setup.
