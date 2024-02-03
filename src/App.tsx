import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme.provider'
import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
        <Toaster richColors closeButton />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
