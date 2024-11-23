import api from './api'

import { OrderDetails, Order } from '@/types/types'

export const createOrder = async (
  orderDetails: OrderDetails,
  token: string
): Promise<number> => {
  const response = await api.post<number>('/orders/new', {
    orderDetails,
    token,
  })
  return response.data
}

export const getOrderDetails = async (orderId: number): Promise<Order> => {
  const response = await api.get<Order>(`orders/${orderId}`)
  return response.data
}
