import { api } from '@/lib/axios'

import { GetProfileResponse } from './get-profile'

export interface SignInBody {
  email: string
}

export async function signIn({ email }: SignInBody) {
  try {
    const { data: responseUser } = await api.get<GetProfileResponse[]>(
      `/me?email=${email}`,
    )

    const user = responseUser[0]

    if (user.email === email) {
      window.location.href = '/'
      sessionStorage.setItem(
        '@logged-id',
        JSON.stringify({ userId: user.id, loginDate: new Date() }),
      )
    } else {
      throw new Error('É isso')
    }
  } catch (error: any) {
    console.log(error.message)
  }
}
