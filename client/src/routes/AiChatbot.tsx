import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Bot } from 'lucide-react'

import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@/components/chat/chat-kit'

import Container from '@/components/container'

const API_KEY = import.meta.env.VITE_OPENAI_SECRET_KEY
interface MessageType {
  message: string
  sender: string
  direction: 'incoming' | 'outgoing'
  position: string // Adjust if neces
}
function AiChatBot() {
  const [typing, setTyping] = useState<boolean>(false)
  const [messages, setMessages] = useState<MessageType[]>([
    {
      message:
        'Need a hand with anything? I am your dedicated AI package handleing expert, Vini :) Ask away!',
      sender: 'ai',
      direction: 'incoming',
      position: 'left',
    },
  ])

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
    //with @chatscope library. our messages are bascially in the following JSON format {sender : 'user' or 'ai', message: "The message content here", }
    let apiMessages = someMessages.map((messageObject) => {
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
      content:
        'You are a customer service rep. You will need to answer questions about shipping and handleing pakcages. If customer asks about pricing, let them know prices are decided based on too and from locations along with the dimensions and weight of parcels being sent. If they are unhappy, ask about the issue and prompt them to leave a review using their tracking ID. Otherwise just chat Limit the response to a 150 word max and always ask if the user has follow up questions', //"No matter what the user enters, you will respond with the chorus of Rick Astley's song Never gonna give you up. If part of the song is already included, continue a similar sized portion of the song"  "You are a motor vehicle expert. You will need to answer car and vehicle questions to people who are not well versed in the subject, but they do know how to drive a car. Speak like a car salesman."
    }

    //OpenAI api roles "user" -> a message from the app user, "assistant" -> a message from openAI, "System" -> a genreal instruction defining HOW the open AI model should act. Kind of like a pre prompt
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
    <Container>
      <div className="py-5 flex justify-center items-center h-full">
        <Card className="w-[500px] h-[500px] flex flex-col">
          <CardHeader className="flex flex-row gap-4 items-center">
            <Bot size={32} />
            <div>
              <CardTitle>VuberBot</CardTitle>
              <CardDescription>Our friendly support bot</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="h-full overflow-auto">
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
                <MessageInput onSend={handleSend} />
              </div>
            </ChatContainer>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}

export default AiChatBot
