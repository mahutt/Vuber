import { Outlet } from 'react-router-dom'
import ChatbotToggle from '@/components/chat/chatbot-toggle'
import Navbar from '@/components/navbar'
import NavbarMobile from '@/components/navbar-mobile'

export default function Root() {
  return (
    <div className="h-screen flex flex-col">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="block md:hidden">
        <NavbarMobile />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
      {/* <footer>Global layout footer</footer> */}
      <ChatbotToggle />
    </div>
  )
}
