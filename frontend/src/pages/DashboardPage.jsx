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
import { CheckCircle, Calendar, TrendingUp, Heart, Target } from "lucide-react";
import { useEffect, useState } from "react";
import useMoodStore from "@/store/useMoodStore";
import {
  getDailyChallenge,
  getCompletedChallenges,
  markChallengeComplete,
  getMoodHistory,
} from "@/lib/api";
import MoodTrendMiniChart from "../components/MoodTrendMiniChart";
import { useNavigate } from "react-router";

export default function DashboardPage() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [challenge, setChallenge] = useState("");
  const [isCompletedToday, setIsCompletedToday] = useState(false);
  const [completedDates, setCompletedDates] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const today = new Date().toISOString().slice(0, 10);
  const { mood } = useMoodStore();
  const navigate = useNavigate();

  const fetchAffirmation = async () => {
    try {
      const res = await fetch(
        `http://localhost:5555/api/affirmation?ts=${Date.now()}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setQuote(data[0].q);
      setAuthor(data[0].a);
    } catch (err) {
      setQuote("Something went wrong. Try again later.");
      setAuthor("");
    }
  };

  const fetchChallenge = async () => {
    try {
      const data = await getDailyChallenge(mood);
      setChallenge(data.text);
    } catch {
      setChallenge("Couldn't load daily challenge.");
    }
  };

  const fetchCompletedDates = async (month) => {
    try {
      const res = await getCompletedChallenges(month);
      setCompletedDates(res);
      setIsCompletedToday(res.includes(today));
    } catch (err) {
      console.error("Error fetching completed dates:", err);
    }
  };

  const fetchMoodHistory = async () => {
    try {
      const data = await getMoodHistory();
      setMoodHistory(data);
    } catch {
      setMoodHistory([]);
    }
  };

  const handleMarkComplete = async () => {
    try {
      await markChallengeComplete(today);
      setIsCompletedToday(true);
      setCompletedDates((prev) => [...new Set([...prev, today])]);
    } catch (err) {
      console.error("Failed to mark as complete:", err);
    }
  };

  const handlePrevMonth = () => {
    const [year, month] = currentMonth.split("-").map(Number);
    const newDate = new Date(year, month - 2);
    setCurrentMonth(newDate.toISOString().slice(0, 7));
  };

  const handleNextMonth = () => {
    const [year, month] = currentMonth.split("-").map(Number);
    const newDate = new Date(year, month);
    setCurrentMonth(newDate.toISOString().slice(0, 7));
  };

  const getDaysInMonth = (month) => {
    const [year, mon] = month.split("-").map(Number);
    const days = new Date(year, mon, 0).getDate();
    return Array.from({ length: days }, (_, i) => {
      const day = String(i + 1).padStart(2, "0");
      return `${month}-${day}`;
    });
  };

  useEffect(() => {
    fetchAffirmation();
    fetchChallenge();
    fetchMoodHistory();
  }, []);

  useEffect(() => {
    fetchCompletedDates(currentMonth);
  }, [currentMonth]);

  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="container mx-auto max-w-screen-lg px-4 md:px-6 py-6 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Your Mental Health Dashboard
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Track your progress and celebrate your journey
            </p>
          </div>

          {/* Affirmation */}
          <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-bold text-blue-800 flex items-center">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                Today's Affirmation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-base sm:text-lg italic text-blue-700 mb-4">
                “{quote}”
                <br />
                <span className="block text-sm sm:text-base font-semibold text-right mt-2 text-blue-600">
                  — {author}
                </span>
              </blockquote>
              <Button
                onClick={fetchAffirmation}
                className="rounded-full bg-blue-500 hover:bg-blue-600 w-full sm:w-auto text-sm sm:text-base"
              >
                Get New Affirmation
              </Button>
            </CardContent>
          </Card>

          {/* Daily Challenge */}
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-500" />
                Today's Challenge
              </CardTitle>
              <CardDescription>
                Complete this to maintain your streak!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-gray-700 bg-orange-50 p-3 sm:p-4 rounded-2xl">
                  {challenge || "Loading your daily challenge..."}
                </p>
                <Button
                  onClick={handleMarkComplete}
                  disabled={isCompletedToday}
                  className={`w-full rounded-2xl text-sm sm:text-base ${
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

          {/* Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Heatmap */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
              <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-500" />
                    Challenge Completion
                  </CardTitle>
                  <CardDescription>Your consistency this month</CardDescription>
                </div>
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <Button variant="ghost" onClick={handlePrevMonth} className="px-2 py-1 text-xs">
                    ←
                  </Button>
                  <span className="text-sm font-semibold text-gray-700">
                    {new Date(currentMonth + "-01").toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <Button variant="ghost" onClick={handleNextMonth} className="px-2 py-1 text-xs">
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
                        className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg transition-colors ${
                          isCompleted
                            ? "bg-green-400 hover:bg-green-500"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        title={date}
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Mood Trends */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-500" />
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
                  className="mt-4 px-4 py-2 w-full sm:w-auto bg-indigo-500 text-white rounded-lg text-sm sm:text-base"
                  onClick={() => navigate("/mood-insights")}
                >
                  View Details
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  );
}
