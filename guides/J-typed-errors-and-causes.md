# J: Typed errors and causes

## Scope and exceptions

Invariant violations may be defects. Intentional recovery is allowed when the failure contract and interruption behavior remain correct.

## Policies

### J1: Use discriminated expected errors

Represent expected failures with useful tagged error types such as Data.TaggedError or Schema.TaggedError. Include actionable context.

**Automatic reminders:** `effect-v4-native-error-class`

**Related diagnostics:** `extendsNativeError`, `globalErrorInEffectFailure`, `preferSchemaTaggedError`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### J2: Fail through the error channel

Use Effect.fail or a supported yieldable error for expected business failure. Do not use thrown exceptions as the normal business failure path.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `tryCatchInEffectGen`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### J3: Preserve error information

Map foreign errors to domain errors while retaining the useful cause and context. Do not erase the original error with a generic string.

**Automatic reminders:** `effect-v4-native-error-class`

**Related diagnostics:** `globalErrorInEffectCatch`, `unknownInEffectCatch`, `catchAllToMapError`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### J4: Recover selectively

Use catchTag, catchTags, or an appropriate conditional catch for specific expected failures. Preserve unmatched failures.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `catchAllTagDispatchToCatchTag`, `catchIfTagToCatchTag`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### J5: Keep defects distinct

Do not convert all expected failures to defects with orDie. Use fatal failure only when the application contract really treats it as unrecoverable.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `redundantOrDie`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### J6: Preserve cancellation

When handling Cause, distinguish interruption from recoverable failure. Do not accidentally swallow interruption or convert cancellation into successful work.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/error-management/expected-errors)
