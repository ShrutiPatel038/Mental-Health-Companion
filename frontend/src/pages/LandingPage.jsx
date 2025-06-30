import { Link } from "react-router"
import { Button } from "@/Components/ui/button"
import { Heart, Smile, BarChart3 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              MindfulMe
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="rounded-full">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="rounded-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Your Journey to Better Mental Health Starts Here
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Welcome to MindfulMe - a safe, positive space designed to support your mental wellbeing with personalized
            tools, daily challenges, and a community that cares.
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-12">
          <Link to="/signup">
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 px-8 py-3 text-lg"
            >
              Start Your Journey
            </Button>
          </Link>
          <Link to="/about-us">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-3 text-lg border-2 border-purple-300 hover:bg-purple-100 bg-transparent"
            >
              Learn More
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-200 hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Smile className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Mood Tracking</h3>
            <p className="text-gray-600">
              Track your daily emotions and discover patterns in your mental health journey.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-200 hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Self-Help Modules</h3>
            <p className="text-gray-600">Access guided exercises, breathing techniques, and mindfulness practices.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-200 hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Progress Analytics</h3>
            <p className="text-gray-600">Visualize your growth and celebrate your mental health milestones.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
