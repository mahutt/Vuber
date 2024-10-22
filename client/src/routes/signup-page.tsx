import { Link } from 'react-router-dom'
import Container from '@/components/container'
import { ReactNode } from 'react'
import { Package, Truck } from 'lucide-react'

function OptionCard({
  children,
  target,
  title,
  tag,
}: {
  children: ReactNode
  target: string
  title: string
  tag: string
}) {
  return (
    <Link to={target}>
      <div className="rounded-2xl shadow-lg p-8 transform transition-transform duration-300 hover:scale-[102%]">
        <div className="flex flex-col items-center gap-4">
          <div className="text-xl font-medium">{title}</div>
          <div>{children}</div>
          <div className="text-sm text-gray-500">{tag}</div>
        </div>
      </div>
    </Link>
  )
}

export default function SignupPage() {
  return (
    <Container>
      <div className="h-full flex flex-row justify-center gap-4 items-center">
        <OptionCard
          target="sender"
          title="Sender"
          tag="I want to send packages."
        >
          <Package className="w-32 h-32 text-gray-800" />
        </OptionCard>
        <div className="text-4xl font-bold text-gray-300">- or -</div>
        <OptionCard
          target="driver"
          title="Driver"
          tag="I want to deliver packages."
        >
          <Truck className="w-32 h-32 text-gray-800" />
        </OptionCard>
      </div>
    </Container>
  )
}
