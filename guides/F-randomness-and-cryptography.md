# F: Randomness and cryptography

## Scope and exceptions

Ordinary seeded Random is not cryptographically secure. Verify SecureRandom operations and layer requirements against the installed v4 package.

## Policies

### F1: Use Random for ordinary randomness

Use the Random service for ordinary random choices instead of Math.random.

**Automatic reminders:** `effect-v4-global-random`

**Related diagnostics:** `globalRandom`, `globalRandomInEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### F2: Use appropriate random operations

Use Random operations with documented integer-range and shuffle semantics. Check whether bounds are inclusive or exclusive.

**Automatic reminders:** `effect-v4-global-random`

**Related diagnostics:** `globalRandom`, `globalRandomInEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### F3: Use SecureRandom for UUIDs

Use SecureRandom from effect/crypto for secure UUID generation when the installed version supports the needed format.

**Automatic reminders:** `effect-v4-node-crypto`, `effect-v4-secure-uuid`

**Related diagnostics:** `cryptoRandomUUID`, `cryptoRandomUUIDInEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### F4: Keep security guarantees

Use a cryptographically secure source for tokens, secrets, and security-sensitive identifiers. Never replace it with seeded Random.

**Automatic reminders:** `effect-v4-node-crypto`, `effect-v4-secure-uuid`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### F5: Control randomness in tests

Provide a deterministic Random seed or test service for ordinary randomness. Keep security-sensitive test doubles explicit.

**Automatic reminders:** `effect-v4-global-random`, `effect-v4-secure-uuid`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### F6: Adapt unmatched crypto operations

Use an Effect crypto operation only when algorithm, encoding, timing, and security properties match. Put unmatched native crypto behind an adapter.

**Automatic reminders:** `effect-v4-node-crypto`

**Related diagnostics:** `nodeBuiltinImport`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/requirements-management/default-services)
