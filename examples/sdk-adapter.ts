import { Data, Effect } from "effect"

// Install this file under src/adapters/, outside the business policy scope.
// A foreign SDK can expose Promise while the adapter exposes typed Effect.
export interface VendorSdk {
  readonly load: (id: string, options: { readonly signal: AbortSignal }) => Promise<unknown>
}

export class VendorUnavailable extends Data.TaggedError("VendorUnavailable")<{
  readonly id: string
  readonly cause: unknown
}> {}

export const loadFromVendor = (sdk: VendorSdk, id: string) =>
  Effect.tryPromise({
    try: (signal) => sdk.load(id, { signal }),
    catch: (cause) => new VendorUnavailable({ id, cause })
  })

// Cancellation only stops the request if this SDK honors its signal contract.
