import { Button } from './components/ui/button'
import { LocationInput } from './components/location-input'
import Chatbot from './components/chatbot'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'

function Home() {
  return (
    <section className="h-full relative">
      <div className="max-w-screen-xl mx-auto px-16 h-full flex items-center justify-around gap-4">
        <div className="w-[350px] flex flex-col gap-4 items-end">
          <div className="text-6xl font-extrabold tracking-tight mb-8">
            Ship anything with
            <span className="bg-gradient-to-tl from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Vüber
            </span>
          </div>
          <LocationInput placeholder="From" />
          <LocationInput placeholder="To" filled={true} />
          <Button>
            Get Quote
            <ArrowTopRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div>
          <img
            src="map.png"
            className="size-auto max-w-[500px] max-h-[500px] object-contain rounded-lg"
          ></img>
        </div>
      </div>
      <Chatbot />
    </section>
  )
}

export default Home
