export interface Parcel {
  name: string
  description: string
  weight: number
  weightUnit: 'lb' | 'kg'
  size: {
    width: number
    height: number
    length: number
  }
  sizeUnit: 'in' | 'cm'
}

export interface User {
  id: number
  name: string
}

export interface BackendUser {
  username: string
}

export interface OrderDetails {
  total: number
  parcels: Parcel[]
  originCoordinates: Coordinate
  destinationCoordinates: Coordinate
  pickupInstructions: string
  dropoffInstructions: string
}

export interface Coordinate {
  lat: number
  lng: number
}
