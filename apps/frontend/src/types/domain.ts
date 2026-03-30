export type EntityId = number | string

export type UserRole = 'CUSTOMER' | 'ADMIN'
export type VendorType = 'FOOD' | 'DECORATION'
export type VendorTier = 'STANDARD' | 'PREMIUM' | 'PLUS'
export type EventVisibility = 'PUBLIC' | 'PRIVATE'
export type TicketType = 'FREE' | 'PAID'
export type EventStatus = 'DRAFT' | 'CONFIRMED' | 'CANCELLED' | 'RESCHEDULED' | 'COMPLETED'

export interface City {
  id: number
  name: string
}

export interface EventType {
  id: number
  name: string
}

export interface UserProfile {
  id: number
  name: string
  email: string
  phone?: string
  role?: UserRole
  city?: string
  avatarUrl?: string
  bio?: string
  address?: string
  isActive?: boolean
}

export interface EventSummary {
  id: EntityId
  organizerId?: number
  cityId?: number
  eventTypeId?: number
  venueId?: number
  decorationVendorId?: number
  foodVendorId?: number
  title: string
  eventType?: string
  city?: string
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
  accessCode?: string
  venueCost?: number
  foodCost?: number
  decorationCost?: number
  platformFee?: number
  totalCost?: number
}

export interface Venue {
  id: EntityId
  name: string
  cityId?: number
  eventTypeId?: number
  city?: string
  eventType?: string
  image?: string
  capacity?: number
  basePrice?: number
  startingPrice?: number
  style?: string
  address?: string
  description?: string
  status?: string
}

export interface Vendor {
  id: EntityId
  name: string
  type: VendorType
  tier: VendorTier
  cityId?: number
  eventTypeId?: number
  city?: string
  eventType?: string
  description?: string
  price?: number
  priceFrom?: number
  image?: string
  status?: string
}

export interface Registration {
  id: EntityId
  eventId: EntityId
  userId?: number
  attendeeName: string
  attendeeEmail: string
  attendeePhone?: string
  quantity: number
  seats?: number
  amount?: number
  status?: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'CANCELLED'
  paymentStatus?: 'PENDING' | 'SUCCESS' | 'FAILED' | 'NOT_REQUIRED'
  createdAt?: string
}

export interface PaymentRecord {
  id: number
  registrationId: number
  payerUserId?: number
  amount: number
  status: string
  provider?: string
  paymentType?: string
  paidAt?: string
  createdAt?: string
}

export interface AdminDashboard {
  totalUsers: number
  totalEvents: number
  totalRegistrations: number
  totalRevenue: number
}
