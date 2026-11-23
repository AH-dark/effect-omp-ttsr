# Contributing

This guide covers building the rules from source, installing them with a custom
scope, type-aware diagnostics, changing the catalog, and publishing releases.
Most users only need the release archive described in the [README](README.md).

## Prerequisites

- [Bun](https://bun.sh) to run the build and install scripts
- [OMP](https://github.com/can1357/oh-my-pi) 19.0.1 or later to test rule matching
- [GitHub CLI](https://cli.github.com) to publish releases

## Repository layout

| Path | Contents |
| --- | --- |
| `catalog/policies.json` | The 120 policies and the rules and diagnostics linked to each |
| `catalog/triggers.json` | TTSR rule definitions: AST patterns, reminder body, interrupt mode |
| `catalog/diagnostics.json` | Effect tsgo diagnostic selection and severities |
| `config/business-scope.json` | Default scope, repeat mode, and tsgo baseline |
| `scripts/build.mjs` | Generates rules and tsgo options into an output directory |
| `scripts/install.mjs` | Installs generated files into a target project |
| `scripts/check.mjs` | Runs tsgo diagnostics with the generated options |
| `guides/`, `docs/`, `CATALOG.md` | Human-readable policy documentation |
| `.github/workflows/release.yml` | Packages rules into release archives |

## Building

```sh
bun run build
```

This writes generated rules to `preview/.omp/rules/` (ignored by Git). The
preview uses the placeholder target `/path/to/project`; release archives are
built from it.

## Installing from source

Install rules, tsgo options, and the check script into a project:

```sh
bun scripts/install.mjs --target /path/to/project
```

The installer writes `.omp/rules/effect-v4-*.md` and `.omp/effect-template/`.
It preserves `package.json`, `tsconfig.json`, unrelated rules, and global OMP
configuration. It does not install dependencies or change `ttsr.enabled`.

Run it again after changing scope. Locally edited files cause a conflict error;
`--force` replaces edited files that were recorded as installed, but never an
unrelated file.

### Custom scope

Pass a JSON file that overrides keys of `config/business-scope.json`:

```sh
bun scripts/install.mjs --target /path/to/project --scope my-scope.json
```

| Key | Meaning |
| --- | --- |
| `businessInclude` | Project-relative globs to check. Empty or unset means every file |
| `businessExclude` | Globs excluded even inside included directories |
| `repeatMode` | `once`, `after-gap`, or `always` |

`config/business-scope.monorepo.json` is an example that limits rules to
`domain` and `application` directories in `packages/*` and `apps/*`. Globs must
be POSIX, without parentheses or newlines, and includes need a directory
component. See [docs/scoping.md](docs/scoping.md) for how the path gates work.

## Type-aware diagnostics

TTSR matches syntax only. The Effect tsgo plugin adds 141 type-aware
diagnostics scoped to the same files. It needs a compatible native TypeScript.
For a new project on the reference baseline:

```sh
bun add -d @effect/tsgo@0.73.5 typescript@7.0.2
```

For an existing project, review compiler compatibility first and treat a
compiler upgrade as a separate change. After installing from source, run:

```sh
bun .omp/effect-template/scripts/check.mjs --project tsconfig.json
```

The check passes the generated options through tsgo's inline `--lspconfig`
argument, so `tsconfig.json` is not modified. It fails on errors and when the
installed tsgo lacks the baseline version or a requested diagnostic.
`--allow-older-tsgo` runs an explicitly reduced check and reports omitted
diagnostics; do not use it as a CI baseline.

For editor diagnostics, merge the object from
`.omp/effect-template/tsgo-options.json` into `compilerOptions.plugins`, keeping
unrelated plugin entries. See [docs/enforcement.md](docs/enforcement.md) for
severity choices.

## Changing rules

1. Edit the rule in `catalog/triggers.json`. Keep `body` at 80 words or fewer
   and provide `positive` and `negative` examples.
2. Link it both ways: list the rule in each related policy's `triggers` in
   `catalog/policies.json` and add `ttsr-reminder` to that policy's `coverage`.
3. Update the matching rows in `CATALOG.md` and the `**Automatic reminders:**`
   lines in `guides/`. Bun rules are also listed in [docs/bun.md](docs/bun.md).
4. Build and check matching against the real OMP matcher:

   ```sh
   bun run build
   omp ttsr test --rule preview/.omp/rules/<rule>.md \
     --source tool --tool edit --path src/example.ts --json '<snippet>'
   ```

   Confirm the positive example triggers and the negative example, comments,
   and strings do not.

Keep all files ASCII and in English.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat(rules): add Bun cookie replacement
fix(scope): exclude coverage directories
docs: document custom scope keys
ci: attach SHA256SUMS to releases
```

Common types are `feat`, `fix`, `docs`, `refactor`, `ci`, and `chore`. Use
`feat!` or a `BREAKING CHANGE:` footer when a rule is renamed or removed,
because installed rule files are matched by name. Sign every commit.

## Releasing

Releases follow [Semantic Versioning](https://semver.org/). Create a signed tag
and publish a release:

```sh
git tag -s v1.2.3 -m v1.2.3
git push origin v1.2.3
gh release create v1.2.3 --verify-tag --generate-notes
```

Publishing triggers `.github/workflows/release.yml`, which builds the tagged
commit and attaches `effect-omp-ttsr.tar.gz`, `effect-omp-ttsr.zip`, and
`SHA256SUMS`. Both archives extract to an `effect-omp-ttsr/` directory of rule
files. The workflow runs the version from the tagged commit, so workflow changes
only take effect in releases tagged after them.
