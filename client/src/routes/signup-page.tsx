import Container from '@/components/container'
import { ReactNode, useState } from 'react'
import { Package, Truck } from 'lucide-react'

function OptionCard({
  children,
  title,
  tag,
  active,
  onMouseDown,
}: {
  children: ReactNode
  title: string
  tag: string
  active: boolean
  onMouseDown?: () => void
}) {
  return (
    <div
      className={`rounded-2xl border shadow-md ${
        active ? 'border-blue-500 shadow-blue-500' : 'opacity-80'
      } p-8 transform transition-transform duration-300 hover:scale-[101%] active:scale-[99%] cursor-pointer`}
      onMouseDown={onMouseDown}
    >
      <div className="flex flex-col items-center gap-4">
        <div className={`text-xl font-medium ${active ? 'text-blue-500' : ''}`}>
          {title}
        </div>
        <div>{children}</div>
        <div className="text-sm text-gray-500">{tag}</div>
      </div>
    </div>
  )
}

export default function SignupPage() {
  const [userType, setUserType] = useState<'sender' | 'driver'>('sender')
  return (
    <Container>
      <div className="h-full flex flex-row justify-center gap-4 items-center">
        <OptionCard
          title="Sender"
          tag="I want to send packages."
          active={userType === 'sender'}
          onMouseDown={() => setUserType('sender')}
        >
          <Package className="w-32 h-32 text-gray-800" />
        </OptionCard>
        <OptionCard
          title="Driver"
          tag="I want to deliver packages."
          active={userType === 'driver'}
          onMouseDown={() => setUserType('driver')}
        >
          <Truck className="w-32 h-32 text-gray-800" />
        </OptionCard>
      </div>
    </Container>
  )
}
