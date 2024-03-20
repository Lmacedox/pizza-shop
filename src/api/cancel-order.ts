import { api } from '@/lib/axios'

export interface CancelOrderParams {
  orderId: string
}

export async function cancelOrder({ orderId }: CancelOrderParams) {
  //   await api.patch(`/orders-details/${orderId}`, {
  //     status: 'canceled',
  //   })
  await api.patch(`/orders?orderId=${orderId}`, {
    status: 'canceled',
  })
}
