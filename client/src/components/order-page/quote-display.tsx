import { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage'
import { Parcel } from '@/types/types'
import fetchQuote from '@/services/fetch-quote'

export default function QuoteDisplay({ className }: { className?: string }) {
  const [parcels] = useLocalStorage<Parcel[]>('order-draft', [])
  const [quote, setQuote] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    fetchQuote(parcels)
      .then(setQuote)
      .finally(() => setLoading(false))
  }, [parcels])
  const formatQuote = (quote: number) => {
    return `$${quote.toFixed(2)}`
  }
  return (
    <div
      className={`${className} ${loading ? 'animate-pulse opacity-20' : ''}`}
    >
      {formatQuote(quote)}
    </div>
  )
}
