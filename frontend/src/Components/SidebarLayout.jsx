"use client"

import { useEffect, useState } from "react"
import { useNavigate, useLocation, Link } from "react-router"
import { Home, BarChart3, Heart, Smile, Settings, LogOut, Menu, X, Sun, Moon, User,Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getProfile, logout } from "@/lib/api"

const navigation = [
  { name: "Welcome", href: "/welcome", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Self-Help", href: "/self-help", icon: Heart },
  { name: "SOS Support", href: "/sos", icon: Shield },
  // { name: "Mood Tracker", href: "/mood-tracker", icon: Smile },
  // { name: "Settings", href: "/settings", icon: Settings },
]

export default function SidebarLayout({ children }) {
  const [username, setUsername] = useState("")
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const data = await getProfile()
          console.log("Fetched profile:", data)
          setUsername(data.username || data.name || "User") // Adjust based on your backend field
        } catch (err) {
          console.error("Failed to fetch profile:", err)
        }
      }
  
      fetchProfile()
    }, [])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
  console.log("🔁 Attempting logout...") // <-- debug log

  try {
    const res = await logout()
    console.log("✅ Logout response:", res) // <-- debug log
    localStorage.removeItem("token")
    navigate("/login")
  } catch (err) {
    console.error("❌ Logout failed:", err)
    navigate("/login")
  }
}

    const getInitials = (name) => {
    if (!name) return "U"
    const words = name.trim().split(" ")
    if (words.length === 1) {
      return words[0][0].toUpperCase()
    }
    return (words[0][0] + words[1][0]).toUpperCase()
  }


  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-md border-r border-purple-200 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        rounded-r-3xl shadow-xl
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-purple-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                MindfulMe
              </span>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden rounded-full" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg transform scale-105"
                        : "text-gray-700 hover:bg-purple-100 hover:scale-105"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-purple-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10 ring-2 ring-orange-300">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-gradient-to-r from-orange-400 to-pink-400 text-white">
                    {getInitials(username)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900">{username}</p>
                  <p className="text-xs text-gray-500">Feeling great! 😊</p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <User className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-2xl">
                  {/* <DropdownMenuItem className="rounded-xl">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem> */}
                  <DropdownMenuItem className="rounded-xl text-red-600" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top navbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="lg:hidden rounded-full" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
