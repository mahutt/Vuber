import Map from '../components/map'
import { useState } from 'react'
import { Input } from '../components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { trackOrder } from '@/services/track-service'

import { fetchPlaceName } from '../components/map'

function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState<string>('')
  const [isValidTracking, setIsValid] = useState<Boolean>(true)
  const [originLocation, setOriginLocation] = useState<string>('')
  const [previousLocations, setPreviousLocations] = useState<String[]>([])
  const [currentLocation, setCurrentLocation] = useState<string>('')
  const [endLocation, setEndLocation] = useState<string>('')
  const [trackingDataFound, setTrackingDataFound] = useState<Boolean>(false)
  const [status, setStatus] = useState<string>('')

  const isNumString = (string: string) => /^\d+$/.test(string)

  const track = async () => {
    console.log('start')
    console.log(trackingNumber)
    if (trackingNumber == '') {
      setIsValid(false)
      return
    }
    if (!isNumString(trackingNumber)) {
      setIsValid(false)
      return
    }

    try {
      const response = await trackOrder(trackingNumber)
      if (response.status == 200) {
        setStatus(response.data.status)
        setIsValid(true)
        setTrackingDataFound(true)
        var currLoc = await fetchPlaceName(
          response.data.newCurrLocation.xCoord,
          response.data.newCurrLocation.yCoord
        )
        if (currLoc == null) {
          currLoc = ''
        }
        setCurrentLocation(currLoc)

        var dest = await fetchPlaceName(
          response.data.destinationCoords.xCoord,
          response.data.destinationCoords.yCoord
        )
        if (dest == null) {
          dest = ''
        }
        setEndLocation(dest)

        const prevCoordArr = response.data.prevCoords
        console.log(prevCoordArr)
        const trackingHistory: string[] = []
        for (let i = 0; i < prevCoordArr.length; i++) {
          let locString = await fetchPlaceName(
            prevCoordArr[i].xCoord,
            prevCoordArr[i].yCoord
          )
          if (locString) {
            trackingHistory.push(locString)
          } else {
            trackingHistory.push('Error fetching Location')
          }
        }
        setTrackingDataFound(true)
        setPreviousLocations(trackingHistory)
      }
    } catch (error) {
      if (
        error instanceof Error &&
        'response' in error &&
        (error as any).response.status === 400
      ) {
        console.log('Bad Request: Invalid tracking number')
        setIsValid(false)
        // Continue your function logic here, if needed
      } else {
        console.error('An unexpected error occurred:', error)
      }
    }
  }

  function OrderCard() {
    return (
      <div className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <p className="font-medium">
          <strong>Order Number:</strong> {trackingNumber}
        </p>
        <p>
          <strong>Status:</strong>{' '}
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
        </p>
        <p>
          <strong>Current Location: </strong> {currentLocation}
        </p>
      </div>
    )
  }

  return (
    <div className="h-full relative flex flex-col overflow-auto">
      <section className="h-full relative">
        <div className="max-w-screen-xl mx-auto  mt-2 p-16 h-full flex items-center justify-around gap-4">
          <div className="w-[350px] flex flex-col gap-4 items-ends">
            <div className="text-4xl font-extrabold tracking-tight mb-8">
              Enter your tracking number
            </div>
            <Input
              placeholder="Tracking Number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            ></Input>
            {!isValidTracking && (
              <div className="text-m text-red-500">
                Not a Valid Tracking Number
              </div>
            )}
            <Button onClick={track}>Track Order</Button>
          </div>
          <div className="w-full h-full max-w-[500px] max-h-[500px] ">
            {import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ? (
              <div className="w-full h-full">
                <Map
                  startLocation={currentLocation}
                  endLocation={endLocation}
                  pingLocation={currentLocation}
                />
              </div>
            ) : (
              <img
                src="map.png"
                className="size-auto object-contain rounded-lg"
              ></img>
            )}
          </div>
        </div>
      </section>

      {trackingDataFound && (
        <section className="w-[1000px] mx-auto mb-4 overflow-y-auto">
          {/* OrderCard and Table Container */}
          <div>
            <OrderCard />

            <Table>
              <TableCaption>Order Tracking History</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Location History</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {previousLocations
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
          </div>
        </section>
      )}
    </div>
  )
}
export default TrackingPage
