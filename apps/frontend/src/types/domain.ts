export type City = 'Kolkata' | 'Mumbai' | 'Bangalore'
export type EventType = 'WEDDING' | 'PARTY' | 'CONCERT'
export type VendorType = 'FOOD' | 'DECORATION'
export type VendorTier = 'STANDARD' | 'PREMIUM' | 'PLUS'
export type EventVisibility = 'PUBLIC' | 'PRIVATE'
export type TicketType = 'FREE' | 'PAID'
export type EventStatus = 'DRAFT' | 'CONFIRMED' | 'CANCELLED' | 'RESCHEDULED' | 'COMPLETED'

export interface UserProfile {
  id: string
  fullName: string
  email: string
  phone?: string
  role?: 'USER' | 'ADMIN'
  city?: City
  avatarUrl?: string
}

export interface EventSummary {
  id: string
  title: string
  eventType: EventType
  city: City
  date: string
  startTime?: string
  endTime?: string
  heroImage?: string
  guestCount?: number
  bookedSeats?: number
  seatCapacity?: number
  status?: EventStatus
  venueName?: string
  description?: string
  budget?: number
  visibility?: EventVisibility
  ticketType?: TicketType
  ticketPrice?: number
  registrationDeadline?: string
  foodTier?: VendorTier
  decorationTier?: VendorTier
}

export interface EventDetails extends EventSummary {
  venueId?: string
  foodVendorId?: string
  decorationVendorId?: string
  venueCost?: number
  foodCost?: number
  decorationCost?: number
  totalCost?: number
  accessCode?: string
}

export interface Venue {
  id: string
  name: string
  city: City
  eventType?: EventType
  image?: string
  capacity?: number
  startingPrice?: number
  style?: string
  address?: string
}

export interface Vendor {
  id: string
  name: string
  type: VendorType
  tier: VendorTier
  city?: City
  eventType?: EventType
  description?: string
  priceFrom?: number
  image?: string
}

export interface Registration {
  id: string
  eventId: string
  eventTitle?: string
  guestName: string
  guestEmail: string
  seats: number
  amount?: number
  status?: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'CANCELLED'
  paymentStatus?: 'NOT_REQUIRED' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'
}

export interface PaymentPayload {
  registrationId?: string
  eventId?: string
  amount: number
  currency: string
  paymentMethod: string
  simulatedStatus?: 'SUCCESS' | 'FAILED' | 'PENDING'
}

export interface AdminAnalytics {
  totalEvents: number
  activeBookings: number
  revenue: number
  occupancyRate: number
}
