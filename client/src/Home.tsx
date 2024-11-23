import { Link } from 'react-router-dom'
import useLocalStorage from 'use-local-storage'
import { Button } from './components/ui/button'
import { LocationInput } from './components/location-input'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import Map from './components/map'

function Home() {
  const [startLocation, setStartLocation] = useLocalStorage<string>(
    'start-location',
    ''
  )
  const [endLocation, setEndLocation] = useLocalStorage<string>(
    'end-location',
    ''
  )
  return (
    <section className="h-full relative">
      <div className="max-w-screen-xl mx-auto p-8 md:p-16 h-full flex flex-wrap items-center justify-around gap-4">
        <div className="max-w-[350px] w-full flex flex-col gap-4 items-end">
          <div className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2 md:mb-8">
            Ship anything with{' '}
            <span className="bg-gradient-to-tl from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Vüber
            </span>
          </div>
          <LocationInput
            placeholder="From"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
          />
          <LocationInput
            placeholder="To"
            filled={true}
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
          />
          <Link to="/order">
            <Button>
              Get Quote
              <ArrowTopRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="w-full h-full max-w-[500px] max-h-[500px]">
          {import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ? (
            <div className="w-full h-full">
              <Map startLocation={startLocation} endLocation={endLocation} />
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
  )
}

export default Home
