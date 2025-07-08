import ProtectedRoute from "@/Components/ProtectedRoute"
import SidebarLayout from "@/Components/SidebarLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { Progress } from "@/Components/ui/progress"
import { Badge } from "@/Components/ui/badge"
import { Heart, Wind, BookOpen, Anchor, Sparkles, Shield, Brain, Moon, Clock, RefreshCw } from "lucide-react"
import { Link } from "react-router"
import { useNavigate } from "react-router-dom"


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
    title: "Thought reframing tool",
    description: "Transform negative thoughts into positive ones.",
    icon: Anchor,
    progress: 60,
    color: "from-purple-400 to-purple-600",
    bgColor: "from-purple-50 to-purple-100",
    difficulty: "Intermediate",
  },
  {
    id: 4,
    title: "Soothing sounds ",
    description: "Relax with calming music and nature sounds to enhance your mood.",
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
  }
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

    const navigate = useNavigate()

    const handleStartChallenge = () => {
    navigate('/self-help/soothing-sounds');
  }
    const handle2ndChallenge = () => {
    navigate('/self-help/gratitude-journal');
  }
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
                      {/* <Badge className={`${getDifficultyColor(module.difficulty)} rounded-full text-xs`}>
                        {module.difficulty}
                      </Badge> */}
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-800 leading-tight">{module.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                      {module.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                    {/* Action Button */}
                    {module.id === 1 ? (
                      <Link to="/breathing-exercise">
                        <Button
                          className={`w-full rounded-2xl bg-gradient-to-r ${module.color} hover:opacity-90 text-white font-medium`}
                        >
                          Start
                        </Button>
                      </Link>
                    )  : module.id === 2 ? (
                      <Link to="/gratitude-journal">
                        <Button
                          className={`w-full rounded-2xl bg-gradient-to-r ${module.color} hover:opacity-90 text-white font-medium`}
                        >
                          Start
                        </Button>
                      </Link>
                    ) : module.id === 4 ? (
                      <Link to="/soothing-sounds">
                        <Button
                          className={`w-full rounded-2xl bg-gradient-to-r ${module.color} hover:opacity-90 text-white font-medium`}
                        >
                          Start
                        </Button>
                      </Link>
                    ) :(
                      <Button
                        className={`w-full rounded-2xl bg-gradient-to-r ${module.color} hover:opacity-90 text-white font-medium`}
                      >
                        {module.progress === 0 ? "Start Module" : module.progress === 100 ? "Review" : "Continue"}
                      </Button>
                    )}
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
