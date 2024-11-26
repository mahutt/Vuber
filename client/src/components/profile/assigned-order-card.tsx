import { Coordinate, Order, Parcel } from '@/types/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, MapPin } from 'lucide-react'
import completeOrder from '@/services/complete-order'
import { useAuth } from '@/providers/AuthProvider'
import { useEffect, useState } from 'react'
import { fetchPlaceName } from '../map'

export default function AssignedOrderCard({ order }: { order: Order }) {
  const { refreshUser } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [originPlaceName, setOriginPlaceName] = useState<string>('')
  const [destinationPlaceName, setDestinationPlaceName] = useState<string>('')

  const fetchPlaceNames = async () => {
    if (!order.originCoords || !order.destinationCoords) return
    const origin = await fetchPlaceName(
      order.originCoords.lat,
      order.originCoords.lng
    )
    const destination = await fetchPlaceName(
      order.destinationCoords.lat,
      order.destinationCoords.lng
    )
    setOriginPlaceName(origin ?? makeCoordDtoStringPrettier(order.origin))
    setDestinationPlaceName(
      destination ?? makeCoordDtoStringPrettier(order.destination)
    )
  }

  useEffect(() => {
    fetchPlaceNames()
  }, [order])

  const calculateTotalWeight = (parcels: Parcel[]) => {
    console.log('parcels', parcels)
    const kgParcels = parcels
      .filter((p) => p.weightUnit.toLowerCase() === 'kg')
      .reduce((acc, p) => acc + p.weight, 0)

    const lbParcels = parcels
      .filter((p) => p.weightUnit.toLowerCase() === 'lb')
      .reduce((acc, p) => acc + p.weight * 0.453592, 0) // Convert lb to kg

    return {
      totalKg: kgParcels + lbParcels,
      parcelCount: parcels.length,
    }
  }

  const { totalKg, parcelCount } = calculateTotalWeight(order.parcels)

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex flex-wrap gap-2 justify-between items-center">
          <span>Order #{order.id}</span>
          <span className="text-sm font-normal bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {parcelCount} {parcelCount === 1 ? 'parcel' : 'parcels'} •{' '}
            {totalKg.toFixed(1)} kg total
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="w-fit">
            <div className="flex items-start gap-2">
              <MapPin className="mt-1 h-5 w-5 text-green-600 flex-shrink-0" />
              <p className="font-medium text-green-700">Pickup Location</p>
            </div>
            <p className="text-sm text-gray-600">{originPlaceName}</p>
            <div className="mt-1 text-sm bg-green-50 text-green-700 p-2 rounded">
              <strong className="mr-1">Instructions:</strong>
              {order.pickupInstructions === '' ? (
                <span className="italic text-muted-foreground">
                  (None provided)
                </span>
              ) : (
                order.pickupInstructions
              )}
            </div>
          </div>

          <div className="w-fit">
            <div className="flex items-start gap-2">
              <MapPin className="mt-1 h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="font-medium text-red-700">Dropoff Location</p>
            </div>
            <p className="text-sm text-gray-600">{destinationPlaceName}</p>
            <div className="mt-1 text-sm bg-red-50 text-red-700 p-2 rounded">
              <strong className="mr-1">Instructions:</strong>
              {order.dropoffInstructions === '' ? (
                <span className="italic text-muted-foreground">
                  (None provided)
                </span>
              ) : (
                order.dropoffInstructions
              )}
            </div>
          </div>

          <button
            disabled={loading}
            onClick={async () => {
              setLoading(true)
              const result = await completeOrder(order.id)
              if (result) {
                await refreshUser()
              } else {
                console.error('Failed to complete order')
              }
              setLoading(false)
            }}
            className="w-full flex justify-center gap-2 mt-4 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-md transition-colors duration-200"
          >
            {loading && <Loader2 className="animate-spin" />}
            Mark as Delivered
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

function parseCoordinates(input: string): Coordinate | null {
  const regex = /lat=(-?\d+\.\d+), lng=(-?\d+\.\d+)/
  const match = input.match(regex)
  if (match) {
    const lat = parseFloat(match[1])
    const lng = parseFloat(match[2])
    return { lat, lng }
  }
  return null
}

function makeCoordDtoStringPrettier(input: string): string {
  const coordinate = parseCoordinates(input)
  if (coordinate) {
    return `lattitude: ${coordinate.lat}, longitude: ${coordinate.lng}`
  } else {
    return input
  }
}
