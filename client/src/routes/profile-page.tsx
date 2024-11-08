// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/providers/AuthProvider'
import { useState } from 'react'
// import { Link as ReactRouterLink } from 'react-router-dom';

export default function ProfilePage() {
  const { user, loading } = useAuth()

  type Order = {
    orderNumber: string
    status: string
    estimatedDelivery: string
  }

  const [orderInfo] = useState([
    {
      orderNumber: '123456789',
      status: 'In Transit',
      estimatedDelivery: '2024-11-10',
    },
    {
      orderNumber: '987654321',
      status: 'Out for Delivery',
      estimatedDelivery: '2024-11-08',
    },
    {
      orderNumber: '456789123',
      status: 'Delivered',
      estimatedDelivery: '2024-11-05',
    },
    {
      orderNumber: '789123456',
      status: 'Delivered',
      estimatedDelivery: '2024-11-01',
    },
  ])

  const currentOrders = orderInfo.filter(
    (order) => order.status !== 'Delivered'
  )
  const pastOrders = orderInfo.filter((order) => order.status === 'Delivered')

  if (loading) {
    return <div className="text-center p-4">Loading...</div>
  }

  if (!user) {
    return (
      <div className="text-center p-4">Please log in to view your profile.</div>
    )
  }

  function OrderCard({ order }: { order: Order }) {
    return (
      <li className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <p className="font-medium">
          <strong>Order Number:</strong> {order.orderNumber}
        </p>
        <p>
          <strong>Status:</strong>{' '}
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${
              order.status === 'Delivered'
                ? 'bg-green-100 text-green-800'
                : order.status === 'In Transit'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {order.status}
          </span>
        </p>
        <p>
          <strong>Estimated Delivery:</strong> {order.estimatedDelivery}
        </p>
      </li>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="mb-6 flex items-center space-x-4">
          <h2 className="text-lg font-semibold">Welcome {user.name} !</h2>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Current Orders</h2>
          {currentOrders.length > 0 ? (
            <ul className="space-y-4">
              {currentOrders.map((order) => (
                <OrderCard key={order.orderNumber} order={order} />
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Past Orders</h2>
          {pastOrders.length > 0 ? (
            <ul className="space-y-4">
              {pastOrders.map((order) => (
                <OrderCard key={order.orderNumber} order={order} />
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
        </section>
      </div>
    </div>
  )
}
