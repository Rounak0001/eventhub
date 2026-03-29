import type { VendorTier } from '../types/domain'

const tierDetails: Record<VendorTier, { title: string; note: string }> = {
  STANDARD: {
    title: 'Standard',
    note: 'Cost-efficient essentials for MVP bookings.',
  },
  PREMIUM: {
    title: 'Premium',
    note: 'Higher-end styling and better guest experience.',
  },
  PLUS: {
    title: 'Plus',
    note: 'Top-tier package for the most expensive event setups.',
  },
}

interface TierSelectorProps {
  value: VendorTier
  onChange: (tier: VendorTier) => void
}

export function TierSelector({ value, onChange }: TierSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {(Object.keys(tierDetails) as VendorTier[]).map((tier) => (
        <button
          key={tier}
          type="button"
          onClick={() => onChange(tier)}
          className={`rounded-[1.5rem] border p-5 text-left transition ${
            value === tier ? 'border-[#d5ba8a] bg-white/14 shadow-[0_12px_30px_rgba(0,0,0,0.18)]' : 'border-white/10 bg-white/6'
          }`}
        >
          <p className="text-xs uppercase tracking-[0.28em] text-[#d5ba8a]">{tier}</p>
          <h3 className="mt-3 font-display text-2xl text-white">{tierDetails[tier].title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/72">{tierDetails[tier].note}</p>
        </button>
      ))}
    </div>
  )
}
