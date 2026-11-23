import { Context, Data, Effect, Schema } from "effect"

export const OrderSchema = Schema.Struct({
  id: Schema.String,
  quantity: Schema.Finite
})
export type Order = typeof OrderSchema.Type

export class OrderNotFound extends Data.TaggedError("OrderNotFound")<{
  readonly id: string
}> {}

export class OrderRepository extends Context.Service<OrderRepository, {
  readonly find: (id: string) => Effect.Effect<Order, OrderNotFound>
}>()("example/OrderRepository") {}

export const loadOrder = Effect.fn("Order.load")(function*(id: string) {
  const repository = yield* OrderRepository
  const order = yield* repository.find(id)
  yield* Effect.logInfo("Order loaded").pipe(
    Effect.annotateLogs({ orderId: id })
  )
  return order
})

export const decodeOrder = Schema.decodeUnknownEffect(OrderSchema)
