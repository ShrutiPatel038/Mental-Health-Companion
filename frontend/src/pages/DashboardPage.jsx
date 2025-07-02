import ProtectedRoute from "@/Components/ProtectedRoute"
import SidebarLayout from "@/Components/SidebarLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { Badge } from "@/Components/ui/badge"
import { CheckCircle, Calendar, TrendingUp, Heart, Target } from "lucide-react"
import { useEffect, useState } from "react"


export default function DashboardPage() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');


const fetchAffirmation = async () => {
  try {
    const res = await fetch(`http://localhost:5555/api/affirmation?ts=${Date.now()}`, {
      credentials: 'include'
    });
    const data = await res.json();
    setQuote(data[0].q);
    setAuthor(data[0].a);
  } catch (err) {
    setQuote('Something went wrong. Try again later.');
    setAuthor('');
  }
};



useEffect(() => {
  fetchAffirmation()
}, [])

const { mood } = useMoodStore();

useEffect(() => {
  fetchDailyChallenge();
}, []);

const fetchDailyChallenge = async () => {
  try {
    const prompt = mood
      ? `Give a short daily self-care challenge for someone feeling mood level ${mood}/5`
      : "Give a short random mental health challenge";

    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setChallenge(data.text); // assuming `text` is returned
  } catch (err) {
    setChallenge("Couldn't load challenge. Try again.");
  }
};

  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Your Mental Health Dashboard
            </h1>
            <p className="text-gray-600">Track your progress and celebrate your journey</p>
          </div>

          {/* Affirmation Section */}
          {/* <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-800 flex items-center">
                <Heart className="w-6 h-6 mr-2" />
                Today's Affirmation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-lg italic text-blue-700 mb-4">
                "I am worthy of love, happiness, and all the good things life has to offer. Today I choose to be kind to
                myself and embrace my journey."
              </blockquote>
              <Button className="rounded-full bg-blue-500 hover:bg-blue-600">Get New Affirmation</Button>
            </CardContent>
          </Card> */}
          <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300 rounded-3xl">
            <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-800 flex items-center">
              <Heart className="w-6 h-6 mr-2" />
                Today's Affirmation
            </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-lg italic text-blue-700 mb-4">
              “{quote}”
              <br />
              <span className="block text-sm font-semibold text-right mt-2 text-blue-600">
                — {author}
              </span>
              </blockquote>
            <Button 
              onClick={fetchAffirmation}
              className="rounded-full bg-blue-500 hover:bg-blue-600"
          >
              Get New Affirmation
            </Button>
            </CardContent>
          </Card>


          {/* Daily Challenge Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-orange-500" />
                  Today's Challenge
                </CardTitle>
                <CardDescription>Complete this to maintain your streak!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 bg-orange-50 p-4 rounded-2xl">
                    Practice gratitude by writing down 3 things you're thankful for today.
                  </p>
                  <Button className="w-full rounded-2xl bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Challenge Heatmap */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-green-500" />
                  Challenge Completion
                </CardTitle>
                <CardDescription>Your consistency over the past month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 28 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-lg ${
                        Math.random() > 0.3 ? "bg-green-200 hover:bg-green-300" : "bg-gray-100 hover:bg-gray-200"
                      } transition-colors cursor-pointer`}
                      title={`Day ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <span>Less</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-gray-100 rounded"></div>
                    <div className="w-3 h-3 bg-green-100 rounded"></div>
                    <div className="w-3 h-3 bg-green-200 rounded"></div>
                    <div className="w-3 h-3 bg-green-300 rounded"></div>
                    <div className="w-3 h-3 bg-green-400 rounded"></div>
                  </div>
                  <span>More</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Mood Over Time */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-blue-500" />
                  Mood Trends
                </CardTitle>
                <CardDescription>Your emotional journey over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
                  <p className="text-gray-500">Mood chart visualization would go here</p>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <Badge variant="outline" className="rounded-full">
                    Avg: 4.2/5
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-green-600">
                    ↗ Improving
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Activity Engagement */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">Activity Engagement</CardTitle>
                <CardDescription>Your most used self-help modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Breathing Exercises", usage: 85, color: "bg-blue-400" },
                    { name: "Gratitude Journal", usage: 72, color: "bg-green-400" },
                    { name: "Mindfulness", usage: 68, color: "bg-purple-400" },
                    { name: "Mood Tracking", usage: 91, color: "bg-pink-400" },
                  ].map((activity) => (
                    <div key={activity.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">{activity.name}</span>
                        <span className="text-gray-500">{activity.usage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${activity.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${activity.usage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
