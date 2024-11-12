import useLocalStorage from 'use-local-storage'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { createOrder } from '@/services/order-service'
import { fetchCoordinates } from '@/components/map'
import { Button } from '@/components/ui/button'
import { Parcel, OrderDetails, Coordinates } from '@/types/types'
import { useState } from 'react'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '')

const fetchTypedCoordinates = async (location: string): Promise<Coordinates> => {
  if (!import.meta.env.VITE_MAPBOX_ACCESS_TOKEN) {
    return { lat: 37.7749, lng: -122.4194 }
  }
  const coordinatesArray = await fetchCoordinates(location)
  return { lng: coordinatesArray[0], lat: coordinatesArray[1] }
}

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [parcels, setParcels] = useLocalStorage<Parcel[]>('order-draft', [])
  const [startLocation, setStartLocation] = useLocalStorage<string>('start-location', '')
  const [endLocation, setEndLocation] = useLocalStorage<string>('end-location', '')
  const [pickupInstructions, setPickupInstructions] = useLocalStorage<string>('pickup-instructions', '')
  const [dropoffInstructions, setDropoffInstructions] = useLocalStorage<string>('dropoff-instructions', '')
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
      total: 0,
      parcels,
      originCoordinates,
      destinationCoordinates,
      pickupInstructions,
      dropoffInstructions,
    }

    const cardElement = elements.getElement(CardElement)
    if (cardElement) {
      const { error } = await stripe.createToken(cardElement)
      if (error) {
        setErrorMessage(error.message || 'Invalid card information. Please check your details.')
        console.log('Card details invalid')
      } else {
        console.log('Card validated successfully')
        setErrorMessage(null)

        
        createOrder(orderDetails).then((orderId) => {
          console.log('Order created with ID:', orderId)

          setParcels([])  
          setStartLocation('')  
          setEndLocation('')  
          setPickupInstructions('')  
          setDropoffInstructions('')  

          window.location.href = '/'
        })
      }
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Payment Information</h2>
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
          <label className="block text-gray-700 font-medium mb-1" htmlFor="postal-code">
            Postal Code
          </label>
          <input
            type="text"
            id="postal-code"
            value={postalCode}
            onChange={handlePostalCodeChange}
            placeholder="e.g., A1A1A1"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        
        <Button 
          onClick={executeCreateOrder}
          className="w-full bg-blue-500 hover:bg-blue-400 transition-color duration-200 text-white py-3 rounded-md font-medium"
        >
          Submit Payment
        </Button>
      </form>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <CheckoutForm />
      </div>
    </Elements>
  )
}
