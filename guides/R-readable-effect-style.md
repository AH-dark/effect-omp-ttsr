# R: Readable Effect style

## Scope and exceptions

A style rewrite must keep behavior and useful type inference. Unsafe constructors are not universally forbidden; prove and document their preconditions.

## Policies

### R1: Name meaningful Effect functions

Use a named Effect.fn for reusable effectful business operations where tracing and function structure benefit. Avoid wrapping a one-off expression as an IIFE.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `effectFnOpportunity`, `effectFnIife`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### R2: Keep sequential flow readable

Use Effect.gen for readable dependent steps. Avoid redundant nested generators and unneeded wrappers.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `effectDoNotation`, `nestedEffectGenYield`, `unnecessaryEffectGen`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### R3: Choose the operation that expresses intent

Use map for pure transformation, flatMap for dependent effects, and tap for observation. Keep value and error transformations distinct.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `flatMapToMap`, `flatMapToTap`, `effectMapFlatten`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### R4: Simplify only equivalent compositions

Use focused combinators for clearly equivalent constructions. Preserve eager versus lazy evaluation, concurrency, and error behavior.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `mapConstToAs`, `flatMapIgnoredParamToAndThen`, `catchAllToMapError`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### R5: Keep callback inference safe

Use explicit callback parameters when a point-free reference loses generics, selects a wrong overload, or receives unexpected extra arguments.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### R6: Prefer fitting Effect data helpers

Prefer Effect Array, Record, and String helpers when their semantics fit. Check Option returns, indexing, mutation, callback arguments, and Unicode behavior before replacing native operations.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `preferEffectArray`, `preferEffectRecord`, `preferEffectString`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/code-style/guidelines)
