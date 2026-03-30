import { useQuery } from '@tanstack/react-query'
import { adminService } from '../api/services/admin'
import { AdminTable } from '../components/AdminTable'
import { formatCurrency } from '../utils/format'

export function AdminPage() {
  const dashboardQuery = useQuery({ queryKey: ['admin', 'dashboard'], queryFn: adminService.dashboard })
  const eventsQuery = useQuery({ queryKey: ['admin', 'events'], queryFn: adminService.events })
  const paymentsQuery = useQuery({ queryKey: ['admin', 'payments'], queryFn: adminService.payments })

  const dashboard = dashboardQuery.data ?? {
    totalUsers: 0,
    totalEvents: 0,
    totalRegistrations: 0,
    totalRevenue: 0,
  }

  return (
    <section className="section-shell py-10">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="eyebrow">Admin Console</span>
          <h1 className="section-title max-w-3xl">A clear view of the activity, bookings, and revenue that keep EventZen moving.</h1>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-[color:var(--color-muted)]">
          Track the health of your platform, review upcoming events, and stay close to every important transaction.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Total users', dashboard.totalUsers],
          ['Total events', dashboard.totalEvents],
          ['Registrations', dashboard.totalRegistrations],
          ['Revenue', formatCurrency(dashboard.totalRevenue)],
        ].map(([label, value]) => (
          <div key={label} className="paper-panel px-6 py-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">{label}</p>
            <p className="mt-4 font-display text-4xl">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        <AdminTable
          title="Event Overview"
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'city', label: 'City' },
            { key: 'status', label: 'Status' },
            { key: 'date', label: 'Date' },
          ]}
          rows={(eventsQuery.data ?? []).map((event) => ({
            title: event.title,
            city: event.city ?? `City #${event.cityId}`,
            status: event.status ?? 'CONFIRMED',
            date: event.date,
          }))}
        />
        <AdminTable
          title="Payment Activity"
          columns={[
            { key: 'registrationId', label: 'Registration' },
            { key: 'amount', label: 'Amount' },
            { key: 'status', label: 'Status' },
            { key: 'createdAt', label: 'Created' },
          ]}
          rows={(paymentsQuery.data ?? []).map((transaction) => ({
            registrationId: transaction.registrationId,
            amount: formatCurrency(transaction.amount),
            status: transaction.status,
            createdAt: transaction.createdAt ?? '-',
          }))}
        />
      </div>
    </section>
  )
}
