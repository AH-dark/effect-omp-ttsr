# Bun native API replacements

Business code must not call Bun runtime APIs directly. Each row is a separate
TTSR rule that interrupts `edit` and `write` tool calls when the listed syntax
appears in scope. Provide the Bun implementation of each Effect service at the
entry point with `@effect/platform-bun` (`BunServices`, `BunRuntime.runMain`,
`BunHttpServer`, `BunHttpClient`, `BunFileSystem`, `BunRedis`, and related
layers).

Replacements follow the Effect v4 guides and the `effect` 4.1.5 exports
(`effect`, `effect/http`, `effect/process`, `effect/crypto`, `effect/sql`,
`effect/socket`, `effect/net`, `effect/persistence`, `effect/encoding`,
`effect/cli`).

| Rule | Bun API | Effect replacement |
| --- | --- | --- |
| `effect-v4-bun-files` | `Bun.file`, `Bun.write`, `Bun.mmap`, `Bun.embeddedFiles` | `FileSystem`: `readFile`, `readFileString`, `writeFile`, `writeFileString`, `stream`, `sink`, scoped `open` |
| `effect-v4-bun-glob` | `Bun.Glob` | `FileSystem.glob`; `Glob.make` / `Glob.match` for pure matching |
| `effect-v4-bun-paths` | `Bun.fileURLToPath`, `Bun.pathToFileURL`, `Bun.resolve`, `Bun.resolveSync`, `Bun.main` | `Path`: `fromFileUrl`, `toFileUrl`, `resolve`; module resolution stays at the entry point |
| `effect-v4-bun-stdio` | `Bun.stdin`, `Bun.stdout`, `Bun.stderr`, `Bun.Terminal`, ANSI helpers (`Bun.stringWidth`, `Bun.stripANSI`, `Bun.sliceAnsi`, `Bun.wrapAnsi`, `Bun.color`, `Bun.enableANSIColors`) | `Terminal`, `Stdio`, `Console`, `Effect.log`; `effect/cli` output |
| `effect-v4-bun-argv` | `Bun.argv` | `effect/cli` `Command`, `Flag`, `Argument`; `Stdio.args` |
| `effect-v4-bun-env` | `Bun.env`, `Bun.secrets` | `Config`, `Config.schema`, `Config.Redacted`, `ConfigProvider` |
| `effect-v4-bun-http-server` | `Bun.serve`, `Bun.FileSystemRouter`, `Bun.CSRF` | `effect/http` `HttpRouter`, `HttpServer`, `HttpMiddleware`; `effect/http-api` `HttpApi` |
| `effect-v4-bun-http-client` | `Bun.fetch` | `HttpClient`, `HttpClientRequest`; `FetchHttpClient.layer` or `BunHttpClient` |
| `effect-v4-bun-cookies` | `Bun.Cookie`, `Bun.CookieMap` | `effect/http` `Cookies` |
| `effect-v4-bun-sockets` | `Bun.connect`, `Bun.listen`, `Bun.udpSocket`, `Bun.udp` | `effect/socket` `Socket`, `SocketServer`, `DatagramSocket` |
| `effect-v4-bun-dns` | `Bun.dns` | `effect/net` `Dns` |
| `effect-v4-bun-subprocess` | `Bun.spawn`, `Bun.spawnSync`, `Bun.$`, `Bun.which` | `effect/process` `ChildProcess`, `ChildProcessSpawner` |
| `effect-v4-bun-time` | `Bun.sleep`, `Bun.sleepSync`, `Bun.nanoseconds` | `Effect.sleep`; `Clock.currentTimeNanos`, `Clock.currentTimeMillis` |
| `effect-v4-bun-cron` | `Bun.cron` | `Cron`, `Schedule.cron` |
| `effect-v4-bun-password` | `Bun.password` | `effect/crypto` `Password` (`hash`, `verify`, `needsRehash`) with `Redacted` input |
| `effect-v4-bun-hashing` | `Bun.hash`, `Bun.CryptoHasher`, `Bun.sha`, `Bun.MD4`, `Bun.MD5`, `Bun.SHA1`, `Bun.SHA224`, `Bun.SHA256`, `Bun.SHA384`, `Bun.SHA512`, `Bun.SHA512_256` | `effect/crypto` `Digest`, `Mac`; `Hash` only for in-memory equality hashing |
| `effect-v4-bun-uuid` | `Bun.randomUUIDv7`, `Bun.randomUUIDv5` | `effect/crypto` `SecureRandom` (`uuidV7`, `uuidV4`); name-based v5 IDs from `Digest` |
| `effect-v4-bun-sql` | `Bun.sql`, `Bun.SQL`, `Bun.postgres`, `bun:sqlite` | `effect/sql` `SqlClient`, `SqlSchema`; `@effect/sql-sqlite-bun` or `@effect/sql-pg` layers |
| `effect-v4-bun-redis` | `Bun.redis`, `Bun.RedisClient` | `effect/persistence` `Redis` via `BunRedis`; `KeyValueStore`, `PersistedCache` |
| `effect-v4-bun-s3` | `Bun.s3`, `Bun.S3Client` | No Effect module: an injected service implemented in an excluded adapter Layer |
| `effect-v4-bun-streams` | `Bun.readableStreamTo*`, `Bun.ArrayBufferSink`, `Bun.concatArrayBuffers` | `Stream.fromReadableStream`, `Stream.decodeText`, `Stream.mkString`, `Stream.runCollect`, `Sink` |
| `effect-v4-bun-encoding` | `Bun.TOML`, `Bun.YAML`, `Bun.JSON5`, `Bun.JSONC`, `Bun.JSONL`, `Bun.XML` | `effect/encoding` `Toml`, `Yaml`, `Json5`, `Jsonc`, `Ndjson`, `Xml`, then `Schema` |
| `effect-v4-bun-compression` | `Bun.gzipSync`, `Bun.gunzipSync`, `Bun.deflateSync`, `Bun.inflateSync`, `Bun.zstd*`, `Bun.Archive` | `effect/encoding` `Zip`, `Tar`; `HttpMiddleware.compression`; other codecs in an injected adapter |
| `effect-v4-bun-data-utils` | `Bun.deepEquals`, `Bun.deepMatch`, `Bun.semver`, `Bun.inspect`, `Bun.escapeHTML` | `Equal.equals`, `SemVer`, `SemVerRange`, `Formatter.format`; HTML escaping in the rendering adapter |
| `effect-v4-bun-runtime-internals` | `Bun.build`, `Bun.plugin`, `Bun.Transpiler`, `Bun.gc`, `Bun.shrink`, `Bun.generateHeapSnapshot`, `Bun.peek`, `Bun.openInEditor`, `Bun.unsafe`, `Bun.allocUnsafe`, `Bun.indexOfLine`, `Bun.isMainThread`, `Bun.isStandaloneExecutable`, `Bun.version`, `Bun.version_with_sha`, `Bun.revision`, `Bun.Image`, `Bun.WebView`, `bun:ffi`, `bun:jsc` | Not for business code; keep in build scripts or the entry point |
| `effect-v4-bun-module` | `import ... from "bun"`, `require("bun")`, `import("bun")`, `globalThis.Bun` | The per-API replacement above |

## Limits

- Matching is syntactic. Destructuring such as `const { file } = Bun` and
  aliases such as `const B = Bun` are not detected.
- Named imports from `bun` (for example `import { $ } from "bun"`) trigger
  `effect-v4-bun-module`, not the per-API rule. Type-only imports also match.
- `bun:test` is not restricted.
- Bun APIs added after `bun-types` 1.4.5 are not listed until a rule is added.
