import api from '@/services/api'
import { Parcel } from '@/components/order-page/parcel-form'

const fetchQuote = async (parcels: Parcel[]): Promise<number> => {
  //   const { data } = await api.post<{ quote: number }>('/quote', {
  //     parcels,
  //   })
  //   return data.quote

  // client-side quote calculation until backend is online:
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return parcels.reduce((acc, parcel) => acc + parcel.weight, 0)
}

export default fetchQuote
