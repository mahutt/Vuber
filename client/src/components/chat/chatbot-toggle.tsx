import useLocalStorage from 'use-local-storage'
import { MessageCircleMore } from 'lucide-react'

import Chatbot from '@/components/chat/chatbot'

export default function ChatbotToggle() {
  const [isOpen, setIsOpen] = useLocalStorage<boolean>('chatbot-open', false)
  return (
    <div
      onClick={() => setIsOpen(true)}
      className={`z-50 overflow-hidden group fixed bottom-4 right-4 bg-white cursor-pointer transition-all duration-300 ${
        isOpen
          ? 'w-[500px] h-[500px] rounded-xl'
          : 'w-14 h-14 rounded-full p-2 shadow'
      }`}
    >
      {!isOpen && (
        <MessageCircleMore
          strokeWidth={1.5}
          className={`${
            isOpen ? 'opacity-0' : 'opacity-1'
          } w-full h-full pl-1 pb-1 group-hover:scale-[105%] transition-all duration-150 group-active:scale-[95%]`}
        />
      )}
      {isOpen && (
        <Chatbot
          onClose={() => {
            setIsOpen(false)
          }}
        />
      )}
    </div>
  )
}
