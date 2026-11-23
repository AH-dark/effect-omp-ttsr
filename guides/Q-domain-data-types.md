# Q: Domain data types

## Scope and exceptions

Do not mechanically replace external nullability contracts, ordinary numbers, object identity, or simple branches. Convert at a deliberate domain boundary.

## Policies

### Q1: Model meaningful absence

Use Option where absence is part of the domain contract. Preserve external null and undefined representations at boundaries.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### Q2: Represent pure failures with Result

Use Result for pure computations that need a typed success-or-failure value. Use Effect for effectful workflows.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### Q3: Match closed unions exhaustively

Use Match or a type-checked exhaustive branch for closed unions. Add explicit handling when a union member is introduced.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### Q4: Brand easily confused values

Use branded types or schemas for identifiers and units that are easy to mix up. Validate values before branding when runtime checks are needed.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### Q5: Use exact decimal semantics when required

Use BigDecimal for exact decimal calculations when the domain requires it. Choose scale, rounding, and serialization explicitly.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### Q6: Choose equality and hashing semantics

Use Equal, Hash, HashSet, or related data types when value semantics are needed. Preserve object identity where identity is meaningful.

**Automatic reminders:** `effect-v4-bun-hashing`, `effect-v4-bun-data-utils`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/data-types/option)
