import { api } from '@/lib/axios'

export interface UpdateProfileBody {
  id: string
  name: string
  description: string
}

export interface CreateProfileWithManagedRestaurantBody {
  user: {
    name: string
    email: string
    phone: string
    role: string
  }
  managedRestaurant: {
    name: string
    description: string
  }
}

export async function createProfileWithManagedRestaurant({
  user,
  managedRestaurant,
}: CreateProfileWithManagedRestaurantBody) {
  const { data } = await api.post(`/me`, { ...user })

  await api.post(`/managed-restaurant`, {
    ...managedRestaurant,
    managerId: data.id,
  })
}

export async function updateProfile({
  id,
  name,
  description,
  ...rest
}: UpdateProfileBody) {
  await api.put(`/managed-restaurant/${id}`, { ...rest, name, description })
}
