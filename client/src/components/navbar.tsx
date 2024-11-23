import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import useLocalStorage from 'use-local-storage'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

import {
  CubeIcon,
  QuestionMarkCircledIcon,
  EnvelopeClosedIcon,
  ChatBubbleIcon,
} from '@radix-ui/react-icons'
import { Truck } from 'lucide-react'
import ProfileButton from '@/components/profile-button'
import React from 'react'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
}

const linkStyling =
  'h-9 rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none'

const Link: React.FC<LinkProps> = ({ to, ...props }) => {
  const location = useLocation()
  const isActive = to === location.pathname

  return (
    <NavigationMenuLink asChild active={isActive}>
      <ReactRouterLink to={to} {...props} className={linkStyling} />
    </NavigationMenuLink>
  )
}

export default function Navbar() {
  const [_unused, setChatbotOpen] = useLocalStorage<boolean>(
    'chatbot-open',
    false
  )
  return (
    <header className="bg-black">
      <div className="max-w-screen-xl mx-auto px-16 py-3 flex flex-row items-center gap-4">
        <ReactRouterLink to="/" className="text-white font-bold text-xl">
          Vüber
        </ReactRouterLink>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="dark text-white">
              <Link to="/track">Track</Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="dark text-white">
              <NavigationMenuTrigger>Deliver</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="m-2 flex flex-col w-[200px]">
                  <Link to="/order">
                    <div className="flex flex-row gap-2 items-center">
                      <CubeIcon className="h-4 w-4" />
                      Place an order
                    </div>
                  </Link>
                  <Link to="/signup">
                    <div className="flex flex-row gap-2 items-center">
                      <Truck className="h-4 w-4" />
                      Drive for us
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="dark text-white">
              <NavigationMenuTrigger>Support</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="m-2 flex flex-col w-[250px]">
                  <button
                    onClick={() => setChatbotOpen(true)}
                    className={linkStyling}
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <ChatBubbleIcon className="h-4 w-4" />
                      Chatbot
                    </div>
                  </button>
                  <Link to="/faq">
                    <div className="flex flex-row gap-2 items-center">
                      <QuestionMarkCircledIcon className="h-4 w-4" />
                      FAQ
                    </div>
                  </Link>
                  <Link to="/contact-page">
                    <div className="flex flex-row gap-2 items-center">
                      <EnvelopeClosedIcon className="h-4 w-4" />
                      Contact us
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="dark text-white">
              <Link to="/about">About</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex-1"></div>
        <ProfileButton />
      </div>
    </header>
  )
}
