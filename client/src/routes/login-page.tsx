import { Link, useNavigate } from 'react-router-dom'
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

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default function LoginPage() {
  const { signin } = useAuth()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    if (await signin(values.email, values.password)) {
      navigate('/profile')
    } else {
      alert('Invalid email or password')
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input {...field} className="py-5" />
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
                  <Input type="password" {...field} className="py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center">
            <Link
              to="/signup"
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
