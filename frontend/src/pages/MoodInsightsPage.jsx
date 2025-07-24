import { useEffect, useState } from "react"
import { getMoodHistory } from "@/lib/api"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js"
import "chartjs-adapter-date-fns"
import ProtectedRoute from "@/components/ProtectedRoute"
import SidebarLayout from "@/components/SidebarLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, BarChart3, Calendar } from 'lucide-react'
import { useNavigate } from "react-router-dom"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const moodLabels = ["Struggling", "Low", "Okay", "Good", "Amazing"]
const moodColors = [
  "#f87171", // Struggling
  "#a78bfa", // Low
  "#60a5fa", // Okay
  "#34d399", // Good
  "#fbbf24", // Amazing
]

export default function MoodInsightsPage() {
  const [moodHistory, setMoodHistory] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const now = new Date()
    const currentMonth = now.getMonth() + 1 // Month is 0-based
    const currentYear = now.getFullYear()

    getMoodHistory(currentMonth, currentYear)
      .then(setMoodHistory)
      .catch(() => setMoodHistory([]))
  }, [])

  const labels = moodHistory.map((d) =>
    new Date(d.date).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  )

  const data = {
    labels,
    datasets: [
      {
        label: "Mood",
        data: moodHistory.map((d) => d.value),
        backgroundColor: moodHistory.map((d) => moodColors[d.value - 1] || "#a3a3a3"),
        borderRadius: 8,
        maxBarThickness: 32,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${moodLabels[ctx.raw - 1] || "Unknown"} (${ctx.raw}/5)`
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: "Date" },
        grid: { display: false },
      },
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (v) => moodLabels[v - 1] || v,
        },
        title: { display: true, text: "Mood" },
        grid: { color: "#f3f4f6" },
      },
    },
    animation: true,
  }

  const avgMood = moodHistory.length > 0 
    ? (moodHistory.reduce((sum, entry) => sum + entry.value, 0) / moodHistory.length).toFixed(1)
    : 0

  const moodCounts = moodLabels.map((_, index) => 
    moodHistory.filter(entry => entry.value === index + 1).length
  )

  const mostFrequentMood = moodCounts.indexOf(Math.max(...moodCounts))

  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Mood Insights 📊
              </h1>
              <p className="text-gray-600">Understand your emotional patterns and trends</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="rounded-full hover:bg-purple-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-300 rounded-3xl">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800 mb-1">{avgMood}/5</h3>
                <p className="text-blue-600 text-sm">Average Mood</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 rounded-3xl">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-1">{moodHistory.length}</h3>
                <p className="text-green-600 text-sm">Total Entries</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300 rounded-3xl">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-purple-800 mb-1">
                  {moodHistory.length > 0 ? moodLabels[mostFrequentMood] : "No data"}
                </h3>
                <p className="text-purple-600 text-sm">Most Common</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Chart */}
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-purple-500" />
                Mood History Timeline
              </CardTitle>
              <CardDescription>
                Track your emotional journey over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {moodHistory.length > 0 ? (
                <div className="h-96 w-full">
                  <Bar data={data} options={options} />
                </div>
              ) : (
                <div className="h-96 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-500 text-lg">No mood data yet</p>
                    <p className="text-gray-400 text-sm mt-2">Start tracking your mood to see insights here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mood Distribution */}
          {moodHistory.length > 0 && (
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">Mood Distribution</CardTitle>
                <CardDescription>How often you experience each mood level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moodLabels.map((label, index) => {
                    const count = moodCounts[index]
                    const percentage = moodHistory.length > 0 ? (count / moodHistory.length * 100).toFixed(1) : 0
                    return (
                      <div key={label} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: moodColors[index] }}
                            />
                            <span className="text-gray-700 font-medium">{label}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500 text-sm">{count} times</span>
                            <Badge variant="outline" className="rounded-full">
                              {percentage}%
                            </Badge>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: moodColors[index]
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tips Card */}
          <Card className="bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-300 rounded-3xl">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-orange-800 mb-2">💡 Understanding Your Patterns</h3>
              <p className="text-orange-700">
                Regular mood tracking helps identify triggers and patterns. Use these insights to make positive changes in your daily routine!
              </p>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
