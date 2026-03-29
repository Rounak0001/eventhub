import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { userService } from '../api/services/user'
import { useSession } from '../providers/SessionProvider'

export function ProfilePage() {
  const { token, user, setUser } = useSession()
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: userService.profile,
    enabled: Boolean(token),
  })

  useEffect(() => {
    if (profileQuery.data) {
      setUser(profileQuery.data)
    }
  }, [profileQuery.data, setUser])

  const profile = profileQuery.data ?? user

  if (!token) {
    return (
      <section className="section-shell py-10">
        <div className="paper-panel px-6 py-8">
          <h1 className="section-title">Profile setup begins after sign in.</h1>
          <p className="mt-3 text-sm text-[color:var(--color-muted)]">Use the auth page to store your JWT and unlock profile data from `/api/users/profile`.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section-shell py-10">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="paper-panel floral-corner px-6 py-8">
          <p className="eyebrow">Host Profile</p>
          <h1 className="section-title">{profile?.fullName ?? 'Event organizer'}</h1>
          <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
            This screen is prepared for profile setup, organizer preferences, and city-based defaults that we will wire during backend integration.
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
              <p className="mt-3 text-lg">{profile?.city ?? 'Kolkata'}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">Role</p>
              <p className="mt-3 text-lg">{profile?.role ?? 'USER'}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">Phone</p>
              <p className="mt-3 text-lg">{profile?.phone ?? '+91 9XXXXXXXXX'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
