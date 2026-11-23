# effect-omp-ttsr

[![Release](https://img.shields.io/github/v/release/AH-dark/effect-omp-ttsr?sort=semver)](https://github.com/AH-dark/effect-omp-ttsr/releases/latest)
[![Release workflow](https://github.com/AH-dark/effect-omp-ttsr/actions/workflows/release.yml/badge.svg)](https://github.com/AH-dark/effect-omp-ttsr/actions/workflows/release.yml)

Ready-to-use [OMP](https://github.com/can1357/oh-my-pi) TTSR rules that keep
coding agents on idiomatic [Effect v4](https://effect.website/docs/v4/getting-started).
When an agent edits or writes code that reaches for a native API, such as
`fs`, `fetch`, `setTimeout`, `process.env`, or `Bun.*`, the matching rule
injects a short reminder that names the Effect replacement.

- **52 AST-based rules**: matched on syntax, never on prose, comments, or strings
- **26 Bun rules**: one per Bun API family, each with a concrete replacement
- **No always-apply prompt** and no model-judged rules
- **Backed by 120 policies** with detailed guides and a coverage map

## Installation

Download the latest release into your project's `.omp/rules/` directory:

```sh
mkdir -p .omp/rules
curl -fsSL https://github.com/AH-dark/effect-omp-ttsr/releases/latest/download/effect-omp-ttsr.tar.gz \
  | tar -xz --strip-components=1 -C .omp/rules
```

With the GitHub CLI:

```sh
gh release download -R AH-dark/effect-omp-ttsr -p 'effect-omp-ttsr.tar.gz' -O - \
  | tar -xz --strip-components=1 -C .omp/rules
```

Prefer a manual install? Download `effect-omp-ttsr.zip` from the
[latest release](https://github.com/AH-dark/effect-omp-ttsr/releases/latest),
extract it, and copy the `effect-omp-ttsr/*.md` files into `.omp/rules/`.
Each release also publishes `SHA256SUMS` for verifying the archives.

Then start OMP from the project root so it discovers `.omp/rules/`. Make sure
TTSR is enabled in your OMP settings.

### Updating

Run the install command again. Rule files are named `effect-v4-*.md`, so they
do not overwrite your own rules. Remove stale `effect-v4-*.md` files first if a
release renames or drops a rule.

## Usage

Nothing to configure. When an agent edit matches a rule, OMP injects its
reminder once per session. For example, writing

```ts
const text = await Bun.file("order.json").text()
```

triggers `effect-v4-bun-files`, which points to `FileSystem.readFileString`
and the `BunFileSystem` layer.

Direct platform calls such as `Bun.*`, Node built-in imports, and running an
Effect runtime inside business code interrupt the tool call. Ambiguous globals
such as `console` or `Date` produce a non-interrupting reminder.

## Scope

Rules apply to every file except these directories, at any depth:

| Pattern | Excludes |
| --- | --- |
| `**/*__*/**` | Any directory whose name contains `__`, such as `__tests__` and `__mocks__` |
| `**/dist/**` | Build output |
| `**/build/**` | Build output |
| `**/coverage/**` | Coverage reports |

Keep unavoidable native code, such as an SDK adapter or the application entry
point, in one of these directories or narrow the scope with a custom build. See
[CONTRIBUTING.md](CONTRIBUTING.md#custom-scope).

## What the rules cover

| Area | Native API | Effect replacement |
| --- | --- | --- |
| Files and paths | `fs`, `path`, `Bun.file`, `Bun.Glob` | `FileSystem`, `Path`, `Glob` |
| HTTP | `fetch`, `http`, `axios`, `Bun.serve`, `Bun.fetch` | `HttpClient`, `HttpRouter`, `HttpServer` |
| Processes | `child_process`, `Bun.spawn`, `Bun.$` | `ChildProcess`, `ChildProcessSpawner` |
| Time | `setTimeout`, `Date.now`, `Bun.sleep`, `Bun.cron` | `Effect.sleep`, `Clock`, `Schedule` |
| Randomness and crypto | `Math.random`, `crypto`, `Bun.password`, `Bun.CryptoHasher` | `Random`, `SecureRandom`, `Password`, `Digest` |
| Configuration | `process.env`, `Bun.env`, `Bun.argv` | `Config`, `Redacted`, `effect/cli` |
| Data and storage | `JSON.parse`, `Bun.sql`, `bun:sqlite`, `Bun.redis`, `Bun.TOML` | `Schema`, `SqlClient`, `Redis`, `effect/encoding` |
| Runtime | `Effect.runPromise` in business code, `process.exit` | `BunRuntime.runMain` at the entry point |

Full references:

- [CATALOG.md](CATALOG.md): all 120 policies and the rules and diagnostics behind each
- [guides/](guides/): detailed policies, exceptions, and references
- [docs/bun.md](docs/bun.md): Bun API to Effect replacement map
- [docs/enforcement.md](docs/enforcement.md): severity, prompt budget, and detection limits
- [docs/scoping.md](docs/scoping.md): how path gates work
- [docs/semantics.md](docs/semantics.md): migrations that need semantic care
- [examples/](examples/): business code and an explicit SDK adapter

## Limitations

- Matching is syntactic: aliases, destructuring, and shadowed bindings are not resolved.
- Reminders can arrive after a tool has written the code; they are not write-time rejection.
- Rules target the `edit` and `write` tools only.
- Policies about design, such as resource ownership or cache correctness, still need review.

For type-aware checks, add the Effect tsgo diagnostics described in
[CONTRIBUTING.md](CONTRIBUTING.md#type-aware-diagnostics).

## Compatibility

| Component | Version |
| --- | --- |
| OMP | 19.0.1 |
| Effect | 4.1.5 |
| `@effect/tsgo` diagnostic baseline | 0.73.5 |
| `bun-types` | 1.4.5 |

See [SOURCES.md](SOURCES.md) for pinned commits and references.

## Contributing

Building from source, customizing scope, type-aware diagnostics, and the
release process are documented in [CONTRIBUTING.md](CONTRIBUTING.md).

## Acknowledgements

See [NOTICE.md](NOTICE.md) for upstream attributions.
