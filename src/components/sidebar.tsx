import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNavigate, useLocation } from "react-router-dom"
import { 
  LayoutDashboard, 
  Settings, 
  UserCircle, 
  BarChart,
  Facebook,
  Hash,
  MessageCircle,
  Mail
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      label: "Analytics",
      icon: BarChart,
      href: "/analytics",
    },
    {
      label: "Facebook Marketing",
      icon: Facebook,
      href: "/facebook-marketing",
    },
    {
      label: "TikTok Marketing",
      icon: Hash,
      href: "/tiktok-marketing",
    },
    {
      label: "Telegram Marketing",
      icon: MessageCircle,
      href: "/telegram-marketing",
    },
    {
      label: "Google Marketing",
      icon: Mail,
      href: "/google-marketing",
    },
    {
      label: "Profile",
      icon: UserCircle,
      href: "/profile",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Overview
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={location.pathname === route.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => navigate(route.href)}
              >
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
