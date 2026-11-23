# A: Version and imports

## Scope and exceptions

Use the project lockfile and installed exports as the final API authority. Do not upgrade dependencies as an incidental rule fix.

## Policies

### A1: Target the installed v4 version

Check package manifests, the lockfile, and installed types before choosing an API. Use supported v4 exports.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `duplicatePackage`, `outdatedApi`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### A2: Replace removed APIs

Replace removed or renamed APIs using the migration map for the installed version. Do not copy v3 examples unchanged.

**Automatic reminders:** `effect-v4-obsolete-imports`

**Related diagnostics:** `outdatedApi`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### A3: Use integrated Schema and Match

Import Schema and Match from the v4 effect package instead of obsolete standalone packages.

**Automatic reminders:** `effect-v4-obsolete-imports`

**Related diagnostics:** `obsoleteSchemaImport`, `obsoleteMatchImport`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### A4: Use current platform imports

Use FileSystem and Path from effect. Use the installed v4 HTTP, process, crypto, and runtime exports.

**Automatic reminders:** `effect-v4-obsolete-imports`

**Related diagnostics:** `nodeBuiltinImport`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### A5: Verify uncertain APIs

Inspect the installed declaration or authoritative source when an API is uncertain. Do not invent an export, signature, or error type.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### A6: Preserve dependency decisions

Keep existing dependency versions and package-manager conventions. Propose a separate upgrade when a required capability is unavailable.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/getting-started)
