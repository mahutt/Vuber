import { Outlet, Link as ReactRouterLink, useLocation } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import {
  CubeIcon,
  QuestionMarkCircledIcon,
  EnvelopeClosedIcon,
  ChatBubbleIcon,
} from '@radix-ui/react-icons'
import { Truck } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
}

const Link: React.FC<LinkProps> = ({ to, ...props }) => {
  let location = useLocation()
  const isActive = to === location.pathname

  return (
    <NavigationMenuLink asChild active={isActive}>
      <ReactRouterLink
        to={to}
        {...props}
        className="h-9 rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
      />
    </NavigationMenuLink>
  )
}

export default function Root() {
  const { user } = useAuth()
  return (
    <div className="h-screen flex flex-col">
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
                    <Link to="/register">
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
                    <Link to="/chatbot">
                      <div className="flex flex-row gap-2 items-center">
                        <ChatBubbleIcon className="h-4 w-4" />
                        Chatbot
                      </div>
                    </Link>
                    <Link to="/faq">
                      <div className="flex flex-row gap-2 items-center">
                        <QuestionMarkCircledIcon className="h-4 w-4" />
                        FAQ
                      </div>
                    </Link>
                    <Link to="/contact">
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
          {user ? (
            <ReactRouterLink to={user ? `/profile` : `/login`}>
              <Avatar>
                <AvatarFallback>
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </ReactRouterLink>
          ) : (
            <>
              <ReactRouterLink
                to="/signup"
                className="text-blue-400 hover:underline text-sm font-medium"
              >
                Sign up
              </ReactRouterLink>
              <ReactRouterLink to="/login">
                <Button className="bg-blue-500 hover:bg-blue-400 transition-color duration-200">
                  Sign in
                </Button>
              </ReactRouterLink>
            </>
          )}
        </div>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
      {/* <footer>Global layout footer</footer> */}
    </div>
  )
}
