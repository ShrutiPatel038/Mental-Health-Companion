import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Home, ArrowLeft } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Heart className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h2>

        <p className="text-gray-600 mb-8 leading-relaxed">
          It looks like this page took a little detour on its wellness journey. Don't worry though - let's get you back
          to your peaceful space! 🌸
        </p>

        <div className="space-y-4">
          <Link href="/welcome">
            <Button className="w-full rounded-2xl bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 py-3">
              <Home className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="outline"
              className="w-full rounded-2xl border-2 border-purple-300 hover:bg-purple-100 py-3 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">Remember: Every step forward is progress, even the detours! 💪</p>
      </div>
    </div>
  )
}
