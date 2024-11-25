import api from './api'
import { Order } from '@/types/types'

const completeOrder = async (orderId: number): Promise<boolean> => {
  try {
    const response = await api.post<Order>(`/orders/complete/${orderId}`)
    return response.status === 200
  } catch (error) {
    return false
  }
}

export default completeOrder
