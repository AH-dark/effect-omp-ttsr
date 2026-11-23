# S: Testing policy

## Scope and exceptions

Tests are outside automatic business-source enforcement. Apply these testing policies when writing tests for business behavior; do not introduce production workarounds to satisfy a fixture.

## Policies

### S1: Control time with TestClock

Use TestClock to test sleeps, schedules, timeouts, and retries. Avoid real waits where virtual time can express the behavior.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### S2: Provide test services

Replace external dependencies with test Layers or services rather than patching global implementations.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### S3: Make random behavior reproducible

Inject a deterministic source for ordinary randomness. Make security-oriented test doubles explicit and isolated.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### S4: Assert the intended failure contract

Check the expected tagged error or Exit/Cause when that is the behavior under test. Avoid assertions that only accept any failure.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### S5: Test resource lifetimes when relevant

For resource-owning or concurrent behavior, verify cleanup, interruption, and background termination when they are material risks.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### S6: Use an Effect-aware test entry

Use an Effect-aware test API or explicitly run and await the Effect at the test boundary. Do not return an unevaluated Effect to a plain test callback.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `floatingEffectInVitest`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/testing/testclock)
