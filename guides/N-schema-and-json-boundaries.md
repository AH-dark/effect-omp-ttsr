# N: Schema and JSON boundaries

## Scope and exceptions

Trusted internal values do not require repeated decoding. Serialization must preserve the existing wire format, omission rules, numeric values, and transformations.

## Policies

### N1: Decode external unknown values

Treat external input as unknown until it has passed a Schema decoder. Avoid type assertions that pretend validation occurred.

**Automatic reminders:** `effect-v4-native-json`

**Related diagnostics:** `preferTypedSchemaDecoder`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### N2: Use JSON codecs

Parse and encode JSON through the appropriate Schema codec. Use fromJsonString for strings and the correct JSON codec for JSON values.

**Automatic reminders:** `effect-v4-native-json`

**Related diagnostics:** `globalJson`, `globalJsonInEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### N3: Decode in the Effect error channel

Inside an Effect workflow, use Effect-based Schema decode and encode operations so expected validation errors stay typed.

**Automatic reminders:** `effect-v4-native-json`, `effect-v4-schema-sync`

**Related diagnostics:** `schemaSync`, `schemaSyncInEffect`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### N4: Derive types from Schema

Use the Schema inferred Type and Encoded types when they are the source of truth. Avoid independently maintained duplicate interfaces.

**Automatic reminders:** None; use contextual review.

**Related diagnostics:** `preferSchemaTypeProperty`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### N5: Keep encoded and decoded types distinct

Account for codecs, transformations, defaults, and encoded representations. Do not assume the wire type equals the domain type.

**Automatic reminders:** `effect-v4-native-json`

**Related diagnostics:** `schemaClassObjectLiteral`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

### N6: Validate without unsafe casts

Use decoding or a proper type guard rather than an unchecked cast for runtime input. Preserve Schema class construction and prototype requirements.

**Automatic reminders:** `effect-v4-native-json`

**Related diagnostics:** `overriddenSchemaConstructor`, `schemaClassObjectLiteral`

**Review:** Check the actual behavior and the exceptions above. A detector match does not prove the entire policy.

## Reference

[Official v4 guide](https://effect.website/docs/v4/schema/getting-started)
