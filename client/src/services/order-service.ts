import api from './api'

import { OrderDetails, Order } from '@/types/types'

export const createOrder = async (
  orderDetails: OrderDetails,
  token: string
): Promise<number> => {
  try {
    const response = await api.post<number>('/orders/new', {
      orderDetails,
      token
    })
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getOrderDetails = async (
 orderId: number
):Promise<Order> => {
  try{
    const response = await api.get<Order>(`orders/${orderId}`)
    return response.data
  }catch(error){
    throw error
  }
}
