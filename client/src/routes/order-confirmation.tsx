import { Button } from '@/components/ui/button'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getOrderDetails } from '@/services/order-service'
import { Order } from '@/types/types'

const OrderConfirmation = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  if (!id) {
    navigate('/')
    return null
  }

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const order = await getOrderDetails(Number(id))
        setOrder(order)
        console.log(order)
      } catch (error) {
        console.error(error)
      }
    }

    fetchOrderDetails()
  }, [id])

  if (!order) {
    return <div>Loading order details...</div>
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white m-10 p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
        Order Confirmation
      </h2>

      <div className="space-y-4">
        <div className="text-center text-gray-800 font-medium">
          <p className="text-2xl font-extrabold mb-2 tracking-tight">
            Thank you for your order!
          </p>
          <p className="text-lg">Your order ID:</p>
          <p className="text-xl font-extrabold text-blue-600 tracking-tight">
            {order.id}
          </p>
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        <div className="text-gray-700">
          <h3 className="text-2xl font-extrabold tracking-tight mb-2">
            Order Details:
          </h3>

          <p>
            <h3 className="text-xl font-extrabold tracking-tight mb-2">
              Total:
            </h3>
          </p>

          <p>
            <p className="font-extrabold tracking-tight mt-2">
              {'$' + order.total.toFixed(2) + ' CAD'}
            </p>
          </p>

          {/* todo */}
          {/* <p className="font-extrabold tracking-tight">Start Location:</p>
          <p>{order.origin}</p>

          <p className="font-extrabold tracking-tight mt-2">End Location:</p>
          <p>{order.destination}</p> */}

          <p className="font-extrabold tracking-tight mt-2">Items:</p>
          <ul className="list-disc ml-5">
            {order.parcels.map((parcel, index) => (
              <li key={index} className="tracking-tight">
                <span className="font-semibold">
                  {parcel.name || `Parcel ${index + 1}`}
                </span>
                <p className="text-sm text-gray-600">
                  {parcel.description || 'No description available'}
                </p>
              </li>
            ))}
          </ul>
          <p className="font-extrabold tracking-tight mt-2">
            Pick up Instructions:
          </p>
          <p>{order.pickupInstructions}</p>

          <p className="font-extrabold tracking-tight mt-2">
            Drop off Instructions:
          </p>
          <p>{order.dropoffInstructions}</p>
        </div>

        <div className="border-t border-gray-200 my-6"></div>

        <div className="text-center">
          <Button
            className="w-full bg-blue-500 hover:bg-blue-400 transition-color duration-200 text-white py-3 rounded-md font-extrabold tracking-tight text-xl"
            onClick={() => navigate('/')}
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
      <div className="text-6xl font-extrabold tracking-tight mb-8 text-center text-gray-800 pt-8">
        Order Confirmation
      </div>
      <div className="max-w-lg w-full">
        <OrderConfirmation />
      </div>
    </div>
  )
}
