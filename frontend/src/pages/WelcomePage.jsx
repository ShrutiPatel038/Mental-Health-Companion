import ProtectedRoute from "@/Components/ProtectedRoute"
import SidebarLayout from "@/Components/SidebarLayout"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Flame, Target, TrendingUp, Heart } from "lucide-react"

const moodEmojis = [
  { emoji: "😄", label: "Very Happy", value: 5, color: "text-green-500" },
  { emoji: "😊", label: "Happy", value: 4, color: "text-blue-500" },
  { emoji: "😐", label: "Neutral", value: 3, color: "text-yellow-500" },
  { emoji: "😔", label: "Sad", value: 2, color: "text-orange-500" },
  { emoji: "😢", label: "Very Sad", value: 1, color: "text-red-500" },
]

const recommendedActivities = [
  "Take 5 deep breaths",
  "Write in your gratitude journal",
  "Go for a 10-minute walk",
  "Listen to calming music",
  "Practice mindfulness meditation",
]

export default function WelcomePage() {
  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="space-y-8">
          {/* Welcome Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Welcome back, John! 🌟
            </h1>
            <p className="text-xl text-gray-600">"Every day is a new beginning. Take a deep breath and start again."</p>
          </div>

          {/* Quick Access Buttons */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300 rounded-3xl hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-orange-800 mb-2">Daily Challenge</h3>
                <Button className="rounded-full bg-orange-500 hover:bg-orange-600">Start Challenge</Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300 rounded-3xl hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-pink-800 mb-2">Pick Your Mood</h3>
                <Button className="rounded-full bg-pink-500 hover:bg-pink-600">Track Mood</Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300 rounded-3xl hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-purple-800 mb-2">View Progress</h3>
                <Button className="rounded-full bg-purple-500 hover:bg-purple-600">See Analytics</Button>
              </CardContent>
            </Card>
          </div>

          {/* Streak Section */}
          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300 rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-4">
                <Flame className="w-8 h-8 text-orange-500" />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-orange-800">7 Day Streak! 🔥</h3>
                  <p className="text-orange-600">You're on fire! Keep up the amazing work!</p>
                </div>
                <Flame className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          {/* Mood Picker */}
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-gray-800">How are you feeling today?</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Select your current mood to get personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-6 mb-6">
                {moodEmojis.map((mood) => (
                  <button
                    key={mood.value}
                    className="flex flex-col items-center space-y-2 p-4 rounded-2xl hover:bg-purple-50 transition-all duration-200 hover:transform hover:scale-110"
                  >
                    <span className="text-4xl mood-emoji">{mood.emoji}</span>
                    <span className="text-sm font-medium text-gray-600">{mood.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Activities */}
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">Recommended Activities for You</CardTitle>
              <CardDescription className="text-gray-600">Based on your recent mood patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendedActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl"
                  >
                    <span className="text-gray-700">{activity}</span>
                    <Badge variant="secondary" className="rounded-full bg-purple-200 text-purple-800">
                      Try it
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
