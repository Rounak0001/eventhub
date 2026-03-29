import { useQuery } from '@tanstack/react-query'
import { adminService } from '../api/services/admin'
import { AdminTable } from '../components/AdminTable'

export function AdminPage() {
  const analyticsQuery = useQuery({ queryKey: ['admin', 'analytics'], queryFn: adminService.analytics })
  const eventsQuery = useQuery({ queryKey: ['admin', 'events'], queryFn: adminService.events })
  const transactionsQuery = useQuery({ queryKey: ['admin', 'transactions'], queryFn: adminService.transactions })

  const analytics = analyticsQuery.data ?? {
    totalEvents: 12,
    activeBookings: 86,
    revenue: 2840000,
    occupancyRate: 94,
  }

  return (
    <section className="section-shell py-10">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="eyebrow">Admin Console</span>
          <h1 className="section-title max-w-3xl">Admin UX now reflects the actual operational responsibilities for the platform.</h1>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-[color:var(--color-muted)]">
          This screen is staged for metrics, transactions, and event intervention actions like cancel and reschedule.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Total events', analytics.totalEvents],
          ['Active registrations', analytics.activeBookings],
          ['Revenue', `₹${analytics.revenue.toLocaleString('en-IN')}`],
          ['Occupancy', `${analytics.occupancyRate}%`],
        ].map(([label, value]) => (
          <div key={label} className="paper-panel px-6 py-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">{label}</p>
            <p className="mt-4 font-display text-4xl">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        <AdminTable
          title="Event Operations"
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'city', label: 'City' },
            { key: 'status', label: 'Status' },
            { key: 'actions', label: 'Actions' },
          ]}
          rows={(eventsQuery.data ?? []).map((event) => ({
            title: event.title,
            city: event.city,
            status: event.status ?? 'CONFIRMED',
            actions: 'Cancel / Reschedule',
          }))}
        />
        <AdminTable
          title="Transactions"
          columns={[
            { key: 'guestName', label: 'User' },
            { key: 'amount', label: 'Amount' },
            { key: 'status', label: 'Status' },
            { key: 'createdAt', label: 'Created' },
          ]}
          rows={(transactionsQuery.data ?? []).map((transaction) => ({
            guestName: transaction.guestName,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
          }))}
        />
      </div>
    </section>
  )
}
