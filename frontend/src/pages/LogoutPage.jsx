"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function LogoutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Remove token and redirect to login
    localStorage.removeItem("token")
    navigate("/login")
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-pulse mx-auto mb-4"></div>
        <p className="text-gray-600">Logging you out...</p>
      </div>
    </div>
  )
}
