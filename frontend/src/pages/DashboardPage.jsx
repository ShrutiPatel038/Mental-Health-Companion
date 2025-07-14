import ProtectedRoute from "@/Components/ProtectedRoute";
import SidebarLayout from "@/Components/SidebarLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { CheckCircle, Calendar, TrendingUp, Heart, Target } from "lucide-react";
import { useEffect, useState } from "react";
import useMoodStore from "@/store/useMoodStore";
import { getDailyChallenge, getMoodHistory } from "@/lib/api";
import { markChallengeComplete, getCompletedChallenges ,getDailyChallengeForHeatmap} from "@/lib/api";
import axios from "axios";
import MoodTrendMiniChart from "../components/MoodTrendMiniChart";
import { useNavigate } from "react-router";

export default function DashboardPage() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [challenge, setChallenge] = useState("");
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const todayMonth = today.slice(0, 7); // YYYY-MM

  const fetchAffirmation = async () => {
    try {
      const res = await fetch(
        `http://localhost:5555/api/affirmation?ts=${Date.now()}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setQuote(data[0].q);
      setAuthor(data[0].a);
    } catch (err) {
      setQuote("Something went wrong. Try again later.");
      setAuthor("");
    }
  };

  useEffect(() => {
    fetchChallenge();
  }, []);

  const fetchChallenge = async () => {
    try {
      const data = await getDailyChallenge(mood);
      setChallenge(data.text);
    } catch (error) {
      setChallenge("Couldn't load daily challenge.");
    }
  };

  useEffect(() => {
    fetchAffirmation();
  }, []);

  const [isCompletedToday, setIsCompletedToday] = useState(false);
  const [completedDates, setCompletedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().slice(0, 7) // 'YYYY-MM'
  );

  // Get all days of the current month
  const getDaysInMonth = (month) => {
    const [year, mon] = month.split("-").map(Number);
    const days = new Date(year, mon, 0).getDate();
    return Array.from({ length: days }, (_, i) => {
      const day = String(i + 1).padStart(2, "0");
      return `${month}-${day}`;
    });
  };


  // Fetch all completed days for current month
   const fetchCompletedDates = async (month) => {
  try {
    const res = await getCompletedChallenges(month);
    setCompletedDates(res);
  } catch (err) {
    console.error("Error fetching completed dates:", err);
  }
};


  useEffect(() => {
    fetchCompletedDates(currentMonth); //for heatmap only
  }, [currentMonth]);

  const { mood } = useMoodStore();

  const handleMarkComplete = async () => {
    
    try {
      await markChallengeComplete(today);
      setIsCompletedToday(true);
      setCompletedDates((prev) => [...new Set([...prev, today])]);
    } catch (error) {
      console.error("Failed to mark as complete:", error);
    }
  };

  const handlePrevMonth = () => {
    const [year, month] = currentMonth.split("-").map(Number);
    const newDate = new Date(year, month - 1); // JS months are 0-indexed
    setCurrentMonth(newDate.toISOString().slice(0, 7));
  };

  const handleNextMonth = () => {
    const [year, month] = currentMonth.split("-").map(Number);
    const newDate = new Date(year, month+1); // next month
    setCurrentMonth(newDate.toISOString().slice(0, 7));
  };
  useEffect(() => {
  checkTodayCompletion();
}, []); // on initial render only

const checkTodayCompletion = async () => {
  try {
    const res = await getCompletedChallenges(todayMonth);
    setIsCompletedToday(res.includes(today));
  } catch (err) {
    console.error("Error checking today's completion:", err);
  }
};

const [moodHistory, setMoodHistory] = useState([]);

useEffect(() => {
  getMoodHistory()
    .then((data) => {
      console.log("Fetched mood history:", data);
      setMoodHistory(data);
    })
    .catch(() => setMoodHistory([]));
}, []);

const navigate = useNavigate();

  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Your Mental Health Dashboard
            </h1>
            <p className="text-gray-600">
              Track your progress and celebrate your journey
            </p>
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
            {/* Daily Challenge Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-orange-500" />
                  Today's Challenge
                </CardTitle>
                <CardDescription>
                  Complete this to maintain your streak!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 bg-orange-50 p-4 rounded-2xl">
                    {challenge || "Loading your daily challenge..."}
                  </p>
                  <Button
                    onClick={handleMarkComplete}
                    disabled={isCompletedToday}
                    className={`w-full rounded-2xl ${
                      isCompletedToday
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500"
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {isCompletedToday ? "Completed" : "Mark as Complete"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Heatmap Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
              <CardHeader className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                    <Calendar className="w-6 h-6 mr-2 text-green-500" />
                    Challenge Completion
                  </CardTitle>
                  <CardDescription>Your consistency this month</CardDescription>
                </div>
                {/* Month Nav */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={handlePrevMonth}
                    className="px-2 py-1 text-xs"
                  >
                    ←
                  </Button>
                  <span className="text-sm font-semibold text-gray-700">
                    {new Date(currentMonth + "-01").toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={handleNextMonth}
                    className="px-2 py-1 text-xs"
                  >
                    →
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth(currentMonth).map((date) => {
                    const isCompleted = completedDates.includes(date);
                    return (
                      <div
                        key={date}
                        className={`w-8 h-8 rounded-lg transition-colors ${
                          isCompleted
                            ? "bg-green-400 hover:bg-green-500"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        title={date}
                      />
                    );
                  })}
                </div>

                {/* Heatmap Legend */}
                
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
                <CardDescription>
                  Your emotional journey over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                {moodHistory.length > 0 ? (
                  <MoodTrendMiniChart data={moodHistory} />
                ) : (
                  <div className="text-gray-400 text-center">No mood data yet</div>
                )}
                <button
                  className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg"
                  onClick={() => navigate("/mood-insights")}
                >
                  View Details
                </button>
              </CardContent>
            </Card>

            {/* Activity Engagement */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Activity Engagement
                </CardTitle>
                <CardDescription>
                  Your most used self-help modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Breathing Exercises",
                      usage: 85,
                      color: "bg-blue-400",
                    },
                    {
                      name: "Gratitude Journal",
                      usage: 72,
                      color: "bg-green-400",
                    },
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
  );
}
