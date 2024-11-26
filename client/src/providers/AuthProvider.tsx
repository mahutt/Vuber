import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react'
import api from '@/services/api'

import { User } from '@/types/types'

interface AuthContextType {
  user: User | null
  signin: (name: string, password: string) => Promise<boolean>
  signup: (name: string, password: string, role: string) => Promise<boolean>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        setLoading(false)
        return
      }
      const { data } = await api.get<User | null>('/users/current')
      setUser(data)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkLoggedIn()
  }, [])

  const signin = async (name: string, password: string): Promise<boolean> => {
    return api
      .post<{ accessToken: string; user: User } | null>('users/signin', {
        name,
        password,
      })
      .then((response) => {
        if (response.status === 200 && response.data) {
          localStorage.setItem('accessToken', response.data.accessToken)
          localStorage.removeItem('chatbot-messages')
          setUser(response.data.user)
          return true
        } else {
          return false
        }
      })
      .catch(() => false)
  }

  const signup = async (
    name: string,
    password: string,
    role: string
  ): Promise<boolean> => {
    return api
      .post('users/signup', {
        name,
        password,
        role,
      })
      .then((response) => {
        if (response.status === 201) {
          return true
        } else {
          return false
        }
      })
      .catch(() => false)
  }

  const logout = async () => {
    api
      .post('users/logout')
      .then(() => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('chatbot-messages')
        setUser(null)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const refreshUser = async () => {
    checkLoggedIn()
  }

  return (
    <AuthContext.Provider
      value={{ user, signin, logout, signup, refreshUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
