import useLocalStorage from 'use-local-storage'
import { Button } from '@/components/ui/button'
import { fetchCoordinates } from '@/components/map'
import { createOrder } from '@/services/order-service'
import { Parcel, OrderDetails, Coordinates } from '@/types/types'

const fetchTypedCoordinates = async (
  location: string
): Promise<Coordinates> => {
  if (!import.meta.env.VITE_MAPBOX_ACCESS_TOKEN) {
    return { lat: 37.7749, lng: -122.4194 }
  }
  const coordinatesArray = await fetchCoordinates(location)
  return { lat: coordinatesArray[0], lng: coordinatesArray[1] }
}

export default function PaymentPage() {
  const [parcels] = useLocalStorage<Parcel[]>('order-draft', [])
  const [startLocation] = useLocalStorage<string>('start-location', '')
  const [endLocation] = useLocalStorage<string>('end-location', '')

  const executeCreateOrder = async () => {
    console.log(parcels)
    const originCoordinates = await fetchTypedCoordinates(startLocation)
    const destinationCoordinates = await fetchTypedCoordinates(endLocation)
    const orderDetails: OrderDetails = {
      total: 0,
      parcels: parcels,
      originCoordinates,
      destinationCoordinates,
    }
    createOrder(orderDetails).then((orderId) => {
      console.log(orderId)
    })
  }

  return (
    <div>
      <h1>Payment</h1>
      <Button onClick={executeCreateOrder}>send create order request</Button>
    </div>
  )
}
