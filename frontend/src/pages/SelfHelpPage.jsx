import ProtectedRoute from "@/Components/ProtectedRoute"
import SidebarLayout from "@/Components/SidebarLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { Progress } from "@/Components/ui/progress"
import { Badge } from "@/Components/ui/badge"
import { Heart, Wind, BookOpen, Anchor, Sparkles, Shield, Brain, Moon, Clock, RefreshCw } from "lucide-react"

const modules = [
  {
    id: 1,
    title: "Deep Breathing Exercises",
    description: "Learn various breathing techniques to reduce anxiety and promote relaxation.",
    icon: Wind,
    progress: 75,
    color: "from-blue-400 to-blue-600",
    bgColor: "from-blue-50 to-blue-100",
    difficulty: "Beginner",
  },
  {
    id: 2,
    title: "Guided Journaling",
    description: "Express your thoughts and emotions through structured writing prompts.",
    icon: BookOpen,
    progress: 45,
    color: "from-green-400 to-green-600",
    bgColor: "from-green-50 to-green-100",
    difficulty: "Beginner",
  },
  {
    id: 3,
    title: "Grounding Techniques",
    description: "Stay present and centered with the 5-4-3-2-1 technique and other grounding methods.",
    icon: Anchor,
    progress: 60,
    color: "from-purple-400 to-purple-600",
    bgColor: "from-purple-50 to-purple-100",
    difficulty: "Intermediate",
  },
  {
    id: 4,
    title: "Gratitude Practice",
    description: "Cultivate positivity and appreciation through daily gratitude exercises.",
    icon: Sparkles,
    progress: 90,
    color: "from-yellow-400 to-orange-500",
    bgColor: "from-yellow-50 to-orange-100",
    difficulty: "Beginner",
  },
  {
    id: 5,
    title: "Anxiety Coping Toolkit",
    description: "Practical strategies and techniques to manage anxiety in daily life.",
    icon: Shield,
    progress: 30,
    color: "from-red-400 to-pink-500",
    bgColor: "from-red-50 to-pink-100",
    difficulty: "Intermediate",
  },
  {
    id: 6,
    title: "Self-Esteem Booster",
    description: "Build confidence and self-worth through positive affirmations and exercises.",
    icon: Heart,
    progress: 20,
    color: "from-pink-400 to-rose-500",
    bgColor: "from-pink-50 to-rose-100",
    difficulty: "Intermediate",
  },
  {
    id: 7,
    title: "Mindfulness Meditations",
    description: "Practice mindfulness and meditation to improve focus and reduce stress.",
    icon: Brain,
    progress: 55,
    color: "from-indigo-400 to-purple-500",
    bgColor: "from-indigo-50 to-purple-100",
    difficulty: "Advanced",
  },
  {
    id: 8,
    title: "Sleep Hygiene Tracker",
    description: "Improve your sleep quality with healthy bedtime routines and habits.",
    icon: Moon,
    progress: 40,
    color: "from-slate-400 to-slate-600",
    bgColor: "from-slate-50 to-slate-100",
    difficulty: "Beginner",
  },
  {
    id: 9,
    title: "Time Management Aid",
    description: "Organize your day and reduce overwhelm with effective time management strategies.",
    icon: Clock,
    progress: 15,
    color: "from-teal-400 to-cyan-500",
    bgColor: "from-teal-50 to-cyan-100",
    difficulty: "Intermediate",
  },
  {
    id: 10,
    title: "Thought Reframing Workshop",
    description: "Transform negative thought patterns into positive, constructive thinking.",
    icon: RefreshCw,
    progress: 0,
    color: "from-emerald-400 to-green-500",
    bgColor: "from-emerald-50 to-green-100",
    difficulty: "Advanced",
  },
]

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800"
    case "Advanced":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function SelfHelpPage() {
  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Self-Help Modules 🌱
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover tools and techniques to support your mental health journey. Each module is designed to help you
              build resilience and find inner peace.
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300 rounded-3xl">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-purple-800 mb-2">Your Learning Progress</h3>
                <p className="text-purple-600 mb-4">You've completed 4 out of 10 modules</p>
                <Progress value={40} className="w-full max-w-md mx-auto h-3 rounded-full" />
                <p className="text-sm text-purple-600 mt-2">Keep going! You're doing amazing! 🎉</p>
              </div>
            </CardContent>
          </Card>

          {/* Modules Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const IconComponent = module.icon
              return (
                <Card
                  key={module.id}
                  className={`bg-gradient-to-br ${module.bgColor} border-2 border-opacity-20 rounded-3xl hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-2xl flex items-center justify-center mb-3`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge className={`${getDifficultyColor(module.difficulty)} rounded-full text-xs`}>
                        {module.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-800 leading-tight">{module.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                      {module.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-800">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2 rounded-full" />
                      </div>

                      {/* Action Button */}
                      <Button
                        className={`w-full rounded-2xl bg-gradient-to-r ${module.color} hover:opacity-90 text-white font-medium`}
                      >
                        {module.progress === 0 ? "Start Module" : module.progress === 100 ? "Review" : "Continue"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Motivational Footer */}
          <Card className="bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-300 rounded-3xl">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-orange-800 mb-2">Remember: Progress, Not Perfection 💪</h3>
              <p className="text-orange-700">
                Every small step you take is a victory. Be patient with yourself and celebrate your growth!
              </p>
            </CardContent>
          </Card>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
