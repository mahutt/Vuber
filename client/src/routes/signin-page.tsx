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
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { useAuth } from '@/providers/AuthProvider'
import ErrorBanner from '@/components/error-banner'
import { useState } from 'react'

const SigninFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default function SigninPage() {
  const { signin } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [bannerMessage, setBannerMessage] = useState<string | null>(null)
  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof SigninFormSchema>) {
    if (await signin(values.email, values.password)) {
      const redirectLocation = searchParams.get('redirect')
      navigate(redirectLocation ? `/${redirectLocation}` : '/profile')
    } else {
      setBannerMessage('Invalid email or password')
    }
  }

  return (
    <div className="flex justify-center pt-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[515px] p-10 border shadow rounded-3xl space-y-6"
        >
          <div className="text-2xl font-bold">Sign in to Vüber</div>
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

          <div className="flex justify-between items-center">
            <Link
              to={`/signup${
                searchParams.get('redirect') === 'payment'
                  ? '?redirect=payment'
                  : ''
              }`}
              className="text-blue-500 hover:underline flex gap-1 items-center"
            >
              Sign up instead
              <ArrowTopRightIcon className="w-4 h-4" />
            </Link>
            <Button type="submit">Sign in</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
