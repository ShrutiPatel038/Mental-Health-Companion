import ProtectedRoute from "@/Components/ProtectedRoute";
import SidebarLayout from "@/Components/SidebarLayout";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import { Flame, Target, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { getProfile, getStreak, submitMood } from "@/lib/api";
import { useNavigate } from "react-router";
import useMoodStore from "@/store/useMoodStore";

export default function WelcomePage() {
  const [username, setUsername] = useState("");
  const [streak, setStreak] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodSubmitStatus, setMoodSubmitStatus] = useState("");

  const { setMood } = useMoodStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUsername(data.username || data.name || "User");
        const userStreak = await getStreak();
        setStreak(userStreak);
      } catch (err) {
        console.error("Failed to fetch profile or streak:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleStartChallenge = () => {
    navigate("/dashboard");
  };

  const handleSubmitMood = async () => {
    if (!selectedMood) return;
    try {
      await submitMood(selectedMood);
      setMood(selectedMood);
      setMoodSubmitStatus("Mood submitted!");
      setSelectedMood(null);
      setTimeout(() => setMoodSubmitStatus(""), 2000);
    } catch (err) {
      setMoodSubmitStatus("Failed to submit mood");
      setTimeout(() => setMoodSubmitStatus(""), 2000);
    }
  };

  const moods = [
    { emoji: "😄", label: "Amazing", value: 5, color: "from-yellow-400 to-orange-400" },
    { emoji: "😊", label: "Good", value: 4, color: "from-green-400 to-blue-400" },
    { emoji: "😐", label: "Okay", value: 3, color: "from-blue-400 to-purple-400" },
    { emoji: "😔", label: "Low", value: 2, color: "from-purple-400 to-pink-400" },
    { emoji: "😢", label: "Struggling", value: 1, color: "from-pink-400 to-red-400" },
  ];

  const getRecommendedActivities = (mood) => {
    const activities = {
      5: ["Celebrate your wins!", "Share positivity with others", "Plan something fun"],
      4: ["Practice gratitude", "Connect with loved ones", "Try a new hobby"],
      3: ["Take a peaceful walk", "Listen to calming music", "Practice deep breathing"],
      2: ["Gentle self-care routine", "Reach out to a friend", "Try meditation"],
      1: ["Practice self-compassion", "Seek support", "Focus on basic needs"],
    };
    return activities[mood] || ["Take things one step at a time"];
  };

  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="space-y-8">
          {/* Welcome Header */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Welcome back, {username}! 🌟
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              "Every day is a new beginning. Take a deep breath and start again."
            </p>
          </div>

          {/* Quick Access Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300 rounded-3xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-orange-800 mb-2">
                  Daily Challenge
                </h3>
                <Button
                  onClick={handleStartChallenge}
                  className="rounded-full bg-orange-500 hover:bg-orange-600 px-4 sm:px-6 py-2 text-sm sm:text-base"
                >
                  Start Challenge
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300 rounded-3xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-purple-800 mb-2">
                  View Progress
                </h3>
                <Button
                  onClick={handleStartChallenge}
                  className="rounded-full bg-purple-500 hover:bg-purple-600 px-4 sm:px-6 py-2 text-sm sm:text-base"
                >
                  See Analytics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Streak Section */}
          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300 rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-4">
                <Flame className="w-8 h-8 text-orange-500" />
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Current Streak:{" "}
                    {streak === null
                      ? "Loading..."
                      : streak === 0
                      ? "Start your streak today!"
                      : `${streak} ${streak > 0 ? "🔥" : ""}`}
                  </h2>
                </div>
                <Flame className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          {/* Mood Picker */}
          <Card className="card-happy p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              How are you feeling today?
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    selectedMood === mood.value
                      ? `bg-gradient-to-r ${mood.color} shadow-lg scale-110`
                      : "hover:bg-white/50"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{mood.emoji}</div>
                    <div
                      className={`text-sm font-medium ${
                        selectedMood === mood.value
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    >
                      {mood.label}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedMood && (
              <div className="text-center animate-fade-in">
                <Button
                  className="mt-2 px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
                  onClick={handleSubmitMood}
                >
                  Submit Mood
                </Button>
                {moodSubmitStatus && (
                  <div className="mt-2 text-green-600 font-semibold">
                    {moodSubmitStatus}
                  </div>
                )}
                <h3 className="text-lg font-semibold mt-6 mb-4 text-gray-800">
                  Recommended Activities:
                </h3>
                {/* Get the color for the selected mood */}
                {(() => {
                  const selectedMoodObj = moods.find((m) => m.value === selectedMood);
                  const selectedMoodColor = selectedMoodObj ? selectedMoodObj.color : "from-blue-100 to-blue-300";
                  return (
                    <div className="grid md:grid-cols-3 gap-4">
                      {getRecommendedActivities(selectedMood).map((activity, index) => (
                        <div
                          key={index}
                          className="relative rounded-2xl overflow-hidden border border-gray-200 shadow p-4"
                        >
                          {/* Gradient background with opacity */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${selectedMoodColor}`}
                            style={{ opacity: 0.4 }}
                          />
                          {/* Text stays fully opaque */}
                          <div className="relative z-10">
                            <p className="text-gray-800 font-medium">{activity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  );
}
