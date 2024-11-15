import useLocalStorage from 'use-local-storage'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { createOrder } from '@/services/order-service'
import { fetchCoordinates } from '@/components/map'
import { Button } from '@/components/ui/button'
import { Parcel, OrderDetails, Coordinate } from '@/types/types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import fetchQuote from '@/services/fetch-quote'
import { useAuth } from '@/providers/AuthProvider'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '')

const fetchTypedCoordinates = async (location: string): Promise<Coordinate> => {
  if (!import.meta.env.VITE_MAPBOX_ACCESS_TOKEN) {
    return { lat: 37.7749, lng: -122.4194 }
  }
  const coordinatesArray = await fetchCoordinates(location)
  return { lng: coordinatesArray[0], lat: coordinatesArray[1] }
}

const CheckoutForm = ({
  startLocation,
  endLocation,
  pickupInstructions,
  dropoffInstructions,
  parcels,
  quote,
}: {
  startLocation: string
  endLocation: string
  pickupInstructions: string
  dropoffInstructions: string
  parcels: Parcel[]
  quote: number
}) => {
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()
  const [postalCode, setPostalCode] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 6) {
      setPostalCode(e.target.value)
    }
  }

  const executeCreateOrder = async () => {
    if (!stripe || !elements) {
      setErrorMessage('Stripe has not been initialized. Please try again.')
      return
    }

    const originCoordinates = await fetchTypedCoordinates(startLocation)
    const destinationCoordinates = await fetchTypedCoordinates(endLocation)
    const orderDetails: OrderDetails = {
      total: quote,
      parcels,
      originCoordinates,
      destinationCoordinates,
      pickupInstructions,
      dropoffInstructions,
    }

    const cardElement = elements.getElement(CardElement)
    if (cardElement) {
      const { token, error } = await stripe.createToken(cardElement)
      if (error) {
        setErrorMessage(
          error.message ||
            'Invalid card information. Please check your details.'
        )
        console.log('Card details invalid')
      } else if (token) {
        console.log('Card validated successfully')
        setErrorMessage(null)
        try {
          const number = await createOrder(orderDetails, token.id)
          localStorage.removeItem('order-draft')
          localStorage.removeItem('start-location')
          localStorage.removeItem('end-location')
          localStorage.removeItem('pickup-instructions')
          localStorage.removeItem('dropoff-instructions')
          navigate(`/confirmation/${number}`)
        } catch (error) {
          setErrorMessage('Error connecting to backend.')
          console.error(error)
        }
      }
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white m-10 p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
        Payment Information
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        {/* Error Popup */}
        {errorMessage && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
            {errorMessage}
          </div>
        )}

        <div className="p-3 border rounded-md">
          <CardElement
            className="p-2 text-gray-700"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#a0aec0' },
                },
                invalid: { color: '#9e2146' },
              },
              hidePostalCode: true,
            }}
          />
        </div>

        <div>
          <label
            className="block text-gray-700 font-extrabold tracking-tight mb-1"
            htmlFor="postal-code"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="postal-code"
            value={postalCode}
            onChange={handlePostalCodeChange}
            placeholder="e.g., A1A1A1"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600t"
          />
        </div>

        <Button
          onClick={executeCreateOrder}
          className="w-full bg-blue-500 hover:bg-blue-400 transition-color duration-200 text-white py-7 rounded-md font-extrabold text-xl"
        >
          Submit Payment
        </Button>
      </form>
    </div>
  )
}

export default function PaymentPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  const [startLocation] = useLocalStorage<string>('start-location', '')
  const [endLocation] = useLocalStorage<string>('end-location', '')
  const [pickupInstructions] = useLocalStorage<string>(
    'pickup-instructions',
    ''
  )
  const [dropoffInstructions] = useLocalStorage<string>(
    'dropoff-instructions',
    ''
  )
  const [parcels] = useLocalStorage<Parcel[]>('order-draft', [])
  const [quote, setQuote] = useState<number>(0)
  useEffect(() => {
    fetchQuote(parcels).then(setQuote)
  }, [parcels])

  if (!user && !loading) {
    navigate('/signin?redirect=payment')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-6xl font-extrabold tracking-tight mb-8 text-center text-gray-800">
        Payment Step
      </div>

      <div className="max-w-lg w-full mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-gray-700">Order Summary</h3>
        <p className="font-extrabold tracking-tight">
          Total: ${quote.toFixed(2)}
        </p>
        <p className="font-extrabold tracking-tight mt-2">Start Location:</p>
        <p>{startLocation}</p>
        <p className="font-extrabold tracking-tight mt-2">End Location:</p>
        <p>{endLocation}</p>

        <p className="font-extrabold tracking-tight mt-2">Items:</p>
        <ul className="list-disc ml-5">
          {parcels.map((parcel, index) => (
            <li key={index} className="tracking-tight">
              {parcel.name || `Parcel ${index + 1}`} - {parcel.description}
            </li>
          ))}
        </ul>

        <p className="font-extrabold tracking-tight mt-2">
          Pickup Instructions:
        </p>
        <p>{pickupInstructions}</p>

        <p className="font-extrabold tracking-tight mt-2">
          Dropoff Instructions:
        </p>
        <p>{dropoffInstructions}</p>
      </div>
      <Elements stripe={stripePromise}>
        <div className="max-w-lg w-full">
          <CheckoutForm
            startLocation={startLocation}
            endLocation={endLocation}
            pickupInstructions={pickupInstructions}
            dropoffInstructions={dropoffInstructions}
            parcels={parcels}
            quote={quote}
          />
        </div>
      </Elements>
    </div>
  )
}
