import { ReactNode, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Container from '@/components/container'
import { Package, Truck, ArrowUpRightIcon } from 'lucide-react'
import { useAuth } from '@/providers/AuthProvider'
import ErrorBanner from '@/components/error-banner'

const formSchema = z.object({
  email: z
    .string()
    .email({ message: 'Users must register with a valid email address' }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
  role: z.enum(['sender', 'driver']),
})

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
      className={`flex-1 rounded-2xl border shadow-md ${
        active ? 'border-blue-500 shadow-blue-500' : 'opacity-80'
      } p-4 transform transition-transform duration-300 hover:scale-[101%] active:scale-[99%] cursor-pointer`}
      onMouseDown={onMouseDown}
    >
      <div className="flex gap-4">
        <div>{children}</div>
        <div className="flex flex-col">
          <div
            className={`text-lg font-medium ${active ? 'text-blue-500' : ''}`}
          >
            {title}
          </div>
          <div className="text-xs text-gray-500">{tag}</div>
        </div>
      </div>
    </div>
  )
}

export default function SignupPage() {
  const { signup, signin } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [userType, setUserType] = useState<'sender' | 'driver'>('sender')
  const [bannerMessage, setBannerMessage] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'sender',
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (await signup(values.email, values.password, values.role)) {
      await signin(values.email, values.password)
      const redirectLocation = searchParams.get('redirect')
      navigate(redirectLocation ? `/${redirectLocation}` : '/profile')
    } else {
      setBannerMessage('We could not create your account. Please try again.')
    }
  }
  return (
    <Container>
      <div className="h-full flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[484px] w-full flex flex-col gap-4 justify-center items-stretch"
          >
            <div className="w-full py-2">
              <h1 className="text-2xl font-bold tracking-tight">
                Create your Vüber account
              </h1>
            </div>
            {bannerMessage && <ErrorBanner message={bannerMessage} />}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="py-5 text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="py-5 text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel className="text-gray-700">Account type</FormLabel>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <OptionCard
                  title="Sender"
                  tag="I want to send packages."
                  active={userType === 'sender'}
                  onMouseDown={() => {
                    setUserType('sender')
                    form.setValue('role', 'sender')
                  }}
                >
                  <Package className="w-16 h-16 text-gray-800" />
                </OptionCard>
                <OptionCard
                  title="Driver"
                  tag="I want to deliver packages."
                  active={userType === 'driver'}
                  onMouseDown={() => {
                    setUserType('driver')
                    form.setValue('role', 'driver')
                  }}
                >
                  <Truck className="w-16 h-16 text-gray-800" />
                </OptionCard>
              </div>
            </FormItem>
            <Button type="submit" className="py-6 rounded-lg">
              Create account
            </Button>
            <Link
              to={`/signin${
                searchParams.get('redirect') === 'payment'
                  ? '?redirect=payment'
                  : ''
              }`}
              className="text-blue-500 hover:underline text-center"
            >
              Already have an account? Log in
              <ArrowUpRightIcon className="w-4 h-4 inline-block ml-1" />
            </Link>
          </form>
        </Form>
      </div>
    </Container>
  )
}
