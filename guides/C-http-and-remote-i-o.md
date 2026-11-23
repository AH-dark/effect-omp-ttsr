# C: HTTP and remote I/O

## Scope and exceptions

A required vendor SDK may remain behind an injected adapter. Preserve status handling, streaming, retry, and cancellation behavior when migrating.

## Policies

### C1: Use HttpClient

Use an injected Effect HttpClient for HTTP requests instead of global fetch or direct Node HTTP calls.

**Automatic reminders:** `effect-v4-node-http`, `effect-v4-foreign-http-clients`, `effect-v4-global-fetch`, `effect-v4-bun-http-client`

**Related diagnostics:** `globalFetch`, `globalFetchInEffect`, `nodeBuiltinImport`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### C2: Prefer the existing Effect HTTP stack

Use existing Effect HTTP capabilities before adding another HTTP client. Put unavoidable vendor clients behind a service.

**Automatic reminders:** `effect-v4-foreign-http-clients`, `effect-v4-bun-http-server`, `effect-v4-bun-cookies`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### C3: Choose status handling explicitly

Specify which HTTP status codes count as success or typed failure. Do not assume transport success implies application success.

**Automatic reminders:** `effect-v4-node-http`, `effect-v4-global-fetch`, `effect-v4-bun-http-client`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### C4: Decode response boundaries

Decode external response bodies with a Schema. Keep transport, parsing, and domain validation errors distinguishable.

**Automatic reminders:** `effect-v4-global-fetch`, `effect-v4-bun-http-client`

**Related diagnostics:** `schemaSyncInEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### C5: Own response resources

Consume response bodies in the lifetime required by the HTTP API. Do not leak a response stream past its resource scope.

**Automatic reminders:** `effect-v4-node-http`, `effect-v4-global-fetch`, `effect-v4-bun-http-client`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### C6: Preserve request policies

Define timeout and retry behavior deliberately. Retry only operations and failures for which repeating work is safe.

**Automatic reminders:** `effect-v4-node-http`, `effect-v4-global-fetch`, `effect-v4-bun-http-client`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/platform/introduction)
