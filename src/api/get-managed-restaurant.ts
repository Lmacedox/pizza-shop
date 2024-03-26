import { api } from '@/lib/axios'

export interface GetManagedRestaurantResponse {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant() {
  const getUserSession = sessionStorage.getItem('@logged-id')

  const { data } = await api.get<GetManagedRestaurantResponse[]>(
    `/managed-restaurant?managerId=${JSON.parse(getUserSession ?? '').userId}`,
  )

  return data[0]
}
