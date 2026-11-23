# O: Streams and sinks

## Scope and exceptions

A small finite array is not automatically a stream. Preserve ordering, buffering, error behavior, and resource ownership when migrating a pipeline.

## Policies

### O1: Represent continuous data as Stream

Use Stream for ongoing or incremental effectful data sources instead of hand-managed event loops and native stream plumbing.

**Automatic reminders:** `effect-v4-node-streams`, `effect-v4-bun-streams`

**Related diagnostics:** `nodeBuiltinImport`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### O2: Preserve backpressure

Use bounded buffers and concurrency where load can grow. Do not let a faster producer create unlimited pending work.

**Automatic reminders:** `effect-v4-node-streams`, `effect-v4-bun-streams`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### O3: Avoid unbounded collection

Do not runCollect an unbounded source or load a large file without a size policy. Use incremental processing or an explicit bound.

**Automatic reminders:** `effect-v4-node-streams`, `effect-v4-bun-streams`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### O4: Scope stream resources

Acquire stream resources with stream-aware or scoped constructors. Keep their Scope alive while the stream is consumed.

**Automatic reminders:** `effect-v4-node-streams`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### O5: Use a fitting Sink

Use Sink or incremental folds for aggregation and output. Choose leftover and termination behavior deliberately.

**Automatic reminders:** `effect-v4-node-streams`, `effect-v4-bun-streams`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### O6: Preserve stream exits

Propagate failures and interruption through the stream pipeline. Clean up upstream work when the consumer stops early.

**Automatic reminders:** `effect-v4-node-streams`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/stream/introduction)
