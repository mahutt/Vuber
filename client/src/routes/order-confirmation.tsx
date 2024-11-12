import { Button } from '@/components/ui/button'
import useLocalStorage from 'use-local-storage'

const OrderConfirmation = () => {
  const [orderId] = useLocalStorage<string>('order-id', '') // Retrieve order ID stored after successful payment
  const [startLocation] = useLocalStorage<string>('start-location', '')
  const [endLocation] = useLocalStorage<string>('end-location', '')
  const [parcels] = useLocalStorage<any[]>('order-draft', [])

  return (
    <div className="w-full max-w-lg mx-auto bg-white m-10 p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
        Order Confirmation
      </h2>

      <div className="space-y-4">
        <div className="text-center text-gray-800 font-medium">
          <p className="text-2xl font-extrabold mb-2 tracking-tight">Thank you for your order!</p>
          <p className="text-lg">Your order ID:</p>
          <p className="text-xl font-extrabold text-blue-600 tracking-tight">{orderId}</p>
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        <div className="text-gray-700">
          <h3 className="text-xl font-extrabold tracking-tight mb-2">Order Details:</h3>
          <p className="font-extrabold tracking-tight">Start Location:</p>
          <p>{startLocation}</p>

          <p className="font-extrabold tracking-tight mt-2">End Location:</p>
          <p>{endLocation}</p>

          <p className="font-extrabold tracking-tight mt-2">Items:</p>
          <ul className="list-disc ml-5">
            {parcels.map((parcel, index) => (
              <li key={index} className="tracking-tight">{parcel.description || `Parcel ${index + 1}`}</li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        <div className="text-center">
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-400 transition-color duration-200 text-white py-3 rounded-md font-extrabold tracking-tight text-xl"
            onClick={() => window.location.href = '/'}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-6xl font-extrabold tracking-tight mb-8 text-center text-gray-800">
        Order Confirmation
      </div>
      <div className="max-w-lg w-full">
        <OrderConfirmation />
      </div>
    </div>
  )
}
