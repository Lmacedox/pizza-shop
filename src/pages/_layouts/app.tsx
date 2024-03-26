import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const getUserSession = JSON.parse(
      sessionStorage.getItem('@logged-id') ?? '{}',
    )

    if (
      !getUserSession.userId ||
      differenceInSeconds(getUserSession.loginDate, new Date()) < -1800
    ) {
      navigate('../sign-in', {
        replace: true,
      })
      sessionStorage.removeItem('@logged-id')
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
