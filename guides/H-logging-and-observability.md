# H: Logging and observability

## Scope and exceptions

Human-facing terminal output and protocol output are not application logs. Avoid adding spans to tiny pure helpers or high-cardinality metric labels.

## Policies

### H1: Use Effect logging

Write application logs with Effect.log operations and configured Logger services instead of global console methods.

**Automatic reminders:** `effect-v4-global-console`

**Related diagnostics:** `globalConsole`, `globalConsoleInEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### H2: Keep output channels separate

Use Console or Terminal for intentional user output. Keep logs separate from JSON, binary, or other machine-readable output.

**Automatic reminders:** `effect-v4-global-console`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### H3: Attach structured context

Attach stable structured log annotations for relevant identifiers. Do not encode every field into a free-form message.

**Automatic reminders:** `effect-v4-global-console`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### H4: Trace meaningful operations

Use named Effect.fn functions or spans for meaningful business and I/O operations. Preserve context across service calls.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `effectFnOpportunity`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### H5: Use Effect metrics

Record counters, durations, and other metrics through Effect Metric operations. Reuse metric definitions and control label cardinality.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `manualMetricTapToTrack`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### H6: Configure backends at composition

Configure logging, tracing, and metric export at the composition root. Avoid constructing a new backend on each business operation.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/observability/logging)
