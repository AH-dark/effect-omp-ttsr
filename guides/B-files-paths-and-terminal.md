# B: Files, paths, and terminal

## Scope and exceptions

Exclude platform adapters and application startup from the configured scope. Preserve required platform-specific path behavior.

## Policies

### B1: Use FileSystem

Read, write, inspect, copy, remove, and enumerate files through the FileSystem service.

**Automatic reminders:** `effect-v4-node-files`, `effect-v4-bun-files`, `effect-v4-bun-glob`

**Related diagnostics:** `nodeBuiltinImport`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### B2: Avoid blocking filesystem calls

Keep synchronous filesystem I/O out of business code. Wrapping a blocking Node operation in Effect.sync does not make it nonblocking.

**Automatic reminders:** `effect-v4-node-files`, `effect-v4-bun-files`

**Related diagnostics:** `nodeBuiltinImport`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### B3: Use the Path service

Use the injected Path service for platform-dependent path operations. Make POSIX or Windows-specific semantics explicit.

**Automatic reminders:** `effect-v4-node-path`, `effect-v4-bun-paths`

**Related diagnostics:** `nodeBuiltinImport`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### B4: Scope filesystem resources

Use scoped file handles and scoped temporary resources when their lifetime belongs to the operation. Close or remove resources on interruption.

**Automatic reminders:** `effect-v4-node-files`, `effect-v4-bun-files`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### B5: Stream file changes and content

Use FileSystem stream and watch operations when processing incremental content or changes. Keep consumption bounded.

**Automatic reminders:** `effect-v4-node-files`, `effect-v4-bun-files`, `effect-v4-bun-glob`

**Related diagnostics:** `nodeBuiltinImport`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### B6: Use terminal services

Use Terminal for interactive input and output. Keep machine-readable command output separate from application logs.

**Automatic reminders:** `effect-v4-bun-stdio`

**Related diagnostics:** `nodeBuiltinImport`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/platform/file-system)
