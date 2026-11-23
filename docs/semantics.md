# Preserve semantics while adopting Effect

| Migration | Required check |
| --- | --- |
| `Promise.all` | Effect operations are lazy; preserve ordering, failure behavior, and intentional parallelism. Set a bound for growing input. |
| `Promise.allSettled` | Preserve a result for every input, including failures; a fail-fast traversal is not equivalent. |
| `Promise.race` | Preserve first-completion behavior, including an early failure. |
| `Promise.any` | Preserve first-success behavior and define the all-failed result. |
| Timers | Preserve fixed-rate versus completion-spaced timing and what happens to overlapping work. |
| Current time | Keep wall-clock timestamps distinct from monotonic elapsed durations. |
| Random UUID | Preserve cryptographic security, UUID version, and output format. |
| JSON codecs | Preserve omitted fields, nullability, transformations, numbers, and the actual wire format. |
| Array find | Effect helpers may return Option instead of undefined and accept different callback arguments. |
| Path operations | Preserve explicitly requested POSIX or Windows semantics. |
| Streams | Preserve backpressure, ordering, finite versus infinite sources, and early-consumer termination. |
| Resource scopes | Keep the owner alive while a resource is used; closing a Scope does not make an escaped handle safe. |
| Layer reuse | Reusing a Layer and constructing a fresh Layer can create different instance and resource lifetimes. |
| Native crypto | Match the algorithm, encoding, and security properties before selecting an equivalent. |

Effect interruption can signal cancellation to a foreign API that accepts a
signal or cleanup operation. It cannot forcibly stop an uncancellable Promise.
Pass the provided signal where supported and describe the residual behavior.

Effect.all and Effect.forEach are sequential by default. A missing concurrency
option is a style decision to clarify, not evidence of unbounded parallelism.

Pure functions may remain ordinary TypeScript. Local mutation inside a pure,
non-escaping calculation does not automatically require Ref. A small finite
array does not automatically require Stream. Unsafe constructors are allowed
only where their documented preconditions are established; do not ban or adopt
them solely because of their name.
