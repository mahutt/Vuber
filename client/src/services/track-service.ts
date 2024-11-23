import api from './api'
import { Coordinate, BackendUser } from '@/types/types'

export interface TrackingData {
  originCoordinate: Coordinate
  currentCoordinate: Coordinate
  destinationCoordinate: Coordinate
  previousCoordinates: Coordinate[]
  status: string
  user: BackendUser
}

export const trackOrder = async (id: string): Promise<TrackingData | null> => {
  try {
    const response = await api.get<TrackingData>(`/orders/track/${id}`)
    return response.data
  } catch {
    return null
  }
}
