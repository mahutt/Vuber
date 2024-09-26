import Chatbot from './components/chatbot'

function Home() {
  return (
    <section className="flex-1 relative">
      <div className="max-w-screen-xl mx-auto px-16 h-full flex items-center justify-around">
        <div>
          {/* form goes here */}
          form
        </div>
        <div>
          {/* map goes here */}
          map
        </div>
      </div>
      <Chatbot />
    </section>
  )
}

export default Home
