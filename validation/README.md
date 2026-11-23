# Validation results

| Check | Result | Limit |
| --- | --- | --- |
| Policy catalog | 120 unique IDs, 20 groups, complete cross-references | Architecture policies still require review |
| OMP matcher | 502 of 502 fixtures passed on OMP 19.0.1 | CLI matching, not a live streaming coordinator simulation |
| Installation and generation | 7 tests passed | Temporary projects; no existing user repository was modified |
| tsgo 0.73.5 profile | Passed the pinned upstream named-plugin JSON schema and diagnostic metadata checks | That exact compiler binary was not executed |
| tsgo runtime compatibility | Passed with tsgo 0.63.0, TypeScript 7.0.2, and Effect 4.1.0 | 18 unsupported diagnostics omitted explicitly |
| Shipped TypeScript examples | Ordinary TypeScript check passed in the compatibility fixture project | Check again with the consuming project's dependencies |

The runtime smoke checks confirmed:

- Violating business code produces an error and a nonzero exit code.
- Nested adapters, generated files, tests, and non-business source stay outside
  the selected diagnostic scope.
- A local object named console is not mistaken for the global console by the
  type-aware diagnostic.
- An aliased Effect import still triggers the floating-Effect diagnostic.
- Monorepo scope includes the selected package business files and retains
  exclusions.
- The version gate rejects an older tsgo unless reduced compatibility mode is
  explicitly requested.

Read `omp-fixtures.json`, `tsgo-profile-schema.json`, `tsgo-smoke.json`, and
`catalog-verification.json` for the exact scope of each result.
