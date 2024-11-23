import React from 'react'
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import useLocalStorage from 'use-local-storage'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  CubeIcon,
  QuestionMarkCircledIcon,
  EnvelopeClosedIcon,
  ChatBubbleIcon,
} from '@radix-ui/react-icons'
import { Truck } from 'lucide-react'
import ProfileButton from '@/components/profile-button'
import { DialogTitle } from '@/components/ui/dialog'

const linkStyling =
  'w-full text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none py-2'
const menuItemStyling = 'flex flex-row items-center gap-2'

export default function NavbarMobile() {
  const [_, setChatbotOpen] = useLocalStorage<boolean>('chatbot-open', false)
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState(false)

  const isActive = (path: string) => path === location.pathname

  return (
    <header className="bg-black">
      <div className="px-4 py-3 flex flex-row items-center justify-between">
        <ReactRouterLink to="/" className="text-white font-bold text-xl">
          Vüber
        </ReactRouterLink>

        <div className="flex items-center gap-2">
          <ProfileButton />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-64">
              <DialogTitle>Menu</DialogTitle>
              <nav className="flex flex-col gap-4 mt-8">
                <ReactRouterLink
                  to="/track"
                  className={`${linkStyling} ${
                    isActive('/track') ? 'bg-accent' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Track
                </ReactRouterLink>

                <Accordion type="single" collapsible>
                  <AccordionItem value="deliver">
                    <AccordionTrigger>Deliver</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 pl-2">
                        <ReactRouterLink
                          to="/order"
                          className={linkStyling}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className={menuItemStyling}>
                            <CubeIcon className="h-4 w-4" />
                            Place an order
                          </div>
                        </ReactRouterLink>
                        <ReactRouterLink
                          to="/signup"
                          className={linkStyling}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className={menuItemStyling}>
                            <Truck className="h-4 w-4" />
                            Drive for us
                          </div>
                        </ReactRouterLink>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="support">
                    <AccordionTrigger>Support</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 pl-2">
                        <button
                          onClick={() => {
                            setChatbotOpen(true)
                            setIsOpen(false)
                          }}
                          className={linkStyling}
                        >
                          <div className={menuItemStyling}>
                            <ChatBubbleIcon className="h-4 w-4" />
                            Chatbot
                          </div>
                        </button>
                        <ReactRouterLink
                          to="/faq"
                          className={linkStyling}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className={menuItemStyling}>
                            <QuestionMarkCircledIcon className="h-4 w-4" />
                            FAQ
                          </div>
                        </ReactRouterLink>
                        <ReactRouterLink
                          to="/contact-page"
                          className={linkStyling}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className={menuItemStyling}>
                            <EnvelopeClosedIcon className="h-4 w-4" />
                            Contact us
                          </div>
                        </ReactRouterLink>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <ReactRouterLink
                  to="/about"
                  className={`${linkStyling} ${
                    isActive('/about') ? 'bg-accent' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  About
                </ReactRouterLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
