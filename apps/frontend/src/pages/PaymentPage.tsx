import { LoaderCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { paymentService } from '../api/services/payments'
import { useSession } from '../providers/SessionProvider'
import { formatCurrency } from '../utils/format'

export function PaymentPage() {
  const { user } = useSession()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const initialRegistrationId = Number(searchParams.get('registrationId') ?? 0)
  const initialAmount = Number(searchParams.get('amount') ?? 0)

  const [values, setValues] = useState({
    registrationId: initialRegistrationId,
    amount: initialAmount,
  })

  const canSubmit = useMemo(
    () => Boolean(user?.id && values.registrationId > 0 && values.amount >= 0),
    [user?.id, values.amount, values.registrationId],
  )

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!user) {
      setStatus('Please sign in before processing a payment.')
      return
    }

    setStatus('')
    setLoading(true)
    try {
      const payment = await paymentService.process({
        registrationId: values.registrationId,
        userId: user.id,
        amount: values.amount,
      })
      setStatus(`Payment ${payment.status.toLowerCase()} for registration #${payment.registrationId}.`)
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
          <span className="eyebrow">Payment</span>
          <h1 className="section-title">Complete your booking and confirm your place with ease.</h1>
          <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
            Review the amount below, complete your payment, and we will update your booking status right away.
          </p>
          <div className="mt-8 rounded-[1.5rem] bg-white/70 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">Amount due</p>
            <p className="mt-3 font-display text-4xl">{formatCurrency(values.amount)}</p>
          </div>
        </div>

        <form className="paper-panel px-6 py-8" onSubmit={handleSubmit}>
          <h2 className="font-display text-4xl">Confirm payment</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <input
              type="number"
              className="field"
              placeholder="Registration ID"
              value={values.registrationId || ''}
              onChange={(event) => setValues((current) => ({ ...current, registrationId: Number(event.target.value) }))}
            />
            <input
              type="number"
              className="field"
              placeholder="Amount"
              value={values.amount}
              onChange={(event) => setValues((current) => ({ ...current, amount: Number(event.target.value) }))}
            />
          </div>

          {status ? <p className="mt-4 text-sm text-[color:var(--color-gold-deep)]">{status}</p> : null}

          <button type="submit" className="primary-button mt-8 w-full" disabled={loading || !canSubmit}>
            {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
            Pay Now
          </button>
        </form>
      </div>
    </section>
  )
}
