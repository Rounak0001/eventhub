import { apiClient } from '../client'
import type { AdminDashboard, EventSummary, PaymentRecord, UserProfile } from '../../types/domain'

type RawRow = Array<string | number | boolean | null>

function toNumber(value: unknown) {
  return typeof value === 'number' ? value : Number(value ?? 0)
}

function mapDashboard(data: Record<string, unknown>): AdminDashboard {
  return {
    totalUsers: toNumber(data.totalUsers),
    totalEvents: toNumber(data.totalEvents),
    totalRegistrations: toNumber(data.totalRegistrations),
    totalRevenue: toNumber(data.totalRevenue),
  }
}

function mapUserRow(row: RawRow): UserProfile {
  return {
    id: toNumber(row[0]),
    name: String(row[1] ?? ''),
    email: String(row[2] ?? ''),
    role: String(row[4] ?? 'CUSTOMER') as UserProfile['role'],
    phone: row[5] ? String(row[5]) : undefined,
    avatarUrl: row[6] ? String(row[6]) : undefined,
    city: row[7] ? String(row[7]) : undefined,
    isActive: Boolean(row[8]),
  }
}

function mapEventRow(row: RawRow): EventSummary {
  return {
    id: toNumber(row[0]),
    organizerId: toNumber(row[1]),
    cityId: toNumber(row[2]),
    eventTypeId: toNumber(row[3]),
    venueId: toNumber(row[4]),
    decorationVendorId: toNumber(row[5]),
    foodVendorId: toNumber(row[6]),
    title: String(row[7] ?? ''),
    description: row[8] ? String(row[8]) : undefined,
    date: row[9] ? String(row[9]) : '',
    startTime: row[10] ? String(row[10]) : undefined,
    endTime: row[11] ? String(row[11]) : undefined,
    seatCapacity: toNumber(row[12]),
    bookedSeats: toNumber(row[13]),
    visibility: String(row[14] ?? 'PUBLIC') as EventSummary['visibility'],
    ticketType: String(row[16] ?? 'FREE') as EventSummary['ticketType'],
    ticketPrice: row[17] == null ? undefined : toNumber(row[17]),
    budget: row[22] == null ? undefined : toNumber(row[22]),
    status: String(row[23] ?? 'CONFIRMED') as EventSummary['status'],
    registrationDeadline: row[24] ? String(row[24]) : undefined,
    city: `City #${row[2]}`,
    eventType: `Type #${row[3]}`,
  }
}

function mapPaymentRow(row: RawRow): PaymentRecord {
  return {
    id: toNumber(row[0]),
    registrationId: toNumber(row[2]),
    payerUserId: row[3] == null ? undefined : toNumber(row[3]),
    provider: row[4] ? String(row[4]) : undefined,
    amount: toNumber(row[7]),
    status: String(row[10] ?? 'PENDING'),
    paidAt: row[11] ? String(row[11]) : undefined,
    createdAt: row[12] ? String(row[12]) : undefined,
  }
}

export const adminService = {
  dashboard: async () => {
    const { data } = await apiClient.get<Record<string, unknown>>('/admin/dashboard')
    return mapDashboard(data)
  },
  users: async () => {
    const { data } = await apiClient.get<RawRow[]>('/admin/users')
    return data.map(mapUserRow)
  },
  events: async () => {
    const { data } = await apiClient.get<RawRow[]>('/admin/events')
    return data.map(mapEventRow)
  },
  registrations: async () => {
    const { data } = await apiClient.get('/admin/registrations')
    return data
  },
  payments: async () => {
    const { data } = await apiClient.get<RawRow[]>('/admin/payments')
    return data.map(mapPaymentRow)
  },
}
