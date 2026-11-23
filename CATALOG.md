# Policy catalog

All 120 selected policies are included. A listed detector covers a subcase; contextual review is still required.

| ID | Policy | TTSR reminders | Related diagnostics |
| --- | --- | --- | --- |
| A1 | Target the installed v4 version | Review / diagnostics | `duplicatePackage`, `outdatedApi` |
| A2 | Replace removed APIs | `effect-v4-obsolete-imports` | `outdatedApi` |
| A3 | Use integrated Schema and Match | `effect-v4-obsolete-imports` | `obsoleteSchemaImport`, `obsoleteMatchImport` |
| A4 | Use current platform imports | `effect-v4-obsolete-imports`, `effect-v4-bun-module` | `nodeBuiltinImport` |
| A5 | Verify uncertain APIs | Review / diagnostics | Review |
| A6 | Preserve dependency decisions | Review / diagnostics | Review |
| B1 | Use FileSystem | `effect-v4-node-files`, `effect-v4-bun-files`, `effect-v4-bun-glob` | `nodeBuiltinImport` |
| B2 | Avoid blocking filesystem calls | `effect-v4-node-files`, `effect-v4-bun-files` | `nodeBuiltinImport` |
| B3 | Use the Path service | `effect-v4-node-path`, `effect-v4-bun-paths` | `nodeBuiltinImport` |
| B4 | Scope filesystem resources | `effect-v4-node-files`, `effect-v4-bun-files` | Review |
| B5 | Stream file changes and content | `effect-v4-node-files`, `effect-v4-bun-files`, `effect-v4-bun-glob` | `nodeBuiltinImport` |
| B6 | Use terminal services | `effect-v4-bun-stdio` | `nodeBuiltinImport` |
| C1 | Use HttpClient | `effect-v4-node-http`, `effect-v4-foreign-http-clients`, `effect-v4-global-fetch`, `effect-v4-bun-http-client` | `globalFetch`, `globalFetchInEffect`, `nodeBuiltinImport` |
| C2 | Prefer the existing Effect HTTP stack | `effect-v4-foreign-http-clients`, `effect-v4-bun-http-server`, `effect-v4-bun-cookies` | Review |
| C3 | Choose status handling explicitly | `effect-v4-node-http`, `effect-v4-global-fetch`, `effect-v4-bun-http-client` | Review |
| C4 | Decode response boundaries | `effect-v4-global-fetch`, `effect-v4-bun-http-client` | `schemaSyncInEffect` |
| C5 | Own response resources | `effect-v4-node-http`, `effect-v4-global-fetch`, `effect-v4-bun-http-client` | Review |
| C6 | Preserve request policies | `effect-v4-node-http`, `effect-v4-global-fetch`, `effect-v4-bun-http-client` | Review |
| D1 | Use ChildProcess | `effect-v4-node-child-process`, `effect-v4-bun-subprocess` | `nodeBuiltinImport` |
| D2 | Prefer explicit argument arrays | `effect-v4-node-child-process`, `effect-v4-bun-subprocess` | Review |
| D3 | Inject process execution | `effect-v4-node-child-process`, `effect-v4-bun-subprocess` | `nodeBuiltinImport` |
| D4 | Stream subprocess output | `effect-v4-node-child-process`, `effect-v4-bun-subprocess` | Review |
| D5 | Keep exit decisions at startup | `effect-v4-process-exit` | Review |
| D6 | Require a real replacement | `effect-v4-bun-runtime-internals` | `nodeBuiltinImport` |
| E1 | Sleep with Effect | `effect-v4-node-timers`, `effect-v4-global-timers`, `effect-v4-bun-time` | `globalTimers`, `globalTimersInEffect`, `newPromise` |
| E2 | Schedule repeated work | `effect-v4-node-timers`, `effect-v4-global-timers`, `effect-v4-bun-cron` | `globalTimers`, `globalTimersInEffect` |
| E3 | Compose retries | `effect-v4-node-timers`, `effect-v4-global-timers` | Review |
| E4 | Read time through Clock | `effect-v4-global-clock`, `effect-v4-bun-time` | `globalDate`, `globalDateInEffect` |
| E5 | Use DateTime for date operations | `effect-v4-global-clock` | `globalDate`, `globalDateInEffect` |
| E6 | Make duration units explicit | Review / diagnostics | Review |
| F1 | Use Random for ordinary randomness | `effect-v4-global-random` | `globalRandom`, `globalRandomInEffect` |
| F2 | Use appropriate random operations | `effect-v4-global-random` | `globalRandom`, `globalRandomInEffect` |
| F3 | Use SecureRandom for UUIDs | `effect-v4-node-crypto`, `effect-v4-secure-uuid`, `effect-v4-bun-uuid` | `cryptoRandomUUID`, `cryptoRandomUUIDInEffect` |
| F4 | Keep security guarantees | `effect-v4-node-crypto`, `effect-v4-secure-uuid`, `effect-v4-bun-password`, `effect-v4-bun-hashing`, `effect-v4-bun-uuid` | Review |
| F5 | Control randomness in tests | `effect-v4-global-random`, `effect-v4-secure-uuid`, `effect-v4-bun-uuid` | Review |
| F6 | Adapt unmatched crypto operations | `effect-v4-node-crypto`, `effect-v4-bun-hashing` | `nodeBuiltinImport` |
| G1 | Read configuration through Config | `effect-v4-process-env`, `effect-v4-bun-argv`, `effect-v4-bun-env` | `processEnv`, `processEnvInEffect` |
| G2 | Validate configuration types | `effect-v4-process-env`, `effect-v4-bun-env` | Review |
| G3 | Make defaults intentional | `effect-v4-process-env` | Review |
| G4 | Redact secrets | `effect-v4-process-env`, `effect-v4-bun-env`, `effect-v4-bun-password` | Review |
| G5 | Limit secret access | `effect-v4-bun-env` | Review |
| G6 | Replace providers in tests | `effect-v4-process-env` | `processEnv`, `processEnvInEffect` |
| H1 | Use Effect logging | `effect-v4-global-console` | `globalConsole`, `globalConsoleInEffect` |
| H2 | Keep output channels separate | `effect-v4-global-console`, `effect-v4-bun-stdio` | Review |
| H3 | Attach structured context | `effect-v4-global-console` | Review |
| H4 | Trace meaningful operations | Review / diagnostics | `effectFnOpportunity` |
| H5 | Use Effect metrics | Review / diagnostics | `manualMetricTapToTrack` |
| H6 | Configure backends at composition | Review / diagnostics | Review |
| I1 | Return Effect from effectful business APIs | `effect-v4-new-promise` | `asyncFunction`, `effectFnOpportunity` |
| I2 | Keep pure code simple | Review / diagnostics | Review |
| I3 | Defer side effects | Review / diagnostics | `syncToSucceed` |
| I4 | Choose synchronous constructors correctly | `effect-v4-schema-sync`, `effect-v4-bun-compression` | `effectTryWithoutCatch` |
| I5 | Choose Promise constructors correctly | `effect-v4-promise-fanout`, `effect-v4-new-promise` | `effectTryWithoutCatch`, `lazyPromiseInEffectSync`, `promiseInEffectSuccess` |
| I6 | Bridge cancellation deliberately | `effect-v4-promise-race`, `effect-v4-new-promise`, `effect-v4-abort-controller` | `newPromise`, `abortControllerInEffect` |
| J1 | Use discriminated expected errors | `effect-v4-native-error-class` | `extendsNativeError`, `globalErrorInEffectFailure`, `preferSchemaTaggedError` |
| J2 | Fail through the error channel | Review / diagnostics | `tryCatchInEffectGen` |
| J3 | Preserve error information | `effect-v4-native-error-class` | `globalErrorInEffectCatch`, `unknownInEffectCatch`, `catchAllToMapError` |
| J4 | Recover selectively | Review / diagnostics | `catchAllTagDispatchToCatchTag`, `catchIfTagToCatchTag` |
| J5 | Keep defects distinct | Review / diagnostics | `redundantOrDie` |
| J6 | Preserve cancellation | Review / diagnostics | Review |
| K1 | Compose concurrent work with Effect | `effect-v4-promise-fanout` | `promiseAllInEffect`, `allOfMapToForEach` |
| K2 | Bound growing concurrency | `effect-v4-promise-fanout` | `missingConcurrencyOption` |
| K3 | Choose race semantics | `effect-v4-promise-race`, `effect-v4-abort-controller` | `promiseRaceInEffect`, `raceFirstWithSleepToTimeout` |
| K4 | Own fiber lifetimes | `effect-v4-detached-fiber` | Review |
| K5 | Handle background outcomes | `effect-v4-detached-fiber` | Review |
| K6 | Compose instead of starting runtimes | `effect-v4-runtime-in-business` | `runEffectInsideEffect` |
| L1 | Pair acquisition and release | `effect-v4-bun-sockets`, `effect-v4-bun-sql` | `acquireReleaseDisposable` |
| L2 | Close the owning Scope | `effect-v4-bun-sockets` | `scopeInLayerEffect`, `unsafeEffectTypeAssertion` |
| L3 | Clean up on every exit | Review / diagnostics | Review |
| L4 | Keep resources inside their lifetime | Review / diagnostics | Review |
| L5 | Use the platform entry point | `effect-v4-process-exit`, `effect-v4-runtime-in-business`, `effect-v4-bun-argv`, `effect-v4-bun-http-server`, `effect-v4-bun-runtime-internals` | Review |
| L6 | Centralize foreign runtime bridges | `effect-v4-process-exit`, `effect-v4-runtime-in-business`, `effect-v4-bun-runtime-internals`, `effect-v4-bun-module` | `runEffectInsideEffect` |
| M1 | Inject replaceable dependencies | `effect-v4-bun-sockets`, `effect-v4-bun-dns`, `effect-v4-bun-sql`, `effect-v4-bun-redis`, `effect-v4-bun-s3`, `effect-v4-bun-compression`, `effect-v4-bun-module` | `classSelfMismatch`, `genericEffectServices`, `serviceNotAsClass`, `deterministicKeys` |
| M2 | Construct implementations with Layer | `effect-v4-bun-s3` | `missingLayerContext` |
| M3 | Hide implementation requirements | Review / diagnostics | `leakingRequirements` |
| M4 | Compose layer dependencies correctly | Review / diagnostics | `layerMergeAllWithDependencies` |
| M5 | Choose sharing deliberately | Review / diagnostics | Review |
| M6 | Provide at the composition boundary | `effect-v4-bun-http-server`, `effect-v4-bun-sql` | `multipleEffectProvide`, `strictEffectProvide` |
| N1 | Decode external unknown values | `effect-v4-native-json`, `effect-v4-bun-encoding` | `preferTypedSchemaDecoder` |
| N2 | Use JSON codecs | `effect-v4-native-json`, `effect-v4-bun-encoding` | `globalJson`, `globalJsonInEffect` |
| N3 | Decode in the Effect error channel | `effect-v4-native-json`, `effect-v4-schema-sync`, `effect-v4-bun-encoding` | `schemaSync`, `schemaSyncInEffect` |
| N4 | Derive types from Schema | Review / diagnostics | `preferSchemaTypeProperty` |
| N5 | Keep encoded and decoded types distinct | `effect-v4-native-json` | `schemaClassObjectLiteral` |
| N6 | Validate without unsafe casts | `effect-v4-native-json` | `overriddenSchemaConstructor`, `schemaClassObjectLiteral` |
| O1 | Represent continuous data as Stream | `effect-v4-node-streams`, `effect-v4-bun-streams` | `nodeBuiltinImport` |
| O2 | Preserve backpressure | `effect-v4-node-streams`, `effect-v4-bun-streams` | Review |
| O3 | Avoid unbounded collection | `effect-v4-node-streams`, `effect-v4-bun-streams` | Review |
| O4 | Scope stream resources | `effect-v4-node-streams` | Review |
| O5 | Use a fitting Sink | `effect-v4-node-streams`, `effect-v4-bun-streams` | Review |
| O6 | Preserve stream exits | `effect-v4-node-streams` | Review |
| P1 | Use Ref for shared state | Review / diagnostics | Review |
| P2 | Serialize effectful atomic updates | Review / diagnostics | Review |
| P3 | Bound producer-consumer queues | Review / diagnostics | Review |
| P4 | Use appropriate notification primitives | Review / diagnostics | Review |
| P5 | Define cache correctness | `effect-v4-bun-redis` | Review |
| P6 | Batch equivalent requests safely | Review / diagnostics | Review |
| Q1 | Model meaningful absence | Review / diagnostics | Review |
| Q2 | Represent pure failures with Result | Review / diagnostics | Review |
| Q3 | Match closed unions exhaustively | Review / diagnostics | Review |
| Q4 | Brand easily confused values | Review / diagnostics | Review |
| Q5 | Use exact decimal semantics when required | Review / diagnostics | Review |
| Q6 | Choose equality and hashing semantics | `effect-v4-bun-hashing`, `effect-v4-bun-data-utils` | Review |
| R1 | Name meaningful Effect functions | Review / diagnostics | `effectFnOpportunity`, `effectFnIife` |
| R2 | Keep sequential flow readable | Review / diagnostics | `effectDoNotation`, `nestedEffectGenYield`, `unnecessaryEffectGen` |
| R3 | Choose the operation that expresses intent | Review / diagnostics | `flatMapToMap`, `flatMapToTap`, `effectMapFlatten` |
| R4 | Simplify only equivalent compositions | Review / diagnostics | `mapConstToAs`, `flatMapIgnoredParamToAndThen`, `catchAllToMapError` |
| R5 | Keep callback inference safe | Review / diagnostics | Review |
| R6 | Prefer fitting Effect data helpers | `effect-v4-bun-data-utils` | `preferEffectArray`, `preferEffectRecord`, `preferEffectString` |
| S1 | Control time with TestClock | Review / diagnostics | Review |
| S2 | Provide test services | Review / diagnostics | Review |
| S3 | Make random behavior reproducible | Review / diagnostics | Review |
| S4 | Assert the intended failure contract | Review / diagnostics | Review |
| S5 | Test resource lifetimes when relevant | Review / diagnostics | Review |
| S6 | Use an Effect-aware test entry | Review / diagnostics | `floatingEffectInVitest` |
| T1 | Detect floating Effects | Review / diagnostics | `floatingEffect` |
| T2 | Keep error and dependency channels accurate | Review / diagnostics | `missingEffectError`, `missingEffectContext`, `missingLayerContext`, `anyUnknownInErrorContext` |
| T3 | Reject channel-erasing assertions | Review / diagnostics | `unsafeEffectTypeAssertion` |
| T4 | Detect nested asynchronous values | Review / diagnostics | `returnEffectInGen`, `effectInVoidSuccess`, `promiseInEffectSuccess`, `lazyPromiseInEffectSync` |
| T5 | Enable selected native API checks | Review / diagnostics | `nodeBuiltinImport` |
| T6 | Run scoped checks without bypasses | Review / diagnostics | Review |
