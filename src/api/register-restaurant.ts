import { api } from '@/lib/axios'

import { createProfileWithManagedRestaurant } from './profile'

export interface RegisterRestaurant {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function registerRestaurant({
  restaurantName,
  managerName,
  email,
  phone,
}: RegisterRestaurant) {
  const { data } = await api.post('/restaurants', {
    restaurantName,
    managerName,
    email,
    phone,
  })

  createProfileWithManagedRestaurant({
    user: {
      email: data.email,
      name: data.managerName,
      phone: data.phone,
      role: 'manager',
    },
    managedRestaurant: {
      name: data.restaurantName,
      description: 'Administrar e cuidar do restaurante com amor!',
    },
  })
}
