import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react'
import api from '@/services/api'

interface User {
  id: number
  name: string
}

interface AuthContextType {
  user: User | null
  login: (name: string, password: string) => Promise<void>
  register: (name: string, password: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { data } = await api.get<{ user: User }>('/users/current')
        setUser(data.user)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkLoggedIn()
  }, [])

  const login = async (name: string, password: string) => {
    const { data } = await api.post<{ user: User }>('/login', {
      name,
      password,
    })
    setUser(data.user)
  }

  const register = async (name: string, password: string) => {
    const { data } = await api.post<{ user: User }>('/register', {
      name,
      password,
    })
    setUser(data.user)
  }

  const logout = async () => {
    await api.post('/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
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
