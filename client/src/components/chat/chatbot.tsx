import { useState } from 'react'
import useLocalStorage from 'use-local-storage'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Bot, X } from 'lucide-react'

import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@/components/chat/chat-kit'

const API_KEY = import.meta.env.VITE_OPENAI_SECRET_KEY
interface MessageType {
  message: string
  sender: string
  direction: 'incoming' | 'outgoing'
  position: string // Adjust if neces
}
function Chatbot({ onClose }: { onClose: () => void }) {
  const [typing, setTyping] = useState<boolean>(false)
  const [messages, setMessages] = useLocalStorage<MessageType[]>(
    'chatbot-messages',
    [
      {
        message:
          'Need a hand with anything? I am your dedicated AI package handling expert, Vini :) Ask away!',
        sender: 'ai',
        direction: 'incoming',
        position: 'left',
      },
    ]
  )

  const handleSend = async (message: string) => {
    console.log('User message:', message)
    const newMessage: MessageType = {
      message: message,
      sender: 'user',
      direction: 'outgoing',
      position: 'right',
    }

    const newMessages: MessageType[] = [...messages, newMessage] //all old messages with new message
    setMessages(newMessages)

    await processMessagetoVini(newMessages)
    //After openAi logic
  }

  async function processMessagetoVini(someMessages: MessageType[]) {
    setTyping(true)
    const apiMessages = someMessages.map((messageObject) => {
      let role = ''
      if (messageObject.sender === 'ai') {
        role = 'assistant'
      } else {
        role = 'user'
      }
      return { role: role, content: messageObject.message }
    })

    const systemMessage = {
      role: 'system',
      content: `You are a customer service rep for Vuber - a online package delivery service. Our pricing is based on the distance of the delivery, and on the weight and dimensions of the parcels (many parcels may be included in a single delivery order.) Be as concise as possible when answering messages. Vuber reps. are straight to the point and helpful. You may you function calling to navigate to the page that a user desires, or to simply present them with the link to navigate to a given page.`,
    }

    const apiRequestBody = {
      model: 'gpt-4o-mini',
      messages: [
        systemMessage,
        ...apiMessages, //All the text messages
      ],
    }
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })

    const data = await response.json()
    console.log(data.choices[0].message.content)

    const AiMessage: MessageType = {
      message: data.choices[0].message.content,
      sender: 'ai',
      direction: 'incoming',
      position: 'left',
    }
    const newMessages = [...someMessages, AiMessage]
    setTyping(false)
    setMessages(newMessages)
  }

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="p-4 md:px-6 flex flex-row gap-4 items-center">
        <Bot size={32} />
        <div className="flex-1">
          <CardTitle>VuberBot</CardTitle>
          <CardDescription className="hidden md:block">
            Our friendly support bot
          </CardDescription>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          <X size={24} />
        </button>
      </CardHeader>
      <CardContent className="h-full overflow-auto px-4 md:px-6">
        <ChatContainer>
          <MessageList typingIndicator={typing}>
            {messages.map((message, i) => {
              return (
                <Message key={i} direction={message.direction}>
                  {message.message}
                </Message>
              )
            })}
          </MessageList>
          <div className="mt-2">
            <MessageInput onSend={handleSend} placeholder="Message VuberBot" />
          </div>
        </ChatContainer>
      </CardContent>
    </Card>
  )
}

export default Chatbot
