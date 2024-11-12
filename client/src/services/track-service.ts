import api from './api'
import { Coordinate } from '@/types/types'

export interface TrackingData {
  originCoordinate: Coordinate
  currentCoordinate: Coordinate
  destinationCoordinate: Coordinate
  previousCoordinates: Coordinate[]
  status: string
}

export const trackOrder = async (id: any): Promise<TrackingData | null> => {
  try {
    const response = await api.get<TrackingData>(`/orders/track/${id}`)
    return response.data
  } catch (error) {
    return null
  }
}
