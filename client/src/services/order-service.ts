import api from './api'

import { OrderDetails } from '@/types/types'

export const createOrder = async (
  orderDetails: OrderDetails
): Promise<number> => {
  try {
    const response = await api.post<number>('/orders/new', orderDetails)
    return response.data
  } catch (error) {
    throw error
  }
}
