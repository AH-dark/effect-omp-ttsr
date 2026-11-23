# I: Effect construction and interop

## Scope and exceptions

Pure helpers may return plain values. Promise-only framework callbacks and third-party adapters may use their required foreign types when excluded from the configured scope.

## Policies

### I1: Return Effect from effectful business APIs

Express effectful business functions as Effect values or functions returning Effect. Compose asynchronous steps with Effect.gen or Effect.fn.

**Automatic reminders:** `effect-v4-new-promise`

**Related diagnostics:** `asyncFunction`, `effectFnOpportunity`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### I2: Keep pure code simple

Leave deterministic pure calculations as ordinary functions unless an Effect abstraction provides a concrete benefit.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### I3: Defer side effects

Do not execute a side effect while constructing Effect.succeed or at module initialization. Put execution in a lazy Effect constructor.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `syncToSucceed`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### I4: Choose synchronous constructors correctly

Use Effect.sync for deferred operations whose thrown exceptions are defects. Use Effect.try with a typed catch mapping for expected exceptions.

**Automatic reminders:** `effect-v4-schema-sync`, `effect-v4-bun-compression`

**Related diagnostics:** `effectTryWithoutCatch`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### I5: Choose Promise constructors correctly

Use Effect.tryPromise with a typed catch mapping for expected rejection. Use Effect.promise only when rejection should be treated as a defect.

**Automatic reminders:** `effect-v4-promise-fanout`, `effect-v4-new-promise`

**Related diagnostics:** `effectTryWithoutCatch`, `lazyPromiseInEffectSync`, `promiseInEffectSuccess`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### I6: Bridge cancellation deliberately

Create foreign work lazily inside the Effect callback. Pass the provided AbortSignal when supported, and register callback cleanup without claiming that uncancellable work becomes cancellable.

**Automatic reminders:** `effect-v4-promise-race`, `effect-v4-new-promise`, `effect-v4-abort-controller`

**Related diagnostics:** `newPromise`, `abortControllerInEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/getting-started)
