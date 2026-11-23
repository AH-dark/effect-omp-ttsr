# G: Configuration and secrets

## Scope and exceptions

Configuration bootstrap adapters may read the host environment. Decode missing, malformed, and empty values according to explicit application requirements.

## Policies

### G1: Read configuration through Config

Read application settings through Config and ConfigProvider instead of reading process.env in business code.

**Automatic reminders:** `effect-v4-process-env`, `effect-v4-bun-native`

**Related diagnostics:** `processEnv`, `processEnvInEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### G2: Validate configuration types

Decode and validate configuration at its boundary with Config and Schema rather than spreading ad hoc parsing through business logic.

**Automatic reminders:** `effect-v4-process-env`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### G3: Make defaults intentional

Mark required settings explicitly. Add defaults only when missing configuration genuinely has a valid meaning.

**Automatic reminders:** `effect-v4-process-env`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### G4: Redact secrets

Represent sensitive configuration as Redacted values. Keep the wrapper until the external boundary needs the secret.

**Automatic reminders:** `effect-v4-process-env`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### G5: Limit secret access

Unwrap a Redacted value only at a necessary boundary. Keep secrets out of logs, traces, errors, and diagnostic messages.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### G6: Replace providers in tests

Provide test configuration through ConfigProvider. Avoid changing global process.env to control business tests.

**Automatic reminders:** `effect-v4-process-env`

**Related diagnostics:** `processEnv`, `processEnvInEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/configuration)
