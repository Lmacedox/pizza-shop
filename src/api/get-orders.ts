import { api } from '@/lib/axios'

export interface GetOrdersQuery {
  pageIndex?: number | null
  id?: string | null
  customerName?: string | null
  status?: string | null
}

export interface GetOrdersResponse {
  orders: {
    id: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

interface ResponseObject {
  first: number
  prev: number
  next: number
  last: number
  pages: number
  items: number
  data: {
    id: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
}

export async function getOrders({
  pageIndex,
  customerName,
  id,
  status,
}: GetOrdersQuery) {
  let params = {}

  if (id || customerName || status) {
    if (id?.length) {
      params = {
        ...params,
        id,
      }
    }

    if (customerName?.length) {
      params = {
        ...params,
        customerName,
      }
    }

    if (status?.length && status !== 'all') {
      params = {
        ...params,
        status,
      }
    }
  } else {
    params = {
      _page: Number(pageIndex) + 1,
      _per_page: 10,
    }
  }

  const { data } = await api.get<ResponseObject>('/orders', {
    params: { ...params, _page: Number(pageIndex) + 1, _per_page: 10 },
  })

  return {
    orders: data.data,
    meta: {
      pageIndex: Number(pageIndex),
      perPage: 10,
      totalCount: data.items,
    },
  }
}
