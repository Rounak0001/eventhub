import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { userService } from '../api/services/user'
import { useSession } from '../providers/SessionProvider'

export function ProfilePage() {
  const { token, user, setUser } = useSession()
  const profileQuery = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => userService.getProfile(String(user?.id)),
    enabled: Boolean(token && user?.id),
  })

  useEffect(() => {
    if (profileQuery.data) {
      setUser(profileQuery.data)
    }
  }, [profileQuery.data, setUser])

  const profile = profileQuery.data ?? user

  if (!token || !user) {
    return (
      <section className="section-shell py-10">
        <div className="paper-panel px-6 py-8">
          <h1 className="section-title">Sign in to view and manage your profile.</h1>
          <p className="mt-3 text-sm text-[color:var(--color-muted)]">
            Your profile helps keep your bookings, preferences, and event details all in one place.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="section-shell py-10">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="paper-panel floral-corner px-6 py-8">
          <p className="eyebrow">Host Profile</p>
          <h1 className="section-title">{profile?.name ?? 'Event organizer'}</h1>
          <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
            Keep your personal details up to date so every event feels smooth, personal, and professionally managed.
          </p>
        </div>

        <div className="paper-panel px-6 py-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">Email</p>
              <p className="mt-3 text-lg">{profile?.email ?? 'Unavailable'}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">City</p>
              <p className="mt-3 text-lg">{profile?.city ?? 'Not set'}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">Role</p>
              <p className="mt-3 text-lg">{profile?.role ?? 'CUSTOMER'}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">Phone</p>
              <p className="mt-3 text-lg">{profile?.phone ?? 'Not set'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
