import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react'
import { getStoredToken, setStoredToken } from '../api/client'
import type { UserProfile } from '../types/domain'

interface SessionContextValue {
  token: string | null
  user: UserProfile | null
  login: (token: string, user: UserProfile) => void
  logout: () => void
  setUser: (user: UserProfile | null) => void
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined)

export function SessionProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() => getStoredToken())
  const [user, setUser] = useState<UserProfile | null>(null)

  const value = useMemo(
    () => ({
      token,
      user,
      login: (nextToken: string, nextUser: UserProfile) => {
        setStoredToken(nextToken)
        setToken(nextToken)
        setUser(nextUser)
      },
      logout: () => {
        setStoredToken(null)
        setToken(null)
        setUser(null)
      },
      setUser,
    }),
    [token, user],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error('useSession must be used within SessionProvider')
  }

  return context
}
