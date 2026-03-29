import { CalendarDays, Heart, MapPin } from 'lucide-react'
import type { EventSummary } from '../types/domain'
import { formatDate } from '../utils/format'

export function InvitationCard({ event }: { event: EventSummary }) {
  return (
    <article className="paper-panel overflow-hidden bg-[#14314d] text-white">
      <div className="grid min-h-[460px] md:grid-cols-[1.1fr_0.9fr]">
        <div className="relative flex flex-col justify-between overflow-hidden px-8 py-10">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(255,212,224,0.55),transparent_70%)]" />
          <p className="text-xs uppercase tracking-[0.42em] text-[#eed4d9]">Event invite</p>
          <div className="relative z-10 mt-10">
            <p className="text-base text-[#dfe5ec]">Hosted on EventHub</p>
            <h2 className="mt-10 font-display text-5xl leading-tight text-[#fff8f5] sm:text-6xl">{event.title}</h2>
            <p className="mt-8 max-w-md text-base leading-8 text-[#dfe5ec]">
              Join this {event.eventType.toLowerCase()} experience with managed registrations, seat limits, and a polished guest journey.
            </p>
          </div>
          <div className="mt-10 flex items-center gap-3 text-[#eed4d9]">
            <Heart className="h-5 w-5" />
            <p className="font-display text-2xl">See you there</p>
          </div>
        </div>

        <div className="relative flex flex-col justify-center gap-10 rounded-t-[4rem] bg-[#20486e] px-8 py-10 md:rounded-l-[4rem] md:rounded-tr-none">
          <div className="absolute right-6 top-0 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,200,214,0.45),transparent_68%)] blur-md" />
          <div className="space-y-4">
            <CalendarDays className="h-6 w-6 text-[#f6d5d9]" />
            <p className="text-sm uppercase tracking-[0.28em] text-[#c4d4e1]">Date</p>
            <p className="text-2xl text-white">{formatDate(event.date)}</p>
          </div>
          <div className="space-y-4">
            <MapPin className="h-6 w-6 text-[#f6d5d9]" />
            <p className="text-sm uppercase tracking-[0.28em] text-[#c4d4e1]">Venue</p>
            <p className="text-2xl text-white">{event.venueName ?? event.city}</p>
            <p className="text-base leading-7 text-[#dfe5ec]">{event.city}, India</p>
          </div>
        </div>
      </div>
    </article>
  )
}
