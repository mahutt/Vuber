import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/providers/AuthProvider.tsx'
import Root from './routes/root.tsx'
import LoginPage from './routes/login-page.tsx'
import OrderPage from './routes/order-page.tsx'
import SignupPage from './routes/signup-page.tsx'
import ErrorPage from './error-page.tsx'
import Home from './Home.tsx'
import './index.css'
import ContactUs from './components/contact-page/Contact-Page.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'about',
        element: <div>About page placeholder</div>,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'order',
        element: <OrderPage />,
      },
      {
        path: 'contact-page',
        element: <ContactUs/>,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
