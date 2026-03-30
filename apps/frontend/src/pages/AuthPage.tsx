import { useMutation } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { authService } from '../api/services/auth'
import { useSession } from '../providers/SessionProvider'

export function AuthPage() {
  const navigate = useNavigate()
  const { login } = useSession()
  const [error, setError] = useState('')
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  })

  const mutation = useMutation({
    mutationFn: async () =>
      authService.register({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    onSuccess: (data) => {
      login(data.token, data.user)
      navigate(data.user.role === 'ADMIN' ? '/admin' : '/profile')
    },
    onError: (nextError: Error) => setError(nextError.message),
  })

  return (
    <section className="section-shell py-10">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.18fr_0.82fr]">
        <div className="paper-panel floral-corner flex flex-col justify-between px-6 py-8 sm:px-8">
          <div>
            <span className="eyebrow">Welcome Suite</span>
            <h1 className="display-title">Create your EventZen account with invitation-grade styling.</h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[color:var(--color-muted)]">
              Create your account to start planning events, managing registrations, and unlocking the rest of the EventZen
              experience through the gateway-backed auth flow.
            </p>
          </div>
          <div className="mt-10 grid gap-4">
            <img src="/img2.jpg" alt="Wedding scene" className="h-72 w-full rounded-[1.8rem] object-cover" />
          </div>
        </div>

        <div className="mx-auto w-full max-w-xl lg:mx-0">
          <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[linear-gradient(145deg,rgba(255,253,247,0.96),rgba(247,240,228,0.98))] p-[1px] shadow-[0_28px_70px_rgba(125,93,46,0.14)]">
            <div className="rounded-[calc(2rem-1px)] bg-[radial-gradient(circle_at_top,rgba(212,176,109,0.16),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,244,235,0.98))] px-6 py-8 text-[color:var(--color-ink)] sm:px-8">
              <div className="flex gap-3">
                <NavLink
                  to="/signup"
                  className="rounded-full border border-[color:var(--color-gold-deep)] bg-[color:var(--color-gold-soft)] px-5 py-2 text-sm text-[color:var(--color-ink)] shadow-[0_10px_24px_rgba(198,149,123,0.18)]"
                >
                  Sign up
                </NavLink>
                <NavLink
                  to="/login"
                  className="cursor-pointer rounded-full border border-[color:var(--color-border)] bg-white px-5 py-2 text-sm text-[color:var(--color-muted)] transition hover:text-[color:var(--color-ink)]"
                >
                  Login
                </NavLink>
              </div>

              <h2 className="mt-8 font-display text-5xl text-[color:var(--color-ink)]">Create account</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--color-muted)]">
                Create your EventZen account to start planning, hosting, and managing event experiences.
              </p>

              <form
                className="mt-8 space-y-4"
                onSubmit={(event) => {
                  event.preventDefault()
                  setError('')
                  mutation.mutate()
                }}
              >
                <input
                  className="field border-[color:var(--color-border)] bg-white text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)]"
                  placeholder="Full name"
                  value={values.name}
                  onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="email"
                    className="field border-[color:var(--color-border)] bg-white text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)]"
                    placeholder="Email address"
                    value={values.email}
                    onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
                  />
                  <input
                    type="password"
                    className="field border-[color:var(--color-border)] bg-white text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)]"
                    placeholder="Password"
                    value={values.password}
                    onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
                  />
                </div>

                {error ? <p className="text-sm text-rose-500">{error}</p> : null}

                <button type="submit" className="primary-button w-full" disabled={mutation.isPending}>
                  {mutation.isPending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Create account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
