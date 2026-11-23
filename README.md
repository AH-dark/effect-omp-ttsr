# Effect v4 OMP Template Library

A reusable, project-scoped policy library for Effect v4 business code.

- 120 policies across all 20 selected areas
- 27 short AST-based OMP TTSR rules, including Bun native APIs
- 141 scoped Effect tsgo diagnostics, with separate correctness and style severity
- 20 detailed policy guides and an explicit coverage map
- No always-apply prompt and no model-judged rules

TTSR provides timely reminders. Type-aware diagnostics catch semantic mistakes.
The policy catalog records architecture decisions that still require review.
No detector proves every part of a policy.

## Quick start

1. Edit `config/business-scope.json` if the default scope does not fit.
2. Install the templates into an existing project:

   ```sh
   node scripts/install.mjs --target /path/to/project
   ```

3. The diagnostics CLI needs a compatible native TypeScript installation. For a
   new project using the reference baseline:

   ```sh
   bun add -d @effect/tsgo@0.73.5 typescript@7.0.2
   ```

   For an existing project, review compiler compatibility first. Follow the
   upstream setup for a separate native TypeScript alias if the project must
   retain another compiler. Treat a compiler upgrade as a separate change.

4. Run the standalone business-policy check:

   ```sh
   node .omp/effect-template/scripts/check.mjs --project tsconfig.json
   ```

The installer writes `.omp/rules/effect-v4-*.md` and
`.omp/effect-template/`. It preserves `package.json`, `tsconfig.json`, existing
unrelated rules, and global OMP configuration. It does not install dependencies,
patch compilers, enable tools globally, or add an application-wide system prompt.

Start OMP from the installation target as its working directory so its native
project-rule discovery loads `.omp/rules/`. Do not assume a session launched
from a nested package automatically loads the root project's native rule files.

Run the installer again after changing scope. Previously installed files can be
regenerated; locally edited files are preserved by a conflict error.
`--force` can replace edited files already recorded as installed, but cannot
overwrite an unrelated conflicting file.

## Scope

The default scope sets no `businessInclude`, so rules and diagnostics apply to
every file in the installation target. Only these directories are excluded, at
any depth:

```text
**/*__*/**      (any directory whose name contains "__", e.g. __tests__)
**/dist/**
**/build/**
**/coverage/**
```

Set `businessInclude` to project-relative globs to narrow the scope.

For a monorepo:

```sh
node scripts/install.mjs --target /path/to/project --scope config/business-scope.monorepo.json
```

Custom scope files override the keys they contain and retain the remaining
defaults. Includes are relative to the installation target. Windows paths are
normalized to POSIX separators in generated OMP globs.

## What each layer checks

| Layer | Purpose | Important limit |
| --- | --- | --- |
| TTSR | Short reminders for direct imports and recognizable API calls | AST syntax does not resolve aliases or shadowed variables |
| tsgo | Type-aware Effect diagnostics within selected business files | The exact installed rule implementation determines detection coverage |
| Policy guides | Resource ownership, protocol semantics, cache correctness, and other design decisions | Requires contextual review |
| Existing project checks | Ordinary TypeScript errors and application behavior | Keep the project's existing checks and meaningful tests |

TTSR rule bodies are at most 80 words. All use `repeatMode: once` by default.
Direct platform imports and business runtime execution can interrupt tool calls.
Ambiguous global names use non-interrupting reminders. These reminders can arrive
after a tool has written the code; they are not write-time rejection.

The installer does not change `ttsr.enabled`. Enable TTSR in your existing OMP
configuration if you have disabled it. The rules target `edit` and `write`;
other write mechanisms need the completed-file diagnostics and review.

## Diagnostics without changing tsconfig

The supplied check passes the generated options through tsgo's inline
`--lspconfig` argument. It uses argument arrays, not a shell command string.
It reads the installed schema and fails when the baseline version or requested
diagnostic names are unavailable.

For an explicitly reduced compatibility check with an older tool:

```sh
node .omp/effect-template/scripts/check.mjs --project tsconfig.json --allow-older-tsgo
```

Compatibility mode reports omitted diagnostics. It does not qualify as a full
baseline-version check and should not silently replace your CI baseline.

For editor diagnostics, merge the object from
`.omp/effect-template/tsgo-options.json` into the existing
`compilerOptions.plugins` array. Preserve unrelated plugin entries and follow
the Effect tsgo setup instructions for your compiler/editor version.
An ordinary TypeScript compiler does not automatically execute this plugin
because a plugin object appears in tsconfig.

Correctness errors and clear native-API substitutions are errors. Contextual
anti-patterns are warnings. Style improvements are suggestions. Unsupported v3
checks, deprecated duplicate checks, unrelated generic lint rules, and conflicting
import-style prescriptions remain off. The diagnostic catalog lists every choice.
The standalone check fails on errors; warnings and suggestions remain visible.

## Read the library

- `CATALOG.md`: all 120 policies and their coverage
- `guides/`: detailed rules, exceptions, diagnostics, and references
- `docs/scoping.md`: path gates and exclusion behavior
- `docs/semantics.md`: migrations that need semantic care
- `docs/enforcement.md`: prompt budget, diagnostic severity, and coverage limits
- `examples/`: business code and an explicit SDK adapter
- `SOURCES.md`: versions, commits, and authoritative references

`bun run build` writes generated example files to `preview/` (not committed),
not a second installation. Each published GitHub release attaches the generated
`.omp/rules` directory as `.tar.gz` and `.zip` archives.
Generate project-specific files with the installer instead of copying placeholder
absolute paths from the preview.

The compiler and installer intentionally use Node APIs: they are development
tooling outside the business-code policy scope.
