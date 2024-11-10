import api from './api'



export const trackOrder = async (
  id:any
): Promise<any> => {
  try {
    const response = await api.get<any>(`/orders/track/${id}`)
    
    return response
  } catch (error) {
    throw error
  }
}
