import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Textarea } from "@/Components/ui/textarea"
import { ArrowLeft, Save, RefreshCw, Sparkles, Heart, Loader2 } from "lucide-react"
import { getGratitudePrompt } from "@/lib/api"

export default function GratitudeJournal() {
  const router = useNavigate()
  const [challenge,setChallenge] = useState("Loading gratitude prompt...")
  const [prompt, setPrompt] = useState("")
  const [entries, setEntries] = useState(["", "", ""])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [savedMessage, setSavedMessage] = useState("")

  useEffect(() => {
    fetchPrompt()
  }, [])

  const fetchPrompt = async () => {
   try {
      const data = await getGratitudePrompt();
      setChallenge(data.text);
    } catch (error) {
      setChallenge("Couldn't load gratitude prompt. Please try again later.");
    }finally {
    setIsLoading(false); // ✅ Stop spinner
  }
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push("/self-help")}
            className="rounded-full hover:bg-purple-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Self-Help
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Gratitude Journal
            </h1>
          </div>
          
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Notebook Page */}
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200 rounded-3xl shadow-xl overflow-hidden">
          <CardContent className="p-0">
            {/* Notebook Header */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-b-2 border-orange-200 p-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Heart className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-orange-800">Today's Gratitude</h2>
                <Heart className="w-6 h-6 text-orange-500" />
              </div>
              <p className="text-center text-orange-600 text-sm">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Notebook Content */}
            <div
              className="p-8"
              style={{
                backgroundImage: `repeating-linear-gradient(
                transparent,
                transparent 31px,
                #e5e7eb 31px,
                #e5e7eb 32px
              )`,
                backgroundSize: "100% 32px",
              }}
            >
              {/* Prompt Section */}
              <div className="mb-8">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-orange-500 mr-2" />
                    <span className="text-orange-600">Loading your prompt...</span>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-300 p-4 rounded-r-2xl mb-6">
                    <p className="text-purple-800 font-medium leading-relaxed italic">"{challenge}"</p>
                  </div>
                )}
              </div>

              {/* Three Text Areas */}
              <div className="space-y-8">
                {[1, 2, 3].map((num, index) => (
                  <div key={num} className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">
                        {num}
                      </div>
                      <div className="flex-1">
                        <Textarea
                          value={entries[index]}
                          onChange={(e) => handleEntryChange(index, e.target.value)}
                          placeholder={`What are you grateful for? (${num})`}
                          className="min-h-[120px] bg-transparent border-none shadow-none resize-none text-gray-800 placeholder-gray-400 leading-8 text-lg p-0 focus:ring-0 focus:outline-none"
                          style={{
                            backgroundImage: "none",
                            lineHeight: "32px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Save Section */}
              
            </div>

            {/* Notebook Bottom */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-t border-orange-200 p-4">
              <p className="text-center text-orange-600 text-sm italic">
                "Gratitude turns what we have into enough." - Anonymous
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Card */}
        <Card className="mt-8 bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300 rounded-3xl">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold text-blue-800 mb-2">💡 Did you know?</h3>
            <p className="text-blue-700 text-sm">
              Regular gratitude practice can improve your mood, reduce stress, and enhance overall well-being. Even just
              5 minutes a day can make a difference!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
