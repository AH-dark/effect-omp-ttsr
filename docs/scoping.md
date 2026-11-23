# Scope

## OMP path gates

OMP 19.0.1 combines a rule's `globs` as alternatives. Negative patterns in that
list are not an exclusion list. OMP also tries the basename when a full path
does not match.

The generator uses two intersecting gates:

1. Positive includes in `globs`, with relative and target-absolute forms. When
   `businessInclude` is empty or unset (the default), the include is `**/*`.
2. A single negative-union exclusion glob in each `tool:edit(...)` and
   `tool:write(...)` scope.

The exclusion glob begins with `!{*,...}`. The `*` alternative matches bare
filenames but not paths containing a slash. Consequently, every basename is
rejected by the negative union. An excluded directory cannot be admitted again
by OMP's basename fallback.

Do not remove the `*` alternative or turn the union into separate OR-ed globs.
Side effect: a bare relative path at the project root (for example `index.ts`)
never matches; the same file passed as an absolute path does.

The generator accepts POSIX globs without parentheses or newlines because OMP's
tool-scope grammar uses parentheses as delimiters. Avoid exotic nested patterns;
check matches with `omp ttsr test` after any scope change.

## tsgo path gates

All known Effect diagnostic names are off in the base configuration. One
override enables selected diagnostics for the includes (`**/*` by default) and
applies the exclusions. Normal TypeScript checking is a separate concern.

tsgo uses TypeScript file-pattern matching rather than Bun.Glob. The generator
expands brace alternatives such as `*.{ts,tsx}` into separate patterns. A literal
brace pattern would otherwise silently select no files in this matcher.

Paths in the generated output are tied to the installation target. Re-run the
installer if the repository moves. Monorepo includes are rooted at the target
you supplied, not at each package's current working directory.

## Explicit exceptions

Keep unavoidable native APIs in an excluded directory or narrow the scope with
`businessInclude`. Inject that adapter through a business-facing service.
Do not move business logic into an excluded folder merely to avoid diagnostics.

If an exception is required inside an included directory, narrow the exclusion
to the exact file and explain the reason in the project.

The default excludes only directories whose name contains `__` (such as
`__tests__` and `__mocks__`) and `dist`, `build`, and `coverage`. Test files
outside such directories, for example `*.test.ts`, are in scope.
