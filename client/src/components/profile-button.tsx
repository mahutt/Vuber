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
import { PersonIcon, ExitIcon } from '@radix-ui/react-icons'

export default function ProfileButton() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    navigate('/')
  }
  if (!user) return null
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
