import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
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

const USER_STORAGE_KEY = 'EventZen_user'

function getStoredUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as UserProfile) : null
  } catch {
    return null
  }
}

function setStoredUser(user: UserProfile | null) {
  if (!user) {
    localStorage.removeItem(USER_STORAGE_KEY)
    return
  }

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() => getStoredToken())
  const [user, setUserState] = useState<UserProfile | null>(() => getStoredUser())

  const setUser = (nextUser: UserProfile | null) => {
    setUserState(nextUser)
    setStoredUser(nextUser)
  }

  useEffect(() => {
    if (!token) {
      setUser(null)
    }
  }, [token])

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