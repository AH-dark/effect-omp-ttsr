# E: Time and scheduling

## Scope and exceptions

Pure conversion of an existing timestamp may stay pure. Preserve wall-clock versus monotonic-time semantics, schedule timing, and time zones.

## Policies

### E1: Sleep with Effect

Use Effect.sleep for interruptible waiting. Do not implement sleeps with timers or Promise constructors.

**Automatic reminders:** `effect-v4-node-timers`, `effect-v4-global-timers`

**Related diagnostics:** `globalTimers`, `globalTimersInEffect`, `newPromise`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### E2: Schedule repeated work

Use Schedule and Effect repetition for recurring jobs. Specify fixed-rate versus spaced timing deliberately.

**Automatic reminders:** `effect-v4-node-timers`, `effect-v4-global-timers`

**Related diagnostics:** `globalTimers`, `globalTimersInEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### E3: Compose retries

Use Effect.retry with an explicit Schedule or retry policy. Bound attempts or elapsed time where required.

**Automatic reminders:** `effect-v4-node-timers`, `effect-v4-global-timers`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### E4: Read time through Clock

Get current time through Clock or the corresponding Effect time API so tests can control it.

**Automatic reminders:** `effect-v4-global-clock`

**Related diagnostics:** `globalDate`, `globalDateInEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### E5: Use DateTime for date operations

Use DateTime for domain date and time calculations when its semantics fit. Make time-zone and calendar assumptions explicit.

**Automatic reminders:** `effect-v4-global-clock`

**Related diagnostics:** `globalDate`, `globalDateInEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### E6: Make duration units explicit

Represent durations with Duration constructors or supported unit-bearing literals. Avoid unexplained numeric time constants.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/scheduling/using-schedules)
