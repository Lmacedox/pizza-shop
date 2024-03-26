import { api } from '@/lib/axios'

export interface GetProfileResponse {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const getUserSession = sessionStorage.getItem('@logged-id')

  const { data } = await api.get<GetProfileResponse>(
    `/me/${JSON.parse(getUserSession ?? '').userId}`,
  )

  return data
}
