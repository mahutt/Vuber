export interface Parcel {
  id: number
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
  role: 'SENDER' | 'DRIVER'
  orders: Order[]
  assignedOrders: Order[]
}

export interface Order {
  id: number
  total: number
  status: string
  parcels: Parcel[]
  origin: string
  destination: string
  pickupInstructions: string
  dropoffInstructions: string
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

export interface EmailDetails {
  Name: string
  PhoneNum: string
  Email: string
  Message: string
}
