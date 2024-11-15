import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/providers/AuthProvider.tsx'

import Root from './routes/root.tsx'
import SigninPage from './routes/signin-page.tsx'
import OrderPage from './routes/order-page.tsx'
import PaymentPage from './routes/payment.tsx'
import SignupPage from './routes/signup-page.tsx'
import ProfilePage from './routes/profile-page.tsx'
import TrackingPage from './routes/tracking-page.tsx'
import ErrorPage from './error-page.tsx'
import Home from './Home.tsx'
import './index.css'
import ContactUs from './components/contact-page/contact-page.tsx'
import ConfirmationPage from './routes/order-confirmation.tsx'
import EmailConfirmation from './components/contact-page/email-confirmation-page.tsx'
import FaqPage from './routes/faq-page.tsx'

import AboutUs from './components/about-us-page/about-us-page.js'

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
        element: <AboutUs></AboutUs>,
      },
      {
        path: 'signin',
        element: <SigninPage />,
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
        element: <ContactUs />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'payment',
        element: <PaymentPage />,
      },
      {
        path: '/track',
        element: <TrackingPage />,
      },
      {
        path: '/track/:id',
        element: <TrackingPage />,
      },
      {
        path: '/confirmation',
        element: <ConfirmationPage />,
      },
      {
        path: '/email-confirmation-page',
        element: <EmailConfirmation />,
      },
      {
        path: '/faq',
        element: <FaqPage />,
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
