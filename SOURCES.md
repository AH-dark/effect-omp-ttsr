# Sources and compatibility

Reference date: 2026-11-24.

| Component | Reference |
| --- | --- |
| OMP | Local `omp/19.0.1`; rules tested through its TTSR CLI |
| Effect | Current v4 guides; source snapshot reports version 4.1.5 |
| Effect source commit | `0d2bb4a4b6526e1767b81101ee6e8da88ba1de55` |
| tsgo diagnostic baseline | `@effect/tsgo@0.73.5` |
| tsgo source commit | `d245bc034a0cee10944d5327a2974ae0cf5ae3f0` |
| Local compatibility smoke tools | Recorded separately in `validation/tsgo-smoke.json` |

Authoritative references:

- [Effect v4 guides](https://effect.website/docs/v4/getting-started)
- [Effect v4 FileSystem](https://effect.website/docs/v4/platform/file-system)
- [Effect v4 services](https://effect.website/docs/v4/requirements-management/services)
- [Effect v4 resource management](https://effect.website/docs/v4/resource-management/introduction)
- [Effect v4 fibers](https://effect.website/docs/v4/concurrency/fibers)
- [Effect v4 configuration](https://effect.website/docs/v4/configuration)
- [Effect v4 Schema](https://effect.website/docs/v4/schema/getting-started)
- [Effect v4 TestClock](https://effect.website/docs/v4/testing/testclock)
- [SecureRandom API](https://effect.website/docs/v4/api/effect/crypto/SecureRandom)
- [Effect source snapshot](https://github.com/Effect-TS/effect/tree/0d2bb4a4b6526e1767b81101ee6e8da88ba1de55)
- [tsgo diagnostic metadata snapshot](https://github.com/Effect-TS/tsgo/blob/d245bc034a0cee10944d5327a2974ae0cf5ae3f0/_packages/tsgo/src/metadata.json)
- [tsgo options schema snapshot](https://github.com/Effect-TS/tsgo/blob/d245bc034a0cee10944d5327a2974ae0cf5ae3f0/schema.json)
- [tsgo configuration implementation](https://github.com/Effect-TS/tsgo/blob/d245bc034a0cee10944d5327a2974ae0cf5ae3f0/etscore/options.go)
- [tsgo diagnostics CLI](https://github.com/Effect-TS/tsgo/blob/d245bc034a0cee10944d5327a2974ae0cf5ae3f0/_packages/tsgo/src/cli/index.ts)
- [OMP 19.0.1 rule parser](https://github.com/can1357/oh-my-pi/blob/v19.0.1/packages/coding-agent/src/capability/rule.ts)
- [OMP matching pipeline](https://github.com/can1357/oh-my-pi/blob/main/docs/rulebook-matching-pipeline.md)
- [OMP injection lifecycle](https://github.com/can1357/oh-my-pi/blob/main/docs/ttsr-injection-lifecycle.md)

The current v4 package uses `effect/http`, `effect/process`, and `effect/crypto`.
Earlier v4 prereleases used different paths. The templates describe current v4
and require checking your installed exports before applying a migration.

The preview profile uses the pinned diagnostic names. Updating the snapshot
requires reviewing renamed rules, version support, severity, aliases, schema
options, and the semantics of any suggested replacements.
