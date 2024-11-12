import { Parcel } from '@/types/types'
import api from './api'

const fetchQuote = async (parcels: Parcel[]): Promise<number> => {
    try {
        const quote = await api.post<number>('/orders/quote', parcels )
        return quote.data
    } catch (error) {
        console.error('Failed to fetch quote:', error)
        return -1;
    }
}

export default fetchQuote
