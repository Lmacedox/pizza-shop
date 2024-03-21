import { TypeOrderStatus } from '@/@types/order-status'
import { api } from '@/lib/axios'

export interface UpdateOrderStatusOrderParams {
  id: string
  status?: TypeOrderStatus
}

export async function updateOrderstatusOrder({
  id,
  status,
}: UpdateOrderStatusOrderParams) {
  await api.patch(`/orders-details/${id}`, {
    status,
  })
  await api.patch(`/orders/${id}`, {
    status,
  })
}
