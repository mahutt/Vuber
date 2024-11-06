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
  signin: (name: string, password: string) => Promise<boolean>
  signup: (name: string, password: string) => Promise<boolean>
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
        const { data } = await api.get<User | null>('/users/current')
        setUser(data)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
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
          setUser(response.data.user)
          return true
        } else {
          return false
        }
      })
      .catch(() => false)
  }

  const signup = async (name: string, password: string): Promise<boolean> => {
    return api
      .post('users/signup', {
        name,
        password,
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
    await api.post('/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signin, logout, signup, loading }}>
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
