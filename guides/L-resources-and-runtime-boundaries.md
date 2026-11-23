# L: Resources and runtime boundaries

## Scope and exceptions

Exclude application entry points and framework bridges from the configured scope. A truly pure synchronous constructor can use its documented safe or Unsafe API when its preconditions are proved.

## Policies

### L1: Pair acquisition and release

Use acquireRelease, acquireUseRelease, or acquireDisposable for owned resources as appropriate. Define acquisition failure behavior.

**Automatic reminders:** `effect-v4-bun-sockets`, `effect-v4-bun-sql`

**Related diagnostics:** `acquireReleaseDisposable`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### L2: Close the owning Scope

Open and close Scope at the owner of the resource lifetime. Do not remove Scope requirements with a cast.

**Automatic reminders:** `effect-v4-bun-sockets`

**Related diagnostics:** `scopeInLayerEffect`, `unsafeEffectTypeAssertion`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### L3: Clean up on every exit

Register finalizers so normal completion, failure, and interruption release resources. Avoid leaking resources when acquisition partially succeeds.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### L4: Keep resources inside their lifetime

Do not return or store a scoped resource for use after its owner has closed. Extend the owner scope instead.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### L5: Use the platform entry point

For a standalone application, run the main Effect with the correct platform runMain so shutdown and interruption are handled.

**Automatic reminders:** `effect-v4-process-exit`, `effect-v4-runtime-in-business`, `effect-v4-bun-argv`, `effect-v4-bun-http-server`, `effect-v4-bun-runtime-internals`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### L6: Centralize foreign runtime bridges

Integrate Promise-only frameworks at a dedicated adapter or entry point. Reuse the intended application context and dispose its lifetime correctly.

**Automatic reminders:** `effect-v4-process-exit`, `effect-v4-runtime-in-business`, `effect-v4-bun-runtime-internals`, `effect-v4-bun-module`

**Related diagnostics:** `runEffectInsideEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/resource-management/introduction)
