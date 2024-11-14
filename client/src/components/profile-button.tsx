import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { PersonIcon, ExitIcon } from '@radix-ui/react-icons'
import Spinner from '@/components/spinner'

export default function ProfileButton() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (loading) return <Spinner />
  if (!user) return <AuthenticateButtons />
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[50px]">
        <DropdownMenuLabel className="truncate">{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/profile">
          <DropdownMenuItem>
            <PersonIcon className="w-5 h-5" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleLogout}>
          <ExitIcon className="w-5 h-5" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AuthenticateButtons() {
  return (
    <>
      <Link
        to="/signup">
        <Button className="text-white bg-black transition-color duration-200 hover:text-blue-500 hover:bg-neutral-800 text-sm font-medium">
        Sign up
        </Button> 
      </Link>
      <Link to="/signin">
        <Button className="bg-blue-500 hover:bg-blue-400 transition-color duration-200">
          Sign in
        </Button>
      </Link>
    </>
  )
}
