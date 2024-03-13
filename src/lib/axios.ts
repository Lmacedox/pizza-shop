import axios from 'axios'

import { fakeDelay } from '@/api/fake-delay'

export const api = axios.create({ baseURL: 'http://localhost:3000/' })

api.interceptors.request.use(async (config) => {
  await fakeDelay(1000)

  return config
})
