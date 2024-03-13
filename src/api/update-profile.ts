import { api } from '@/lib/axios'

export interface UpdateProfileBody {
  id: string
  name: string
  description: string
}

export async function updateProfile({
  id,
  name,
  description,
  ...rest
}: UpdateProfileBody) {
  // throw new Error()

  await api.put(`/managed-restaurant/${id}`, { ...rest, name, description })
}
