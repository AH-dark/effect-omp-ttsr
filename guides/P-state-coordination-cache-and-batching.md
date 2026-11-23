# P: State, coordination, cache, and batching

## Scope and exceptions

Local mutation inside a pure, non-escaping calculation is allowed. Coordination, caching, and batching are introduced only when the actual behavior needs them.

## Policies

### P1: Use Ref for shared state

Use Ref for mutable state shared between Effects. Keep updates atomic and callbacks pure.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### P2: Serialize effectful atomic updates

Use SynchronizedRef when an update itself must perform effects while remaining serialized. Avoid read-then-write races.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### P3: Bound producer-consumer queues

Use Queue for producer-consumer coordination. Choose capacity, overflow behavior, and shutdown ownership explicitly.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### P4: Use appropriate notification primitives

Use Deferred, PubSub, SubscriptionRef, or a semaphore according to whether the requirement is one result, broadcast, observable state, or limited access.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### P5: Define cache correctness

Use Cache or Effect caching when suitable. Define keys, capacity, TTL, invalidation, and whether failures are cached.

**Automatic reminders:** `effect-v4-bun-redis`

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### P6: Batch equivalent requests safely

Use Effect request batching where repeated requests share a compatible lookup. Preserve caller isolation, ordering, and failure semantics.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** None listed; use contextual review.

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/state-management/ref)
