import { api } from '@/lib/axios'

export interface CancelOrderParams {
  id: string
}

export async function cancelOrder({ id }: CancelOrderParams) {
  await api.patch(`/orders-details/${id}`, {
    status: 'canceled',
  })
  await api.patch(`/orders/${id}`, {
    status: 'canceled',
  })
}
