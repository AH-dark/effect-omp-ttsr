# M: Services and layers

## Scope and exceptions

Small pure helpers do not need services. Per-request resources are valid when request ownership is explicit rather than accidental.

## Policies

### M1: Inject replaceable dependencies

Model external and replaceable dependencies as v4 Context.Service identifiers with stable keys.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `classSelfMismatch`, `genericEffectServices`, `serviceNotAsClass`, `deterministicKeys`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### M2: Construct implementations with Layer

Use Layer to construct service implementations and their dependencies. Keep live and test implementations replaceable.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `missingLayerContext`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### M3: Hide implementation requirements

Capture implementation-only dependencies when building a service. Do not leak them from every public service method.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `leakingRequirements`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### M4: Compose layer dependencies correctly

Use dependency-providing operations when one Layer requires another. Layer merge alone does not supply one sibling to another.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `layerMergeAllWithDependencies`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### M5: Choose sharing deliberately

Reuse Layer values when memoized sharing is intended. Use fresh construction only when an independent instance is required.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### M6: Provide at the composition boundary

Provide the application service graph at a clear composition boundary. Avoid repeated provide chains that unintentionally rebuild lifetimes.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `multipleEffectProvide`, `strictEffectProvide`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/requirements-management/services)
