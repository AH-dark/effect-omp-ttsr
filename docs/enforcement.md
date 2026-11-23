# Enforcement and prompt budget

## Detector selection

The 120 catalog entries are behavioral policies, not 120 independent regexes.
Each entry lists its TTSR reminder names, related tsgo diagnostics, and the
remaining review responsibility. A related diagnostic covers a recognizable
subcase; it does not establish the complete policy contract.

All 26 TTSR rules use `astCondition`. No rule watches prose, thinking, or a
generic `async`, `await`, `throw`, or `Promise` keyword. Comments and string
literals containing API examples therefore do not fire these AST patterns.

AST rules match the reconstructed source-bearing payload supplied by the tool.
A patch may expose added lines without their existing imports or surrounding
syntax. Alias imports, computed properties, destructured APIs, local shadowing,
and incomplete source fragments are not fully resolved by these patterns.
The completed-file tsgo check covers the symbol-aware cases supported by its
rules. Review remains necessary for uncaught cases.

## Delivery and repetition

Clear import and business-runtime violations use `tool-only` interruption.
Potentially shadowed globals and contextual choices use `never`: a reminder
does not block the write and is delivered through OMP's normal reminder path.
`once` limits a rule's repeated reminder cost in a session. The tsgo check keeps
checking later violations even after a TTSR reminder has been suppressed.

Set `repeatMode` in the scope file to `after-gap` when repeated coaching is useful.
The gap is OMP's global `ttsr.repeatGap`; the templates do not invent a per-rule
gap field or overwrite that setting. `always` is available but is intentionally
not the default.

No constant prompt, rulebook descriptions, or model-judged questions are added.
Rules can still share a match event; OMP deduplicates rule names, not policy
topics. The templates reduce overlapping bodies but do not promise a fixed
maximum number of simultaneous reminders.

## Severity

| Level | Use |
| --- | --- |
| Error | Unsafe or invalid Effect structure and the selected native-API policies |
| Warning | Context-dependent anti-patterns and API stability notices |
| Suggestion | Equivalent simplifications and data-helper preferences |
| Off | Unsupported, deprecated, unrelated, or conflicting prescriptions |

The diagnostic catalog is pinned to a source snapshot. The check validates
requested names against the installed schema and explicitly turns every installed
diagnostic off before applying the reviewed business override. Newly introduced
rules remain off until reviewed. Regenerate the editor fragment when upgrading
the baseline so its complete base severity map stays current.

The default unstable-API allowlist includes the selected crypto, HTTP, and
process module subtrees. Experimental APIs have no blanket allowlist.

## Validation limits

The OMP suite tests the real CLI matcher, every declared AST pattern, scope,
comments, strings, and file extensions. It does not simulate provider streaming,
live tool interruption, retry timing, compaction, or multi-file tool events.
Those depend on the installed OMP coordinator. An AST CLI match is not evidence
that every live edit shape will match.

The recorded tsgo smoke check names its exact local tool and Effect versions.
Source/schema verification of the 0.73.5 profile is distinct from running that
exact binary. Run the supplied check with your project's pinned dependencies
before adopting a profile as a CI gate.
