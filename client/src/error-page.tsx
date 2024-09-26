import { useRouteError, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowTopLeftIcon } from '@radix-ui/react-icons'

interface Error {
  statusText?: string
  message: string
}

export default function ErrorPage() {
  const error: Error = useRouteError() as Error

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-black">
          Something went wrong
        </h1>
        <p className="text-xl mb-4 text-gray-700">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-lg mb-8 italic text-gray-600">
          {error.statusText || error.message}
        </p>
        <div className="inline-block relative overflow-hidden group">
          <Link to="/">
            <Button>
              <ArrowTopLeftIcon className="w-5 h-5 mr-2" />
              Go Back Home
            </Button>
          </Link>
          <div className="absolute inset-0 bg-gray-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-10"></div>
        </div>
      </div>
    </div>
  )
}
