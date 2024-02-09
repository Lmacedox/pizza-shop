import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/App/dashboard/dashboard'
import { Orders } from './pages/App/orders/orders'
import { SingUp } from './pages/Auth/sign-up'
import { SingIn } from './pages/Auth/sing-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/orders', element: <Orders /> },
    ],
  },

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SingIn /> },
      { path: '/sign-up', element: <SingUp /> },
    ],
  },
])
