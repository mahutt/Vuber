import { Outlet } from 'react-router-dom'
import ChatbotToggle from '@/components/chat/chatbot-toggle'
import Navbar from '@/components/navbar'

export default function Root() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      {/* <footer>Global layout footer</footer> */}
      <ChatbotToggle />
    </div>
  )
}
