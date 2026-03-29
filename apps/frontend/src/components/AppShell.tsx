import { AnimatePresence, motion } from 'framer-motion'
import { CalendarPlus2, LayoutDashboard, Menu, ShieldCheck, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', icon: Sparkles },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/create', label: 'Create Event', icon: CalendarPlus2 },
  { to: '/events', label: 'Public Events', icon: Sparkles },
  { to: '/admin', label: 'Admin', icon: ShieldCheck },
]

export function AppShell() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_60%)]" />

      <header className="section-shell sticky top-0 z-40 py-4 backdrop-blur-sm">
        <div className="paper-panel floral-corner flex items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:rgba(185,146,71,0.25)] bg-white/90 text-[color:var(--color-gold-deep)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-xl tracking-[0.18em] text-[color:var(--color-gold-deep)]">EVENTHUB</p>
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-muted)]">Venue • Vendors • Registrations</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-[color:var(--color-muted)] lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'text-[color:var(--color-gold-deep)]' : 'transition hover:text-[color:var(--color-ink)]'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/auth" className="secondary-button">
              Login
            </Link>
            <Link to="/create" className="primary-button">
              Launch Event
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:rgba(185,146,71,0.25)] bg-white/85 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="paper-panel mt-3 flex flex-col gap-4 px-5 py-5 lg:hidden"
            >
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className="text-sm text-[color:var(--color-muted)]">
                  {item.label}
                </NavLink>
              ))}
              <div className="gold-divider" />
              <Link to="/auth" onClick={() => setOpen(false)} className="secondary-button">
                Login
              </Link>
              <Link to="/create" onClick={() => setOpen(false)} className="primary-button">
                Launch Event
              </Link>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <footer className="section-shell pb-10 pt-16">
        <div className="paper-panel px-6 py-8 sm:px-8">
          <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_1fr]">
            <div>
              <p className="font-display text-2xl">Modern event operations, designed with hospitality-grade UX.</p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--color-muted)]">
                This frontend is now aligned to the actual product scope: event creation, availability checks, registrations,
                demo payments, admin actions, and Brevo-triggered notifications.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">Key flows</p>
              <div className="mt-4 space-y-3 text-sm text-[color:var(--color-muted)]">
                <Link to="/create">Create event</Link>
                <Link to="/events">Register attendees</Link>
                <Link to="/admin">Manage operations</Link>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-gold-deep)]">Cities</p>
              <div className="mt-4 space-y-3 text-sm text-[color:var(--color-muted)]">
                <p>Kolkata</p>
                <p>Mumbai</p>
                <p>Bangalore</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
