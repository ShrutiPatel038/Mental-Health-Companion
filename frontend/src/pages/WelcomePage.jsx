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

import { Flame, Target, TrendingUp, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { getProfile, getStreak } from "@/lib/api";
import { useNavigate } from "react-router";
import useMoodStore from "@/store/useMoodStore";

export default function WelcomePage() {


  const [username, setUsername] = useState("");
  const [streak, setStreak] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        console.log("Fetched profile:", data);
        setUsername(data.username || data.name || "User"); // Adjust based on your backend field
        const userStreak = await getStreak();
        setStreak(userStreak);
      } catch (err) {
        console.error("Failed to fetch profile or streak:", err);
      }
    };

    fetchProfile();
  }, []);

  


  const [selectedMood, setSelectedMood] = useState(null);

  const { setMood } = useMoodStore();

  const navigate = useNavigate();

  const handleStartChallenge = () => {
    navigate("/dashboard");
  };

  const moods = [
    {
      emoji: "😄",
      label: "Amazing",
      value: 5,
      color: "from-yellow-400 to-orange-400",
    },
    {
      emoji: "😊",
      label: "Good",
      value: 4,
      color: "from-green-400 to-blue-400",
    },
    {
      emoji: "😐",
      label: "Okay",
      value: 3,
      color: "from-blue-400 to-purple-400",
    },
    {
      emoji: "😔",
      label: "Low",
      value: 2,
      color: "from-purple-400 to-pink-400",
    },
    {
      emoji: "😢",
      label: "Struggling",
      value: 1,
      color: "from-pink-400 to-red-400",
    },
  ];

  const getRecommendedActivities = (mood) => {
    const activities = {
      5: [
        "Celebrate your wins!",
        "Share positivity with others",
        "Plan something fun",
      ],
      4: ["Practice gratitude", "Connect with loved ones", "Try a new hobby"],
      3: [
        "Take a peaceful walk",
        "Listen to calming music",
        "Practice deep breathing",
      ],
      2: [
        "Gentle self-care routine",
        "Reach out to a friend",
        "Try meditation",
      ],
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
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Welcome back, {username}! 🌟
            </h1>
            <p className="text-xl text-gray-600">
              "Every day is a new beginning. Take a deep breath and start
              again."
            </p>
          </div>

          {/* Quick Access Buttons */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300 rounded-3xl hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-orange-800 mb-2">
                  Daily Challenge
                </h3>
                <Button
                  onClick={handleStartChallenge}
                  className="rounded-full bg-orange-500 hover:bg-orange-600"
                >
                  Start Challenge
                </Button>
              </CardContent>
            </Card>

            {/* <Card className="bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300 rounded-3xl hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-pink-800 mb-2">Pick Your Mood</h3>
                <Button className="rounded-full bg-pink-500 hover:bg-pink-600">Track Mood</Button>
              </CardContent>
            </Card> */}

            <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300 rounded-3xl hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-purple-800 mb-2">
                  View Progress
                </h3>
                <Button
                  onClick={handleStartChallenge}
                  className="rounded-full bg-purple-500 hover:bg-purple-600"
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


          {/*Mood Picker*/}
          {/* <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
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
          </Card> */}

          {/* Recommended Activities */}
          {/* <Card className="bg-white/80 backdrop-blur-sm border-purple-200 rounded-3xl">
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
          </Card> */}
          <Card className="card-happy p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              How are you feeling today?
            </h2>
            <div className="flex justify-center gap-4 mb-6">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => {
                    setMood(mood.value);
                    setSelectedMood(mood.value);
                  }}
                  className={`mood-emoji p-4 rounded-2xl transition-all duration-300 ${
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
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Recommended Activities:
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {getRecommendedActivities(selectedMood).map(
                    (activity, index) => (
                      <div key={index} className="bg-white/50 p-4 rounded-2xl">
                        <p className="text-gray-700">{activity}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  );
}

