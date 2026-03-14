'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  X,
  LayoutDashboard,
} from 'lucide-react'
import { useState } from 'react'

interface SidebarNavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: SidebarNavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: 'Clientes',
    href: '/dashboard/customers',
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: 'Vendas',
    href: '/dashboard/sales',
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    title: 'Configurações',
    href: '/dashboard/settings',
    icon: <Settings className="h-4 w-4" />,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { logout, isLoading } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-40 lg:hidden p-2 rounded-md hover:bg-accent"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen w-64 border-r border-border bg-card transition-transform duration-300 z-30 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="flex items-center gap-2 p-6 border-b border-border">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            SC
          </div>
          <span className="font-semibold">SmartCliente</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={handleLogout}
            disabled={isLoading}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {isLoading ? 'Saindo...' : 'Sair'}
          </Button>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}
