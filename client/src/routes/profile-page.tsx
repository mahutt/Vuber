import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { useEffect, useState } from 'react'
import { Order, Parcel } from '@/types/types'
import AssignedOrderCard from '@/components/profile/assigned-order-card'
import StoriesTab from '@/components/profile/stories-tab'

export default function ProfilePage() {
  const { user, loading, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [ordersToDeliver, setOrdersToDeliver] = useState<Order[]>([])

  useEffect(() => {
    if (!user && !loading) {
      navigate('/signin')
    }
  }, [user, loading, navigate])

  useEffect(() => {
    refreshUser()
  }, [])

  useEffect(() => {
    if (user && user.role === 'DRIVER') {
      setOrdersToDeliver(
        user.assignedOrders.filter((order) => order.status !== 'Delivered')
      )
    }
  }, [user])

  if (loading) {
    return <div className="text-center p-4">Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="mb-6">
          <h2 className="text-lg font-semibold">Welcome {user.name} !</h2>
          <h4 className="italic lowercase">Role: {user.role}</h4>
        </section>

        <section>
          <StoriesTab />
        </section>

        {user.role === 'DRIVER' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Assigned Orders</h2>
            {ordersToDeliver && ordersToDeliver.length > 0 ? (
              <div className="grid gap-4">
                {ordersToDeliver.map((order) => (
                  <AssignedOrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No orders to be delivered.</p>
            )}
          </section>
        )}

        <section>
          <h2 className="text-2xl font-semibold mb-4">Current Orders</h2>
          {user.orders &&
          user.orders.some((order) => order.status !== 'Delivered') ? (
            <ul className="space-y-4">
              {user.orders.map(
                (order) =>
                  order.status !== 'Delivered' && (
                    <OrderCard key={order.id} order={order} />
                  )
              )}
            </ul>
          ) : (
            <p className="text-gray-500">No current orders.</p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Past Orders</h2>
          {user.orders &&
          user.orders.some((order) => order.status === 'Delivered') ? (
            <ul className="space-y-4">
              {user.orders.map(
                (order) =>
                  order.status === 'Delivered' && (
                    <OrderCard key={order.id} order={order} />
                  )
              )}
            </ul>
          ) : (
            <p className="text-gray-500">No past orders.</p>
          )}
        </section>
      </div>
    </div>
  )
}

function OrderCard({ order }: { order: Order }) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/track/${order.id}`)
  }
  return (
    <li
      className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      onClick={handleClick}
    >
      <p className="font-medium">
        <strong>Order Number:</strong> {order.id}
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
      <ul className="ml-4 space-y-2 mt-2">
        {order.parcels.map((parcel) => (
          <li key={parcel.id}>
            <ParcelCard parcel={parcel} />
          </li>
        ))}
      </ul>
    </li>
  )
}

function ParcelCard({ parcel }: { parcel: Parcel }) {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <p className="font-medium">{parcel.name}</p>
      {parcel.description && (
        <p>
          <strong>Description:</strong> {parcel.description}
        </p>
      )}
    </div>
  )
}
