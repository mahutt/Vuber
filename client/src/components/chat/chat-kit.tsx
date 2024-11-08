import { ReactNode, useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ChatContainer({ children }: { children: ReactNode }) {
  return <div className="flex flex-col h-full mx-3">{children}</div>
}

export function MessageList({
  children,
  typingIndicator = false,
}: {
  children: ReactNode
  typingIndicator?: boolean
}) {
  const messageListRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (messageListRef.current) {
      const lastChild = messageListRef.current.lastElementChild as HTMLElement
      if (lastChild) {
        lastChild.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [children])
  return (
    <div
      ref={messageListRef}
      className="flex flex-col gap-4 flex-1 overflow-scroll"
    >
      {children}
      {typingIndicator && <TypingIndicator />}
    </div>
  )
}

export function TypingIndicator() {
  return (
    <Message direction="incoming">
      <div className="flex flex-row items-center gap-2 h-[24px]">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </div>
    </Message>
  )
}

export type MessageDirection = 'incoming' | 'outgoing'

export function Message({
  children,
  direction,
}: {
  children: ReactNode
  direction?: MessageDirection
}) {
  const incomingStyling = `self-start mr-10 bg-slate-800 text-white px-3 py-2 rounded-tr-lg rounded-br-lg rounded-bl-lg`
  const outgoingStyling = `self-end ml-10 bg-slate-200 text-slate-800 px-3 py-2 rounded-tl-lg rounded-bl-lg rounded-br-lg`
  return (
    <div
      className={direction === 'incoming' ? incomingStyling : outgoingStyling}
    >
      {children}
    </div>
  )
}

export function MessageInput({
  onSend,
  placeholder,
}: {
  onSend: (input: string) => void
  placeholder?: string
}) {
  const [value, setValue] = useState<string>('')
  const handleSend = () => {
    onSend(value)
    setValue('')
  }
  return (
    <div className="flex flex-row gap-4">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSend()
          }
        }}
      />
      <Button onClick={handleSend}>
        <Send size={24} />
      </Button>
    </div>
  )
}
