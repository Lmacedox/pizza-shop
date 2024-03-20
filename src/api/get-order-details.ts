import { api } from '@/lib/axios'

export interface GetOrderDetailsParams {
  id: string
}

export interface GetOrderDetailsResponse {
  id: string
  createdAt: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrderDetails({ id }: GetOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(
    `/orders-details/${id}`,
  )

  return response.data
}
