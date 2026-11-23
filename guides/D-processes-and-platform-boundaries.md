# D: Processes and platform boundaries

## Scope and exceptions

Low-level platform operations without an equivalent belong in adapters. Command argument and environment semantics must remain unchanged.

## Policies

### D1: Use ChildProcess

Describe subprocesses with the installed v4 ChildProcess API and execute them through ChildProcessSpawner.

**Automatic reminders:** `effect-v4-node-child-process`

**Related diagnostics:** `nodeBuiltinImport`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### D2: Prefer explicit argument arrays

Pass command arguments as separate values. Use a shell only when shell semantics are required and inputs are handled safely.

**Automatic reminders:** `effect-v4-node-child-process`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### D3: Inject process execution

Expose subprocess execution through an injected service. Business modules should not start a global process executor.

**Automatic reminders:** `effect-v4-node-child-process`

**Related diagnostics:** `nodeBuiltinImport`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### D4: Stream subprocess output

Consume potentially large subprocess output incrementally with Stream or Sink. Choose a bounded collection limit when collecting.

**Automatic reminders:** `effect-v4-node-child-process`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### D5: Keep exit decisions at startup

Return typed outcomes from business code. Application startup owns exit status, shutdown, and signal handling.

**Automatic reminders:** `effect-v4-process-exit`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### D6: Require a real replacement

Restrict Node APIs that have suitable Effect replacements. For unmatched capabilities, define an adapter instead of inventing an Effect equivalent.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `nodeBuiltinImport`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/platform/introduction)
