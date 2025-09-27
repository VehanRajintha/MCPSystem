"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Car,
  BarChart3,
  Wrench,
  Calendar,
  Settings,
  Users,
  DollarSign,
  Menu,
  X,
  Home,
  TrendingUp,
  Shield,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Vehicles",
    href: "/vehicles",
    icon: Car,
  },
  {
    name: "Maintenance",
    href: "/maintenance",
    icon: Wrench,
  },
  {
    name: "Predictions",
    href: "/predictions",
    icon: TrendingUp,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Schedule",
    href: "/schedule",
    icon: Calendar,
  },
  {
    name: "Costs",
    href: "/costs",
    icon: DollarSign,
  },
  {
    name: "Users",
    href: "/users",
    icon: Users,
  },
  {
    name: "Admin",
    href: "/admin",
    icon: Shield,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen bg-card border-r border-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Punchi Car</h2>
              <p className="text-xs text-muted-foreground">Niwasa</p>
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-11 transition-all duration-200",
                    isActive && "bg-primary text-primary-foreground animate-glow",
                    !isActive && "hover:bg-secondary/80 hover:text-secondary-foreground",
                    isCollapsed && "px-2",
                  )}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0")} />
                  {!isCollapsed && <span className="font-medium">{item.name}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            <p>Maintenance Cost</p>
            <p>Prediction System</p>
            <p className="mt-1 text-primary">v1.0.0</p>
          </div>
        </div>
      )}
    </div>
  )
}
