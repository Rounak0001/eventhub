import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { paymentService } from '../api/services/payments'
import { formatCurrency } from '../utils/format'

export function PaymentPage() {
  const [values, setValues] = useState({
    eventId: 'evt-2',
    amount: 1499,
    currency: 'INR',
    paymentMethod: 'UPI',
    simulatedStatus: 'SUCCESS' as 'SUCCESS' | 'FAILED' | 'PENDING',
  })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('')
    setLoading(true)
    try {
      await paymentService.create(values)
      setStatus(`Demo payment flow submitted with status ${values.simulatedStatus}.`)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section-shell py-10">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="paper-panel floral-corner px-6 py-8">
          <span className="eyebrow">Demo Payment</span>
          <h1 className="section-title">Realistic checkout UX without external payment gateway drag.</h1>
          <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
            This page is intentionally aligned to the internal demo-payment contract so the backend can simulate success, failure, or pending states cleanly.
          </p>
          <div className="mt-8 rounded-[1.5rem] bg-white/70 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">Current amount</p>
            <p className="mt-3 font-display text-4xl">{formatCurrency(values.amount)}</p>
          </div>
        </div>

        <form className="paper-panel px-6 py-8" onSubmit={handleSubmit}>
          <h2 className="font-display text-4xl">Simulate event registration payment</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <input className="field" value={values.eventId} onChange={(event) => setValues((current) => ({ ...current, eventId: event.target.value }))} />
            <input type="number" className="field" value={values.amount} onChange={(event) => setValues((current) => ({ ...current, amount: Number(event.target.value) }))} />
            <input className="field" value={values.currency} onChange={(event) => setValues((current) => ({ ...current, currency: event.target.value }))} />
            <select className="field" value={values.paymentMethod} onChange={(event) => setValues((current) => ({ ...current, paymentMethod: event.target.value }))}>
              <option value="UPI">UPI</option>
              <option value="CARD">Card</option>
              <option value="NET_BANKING">Net Banking</option>
            </select>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {['SUCCESS', 'FAILED', 'PENDING'].map((state) => (
              <button
                key={state}
                type="button"
                onClick={() => setValues((current) => ({ ...current, simulatedStatus: state as 'SUCCESS' | 'FAILED' | 'PENDING' }))}
                className={`rounded-[1.3rem] border px-4 py-3 text-sm font-semibold ${values.simulatedStatus === state ? 'border-[color:var(--color-gold)] bg-[color:rgba(185,146,71,0.12)]' : 'border-[color:rgba(125,106,95,0.18)] bg-white/60'}`}
              >
                {state}
              </button>
            ))}
          </div>

          {status ? <p className="mt-4 text-sm text-[color:var(--color-gold-deep)]">{status}</p> : null}

          <button type="submit" className="primary-button mt-8 w-full" disabled={loading}>
            {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
            Run Demo Payment
          </button>
        </form>
      </div>
    </section>
  )
}
