# T: Diagnostics and enforcement

## Scope and exceptions

Only selected business files receive additional diagnostics. Existing TypeScript checking remains the project own responsibility; TTSR is guidance, not a complete static analyzer.

## Policies

### T1: Detect floating Effects

Enable type-aware checks for Effect values that are neither composed nor executed. Fix the missing execution instead of hiding the value.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `floatingEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### T2: Keep error and dependency channels accurate

Check missing Effect errors, Effect requirements, and Layer requirements. Preserve useful inferred types.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `missingEffectError`, `missingEffectContext`, `missingLayerContext`, `anyUnknownInErrorContext`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### T3: Reject channel-erasing assertions

Reject assertions that narrow Effect, Stream, or Layer errors or requirements without providing or handling them.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `unsafeEffectTypeAssertion`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### T4: Detect nested asynchronous values

Check accidental Effect-in-Effect and Promise-in-Effect success values. Yield or flatten only when that matches the intended return contract.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `returnEffectInGen`, `effectInVoidSuccess`, `promiseInEffectSuccess`, `lazyPromiseInEffectSync`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### T5: Enable selected native API checks

Enable the API diagnostics that match the selected policies. Keep style recommendations lower severity than correctness failures.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `nodeBuiltinImport`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### T6: Run scoped checks without bypasses

Run the supplied project check in CI. Do not suppress diagnostics or rename bindings merely to evade a policy; document a narrow justified exception.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/getting-started)
