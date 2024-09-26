import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import Chatbot from './components/chatbot'

function Home() {
  return (
    <section className="flex-1 relative">
      <div className="max-w-screen-xl mx-auto px-16 h-full flex items-center justify-around gap-4">
        <div className="w-[300px] flex flex-col gap-4 items-end">
          <div className="text-4xl font-bold">Ship anything with Vüber</div>
           <Input placeholder="From" className=""></Input>
           <Input placeholder="To" className=""></Input>
           <Button className="">Get Quote</Button>
        </div>
        <div>
          <img src="map.png" className="size-auto max-w-[500px] max-h-[500px] object-contain"></img>
        </div>
      </div>
      <Chatbot />
    </section>
  )
}

export default Home
