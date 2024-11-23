import Container from '@/components/container'
import Map, { fetchPlaceName } from '@/components/map'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from '@/components/ui/table'
import { MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FadeInWrapper from '@/components/fade-in-wrapper'
import { trackOrder } from '@/services/track-service'
import Spinner from '@/components/spinner'

export default function TrackingPage() {
  const { id } = useParams()
  const [isValid, setIsValid] = useState(true)
  const [loading, setLoading] = useState(true)
  const [originLocation, setOriginLocation] = useState<string>('')
  const [previousLocations, setPreviousLocations] = useState<string[]>([])
  const [currentLocation, setCurrentLocation] = useState<string>('')
  const [endLocation, setEndLocation] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    const track = async () => {
      if (!id) {
        return
      }
      try {
        const trackingData = await trackOrder(id)
        if (trackingData == null) {
          setIsValid(false)
          setLoading(false)
          return
        }
        setStatus(trackingData.status)
        setIsValid(true)
        let currLoc = await fetchPlaceName(
          trackingData.currentCoordinate.lat,
          trackingData.currentCoordinate.lng
        )
        if (currLoc == null) {
          currLoc = ''
        }
        setCurrentLocation(currLoc)

        let dest = await fetchPlaceName(
          trackingData.destinationCoordinate.lat,
          trackingData.destinationCoordinate.lng
        )
        if (dest == null) {
          dest = ''
        }
        setEndLocation(dest)

        const prevCoordArr = trackingData.previousCoordinates
        const trackingHistory: string[] = []
        for (let i = 0; i < prevCoordArr.length; i++) {
          const locString = await fetchPlaceName(
            prevCoordArr[i].lat,
            prevCoordArr[i].lng
          )
          if (locString) {
            trackingHistory.push(locString)
          } else {
            trackingHistory.push('Error fetching Location')
          }
        }
        setPreviousLocations(trackingHistory)
        let origin = await fetchPlaceName(
          trackingData.originCoordinate.lat,
          trackingData.originCoordinate.lng
        )
        if (origin == null) {
          origin = ''
        }
        setOriginLocation(origin)
        setUsername(trackingData.user.username)
        setLoading(false)
      } catch (error) {
        if (
          error instanceof Error &&
          'response' in error &&
          (error as { response?: { status?: number } }).response?.status === 400
        ) {
          console.log('Bad Request: Invalid tracking number')
          setIsValid(false)
          // Continue your function logic here, if needed
        } else {
          console.error('An unexpected error occurred:', error)
        }
        setLoading(false)
      }
    }
    track()
  }, [id])

  if (!id) {
    return <TrackingNumberInput setLoading={setLoading} />
  }

  if (loading) {
    return (
      <Container>
        <div className="w-full h-full flex justify-center items-center">
          <FadeInWrapper>
            <Spinner />
          </FadeInWrapper>
        </div>
      </Container>
    )
  }
  if (!isValid) {
    return <TrackingNumberInput invalidId={id} setLoading={setLoading} />
  }
  return (
    <Container>
      <div className="mt-4 flex flex-col gap-4 h-full">
        <OrderInformationCard
          orderId={id}
          status={status}
          username={username}
        />
        <div className="rounded-2xl border shadow p-4 h-[500px] grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 overflow-scroll">
            <div className="flex items-center gap-2">
              <MapPin size={24} className="text-green-500" />
              <h2 className="flex-1 text-xl font-bold truncate">
                {currentLocation}
              </h2>
            </div>
            <LocationHistory locations={previousLocations} />
          </div>
          <div className="w-full">
            <Map
              startLocation={originLocation}
              endLocation={endLocation}
              pingLocation={currentLocation}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

function OrderInformationCard({
  orderId,
  status,
  username,
}: {
  orderId: string
  status: string
  username: string
}) {
  return (
    <div className="flex justify-between">
      <div>
        <div className="text-sm font-bold text-slate-500">Order Number</div>
        <div className="text-2xl font-bold">{orderId}</div>
      </div>
      <div className="text-center">
        <div className="text-sm font-bold text-slate-500">Order Status</div>
        <div>
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${
              status === 'Delivered'
                ? 'bg-green-100 text-green-800'
                : status === 'In Transit'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {status}
          </span>
        </div>
      </div>
      <div className="text-end">
        <div className="text-sm font-bold text-slate-500">User Information</div>
        <div>{username}</div>
      </div>
    </div>
  )
}

function LocationHistory({ locations }: { locations: string[] }) {
  return (
    <ScrollArea>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location History</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations
            .slice()
            .reverse()
            .map((location, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{location}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </ScrollArea>
  )
}

function TrackingNumberInput({
  invalidId,
  setLoading,
}: {
  invalidId?: string
  setLoading: (b: boolean) => void
}) {
  const [trackingNumber, setTrackingNumber] = useState('')
  const navigate = useNavigate()
  const handleTrackingNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const stripped = e.target.value.replace(/\D/g, '')
    setTrackingNumber(stripped)
  }
  const handleSubmit = () => {
    setLoading(true)
    navigate(`/track/${trackingNumber}`)
  }

  return (
    <Container>
      <div className="flex justify-center mt-20">
        <div className="w-[350px] flex flex-col gap-4 items-ends">
          <FadeInWrapper>
            <div className="text-4xl font-extrabold tracking-tight mb-4">
              What's your order number?
            </div>
          </FadeInWrapper>
          <FadeInWrapper delay={50}>
            <Input
              className="p-6 text-lg text-center shadow"
              value={trackingNumber}
              onChange={handleTrackingNumberChange}
            ></Input>
          </FadeInWrapper>
          {invalidId && (
            <FadeInWrapper delay={75}>
              <div className="text-m text-red-500">
                {invalidId} is not a valid order number.
              </div>
            </FadeInWrapper>
          )}
          <FadeInWrapper delay={100}>
            <div className="flex justify-end">
              <Button onClick={handleSubmit}>Track Order</Button>
            </div>
          </FadeInWrapper>
        </div>
      </div>
    </Container>
  )
}
