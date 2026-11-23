# K: Concurrency and fibers

## Scope and exceptions

Effect.all and Effect.forEach are sequential by default. Fixed finite parallel work and application-owned detached fibers need explicit lifetime decisions.

## Policies

### K1: Compose concurrent work with Effect

Use Effect.all or Effect.forEach rather than Promise fan-out for Effect-based operations.

**Automatic reminders:** `effect-v4-promise-fanout`

**Related diagnostics:** `promiseAllInEffect`, `allOfMapToForEach`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### K2: Bound growing concurrency

Set a deliberate concurrency limit for input-dependent fan-out. Keep sequential execution when required; missing concurrency is not automatically unbounded.

**Automatic reminders:** `effect-v4-promise-fanout`

**Related diagnostics:** `missingConcurrencyOption`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### K3: Choose race semantics

Distinguish first completion from first success before replacing Promise.race or Promise.any. Ensure losing work is cancelled when supported.

**Automatic reminders:** `effect-v4-promise-race`, `effect-v4-abort-controller`

**Related diagnostics:** `promiseRaceInEffect`, `raceFirstWithSleepToTimeout`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### K4: Own fiber lifetimes

Choose forkChild, forkScoped, or an explicit Scope according to the owner. Use forkDetach only for intentionally application-owned background work.

**Automatic reminders:** `effect-v4-detached-fiber`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### K5: Handle background outcomes

Retain, join, interrupt, or observe fibers as required. Define how background failure and application shutdown are handled.

**Automatic reminders:** `effect-v4-detached-fiber`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### K6: Compose instead of starting runtimes

Inside business Effects, yield or combine Effects instead of calling Effect.run operations. Runtime execution belongs to an explicit foreign boundary.

**Automatic reminders:** `effect-v4-runtime-in-business`

**Related diagnostics:** `runEffectInsideEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/concurrency/fibers)
