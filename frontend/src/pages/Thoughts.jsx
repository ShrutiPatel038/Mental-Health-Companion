"use client"

import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Textarea } from "@/Components/ui/textarea"
import { Progress } from "@/Components/ui/progress"
import { Badge } from "@/Components/ui/badge"
import { ArrowLeft, Brain, Sparkles, CheckCircle, RefreshCw, Trophy, Loader2 } from "lucide-react"
import { fetchNegativeThoughts } from "@/lib/api" // Adjust the import based on your API structure

export default function ThoughtReframingPage() {
  const navigate = useNavigate()

  // Game state
  const [difficulty, setDifficulty] = useState("easy")
  const [totalScore, setTotalScore] = useState(10)
  const [thoughtList, setThoughtList] = useState([])
  const [current, setCurrent] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock API functions (replace with your actual API calls)
//   const fetchNegativeThoughts = async (difficulty, count) => {
//     // Replace with your actual API call
//     const mockThoughts = [
//       "I'm not good enough for this job",
//       "Everyone thinks I'm boring",
//       "I always mess things up",
//       "I'll never be successful",
//       "Nobody really likes me",
//     ]
//     return mockThoughts.slice(0, count)
//   }

  const evaluateThought = async (originalThought, userAnswer, difficulty) => {
    // Replace with your actual API call
    const score = Math.floor(Math.random() * 5) + 1
    const geminiReframe =
      score <= 3
        ? "Try to focus on your strengths and past achievements. You are capable of growth and learning."
        : null
    return { score, geminiReframe }
  }

  const handleStart = async () => {
    setIsLoading(true)
    try {
      const count = totalScore / 5
      const thoughts = await fetchNegativeThoughts(difficulty, count)
      setThoughtList(thoughts)
      setCurrent(0)
      setAnswers([])
      setUserAnswer("")
      setShowResult(false)
      setGameStarted(true)
    } catch (error) {
      console.error("Error starting game:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = async () => {
    if (!userAnswer.trim()) return

    setIsSubmitting(true)
    try {
      const originalThought = thoughtList[current]
      const { score, geminiReframe } = await evaluateThought(originalThought, userAnswer, difficulty)

      setAnswers((prev) => [
        ...prev,
        {
          negativeThought: originalThought,
          userReframe: userAnswer,
          score,
          geminiReframe: score <= 3 ? geminiReframe : null,
        },
      ])

      setUserAnswer("")
      setCurrent((prev) => prev + 1)

      if (current + 1 === thoughtList.length) {
        setShowResult(true)
      }
    } catch (error) {
      console.error("Error evaluating thought:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRestart = () => {
    setGameStarted(false)
    setShowResult(false)
    setAnswers([])
    setCurrent(0)
    setUserAnswer("")
    setThoughtList([])
  }

  const total = answers.reduce((acc, curr) => acc + curr.score, 0)
  const maxPossibleScore = thoughtList.length * 5
  const progressPercentage = thoughtList.length > 0 ? (current / thoughtList.length) * 100 : 0

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score) => {
    if (score >= 4) return "text-green-600"
    if (score >= 3) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/self-help")}
            className="rounded-full hover:bg-purple-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Self-Help
          </Button>
          <div className="flex align-items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Thought Reframing Tool
            </h1>
          </div>
          <div className="w-24"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Setup Screen */}
        {!gameStarted && !showResult && (
          <Card className="bg-white/90 backdrop-blur-sm border-purple-200 rounded-3xl shadow-xl">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                🧠 Thought Reframing Game
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Transform negative thoughts into positive, empowering ones. Practice cognitive reframing to build mental
                resilience.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Choose Difficulty:</label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="rounded-2xl border-purple-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800 text-xs">Easy</Badge>
                          <span>Common daily thoughts</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>
                          <span>Cognitive distortions</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="hard">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-red-100 text-red-800 text-xs">Hard</Badge>
                          <span>Deep negative beliefs</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Target Points:</label>
                  <Select value={totalScore.toString()} onValueChange={(value) => setTotalScore(Number(value))}>
                    <SelectTrigger className="rounded-2xl border-purple-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 points (2 thoughts)</SelectItem>
                      <SelectItem value="25">25 points (5 thoughts)</SelectItem>
                      <SelectItem value="50">50 points (10 thoughts)</SelectItem>
                      <SelectItem value="100">100 points (20 thoughts)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
                <h4 className="font-bold text-blue-800 mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  How it works:
                </h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• You'll see negative thoughts that need reframing</li>
                  <li>• Write a positive, realistic alternative for each thought</li>
                  <li>• Get scored from 1-5 based on positivity and helpfulness</li>
                  <li>• Receive AI suggestions for low-scoring reframes</li>
                  <li>• Build your cognitive reframing skills over time</li>
                </ul>
              </div>

              <Button
                onClick={handleStart}
                disabled={isLoading}
                className="w-full rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 py-3 text-lg font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Loading Thoughts...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Start Reframing Game
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Game Screen */}
        {gameStarted && !showResult && (
          <div className="space-y-6">
            {/* Progress */}
            <Card className="bg-white/90 backdrop-blur-sm border-purple-200 rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    Question {current + 1} of {thoughtList.length}
                  </span>
                  <Badge className={getDifficultyColor(difficulty)}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </Badge>
                </div>
                <Progress value={progressPercentage} className="h-3 rounded-full" />
              </CardContent>
            </Card>

            {/* Current Thought */}
            <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-red-800 flex items-center">❌ Negative Thought:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg italic text-red-700 bg-white/50 p-4 rounded-2xl">"{thoughtList[current]}"</p>
              </CardContent>
            </Card>

            {/* User Input */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-green-800 flex items-center">
                  ✅ Your Positive Reframe:
                </CardTitle>
                <CardDescription className="text-green-600">
                  Transform this negative thought into something positive and realistic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Write your positive reframe here... Focus on being realistic, compassionate, and empowering."
                  className="min-h-32 rounded-2xl border-green-200 focus:border-green-400 focus:ring-green-400 bg-white/70"
                />
                <Button
                  onClick={handleNext}
                  disabled={!userAnswer.trim() || isSubmitting}
                  className="w-full rounded-2xl bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 py-3 text-lg font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Evaluating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Submit Reframe
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Screen */}
        {showResult && (
          <div className="space-y-6">
            {/* Final Score */}
            <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-yellow-800 mb-2">🎉 Game Complete!</h2>
                <p className="text-xl font-semibold text-yellow-700 mb-4">
                  Your Total Score: {total} / {maxPossibleScore}
                </p>
                <div className="w-full bg-yellow-200 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(total / maxPossibleScore) * 100}%` }}
                  />
                </div>
                <p className="text-yellow-600">
                  {total / maxPossibleScore >= 0.8
                    ? "Excellent work! You're mastering positive thinking!"
                    : total / maxPossibleScore >= 0.6
                      ? "Great job! You're developing strong reframing skills!"
                      : "Good effort! Keep practicing to improve your cognitive reframing."}
                </p>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Your Reframing Journey</h3>
              {answers.map((ans, idx) => (
                <Card key={idx} className="bg-white/90 backdrop-blur-sm border-purple-200 rounded-3xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-sm font-medium text-gray-500">Question {idx + 1}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-lg font-bold ${getScoreColor(ans.score)}`}>⭐ {ans.score} / 5</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-red-50 p-4 rounded-2xl border-l-4 border-red-300">
                        <p className="text-sm font-medium text-red-800 mb-1">❌ Negative Thought:</p>
                        <p className="text-red-700 italic">"{ans.negativeThought}"</p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-2xl border-l-4 border-green-300">
                        <p className="text-sm font-medium text-green-800 mb-1">✅ Your Reframe:</p>
                        <p className="text-green-700">"{ans.userReframe}"</p>
                      </div>

                      {ans.geminiReframe && (
                        <div className="bg-blue-50 p-4 rounded-2xl border-l-4 border-blue-300">
                          <p className="text-sm font-medium text-blue-800 mb-1 flex items-center">
                            <Sparkles className="w-4 h-4 mr-1" />
                            AI Suggestion:
                          </p>
                          <p className="text-blue-700">"{ans.geminiReframe}"</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                onClick={handleRestart}
                className="rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 px-8"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/self-help")}
                className="rounded-2xl border-2 border-purple-300 hover:bg-purple-50 px-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Self-Help
              </Button>
            </div>
          </div>
        )}

        {/* Tips Card */}
        {!gameStarted && !showResult && (
          <Card className="mt-8 bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300 rounded-3xl">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold text-blue-800 mb-4">💡 Reframing Tips</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-700">
                <div>
                  <strong>Be realistic:</strong> Don't just think positive - think balanced and truthful
                </div>
                <div>
                  <strong>Show self-compassion:</strong> Treat yourself like you would a good friend
                </div>
                <div>
                  <strong>Focus on growth:</strong> Emphasize learning and improvement over perfection
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
