"use client"

import { useState, useEffect, useRef } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle, Volume2, VolumeX } from "lucide-react"

const breathingPatterns = {
  normal: {
    inhale: 4000,
    hold: 2000,
    exhale: 4000,
    name: "Normal Breathing",
  },
  deep: {
    inhale: 6000,
    hold: 4000,
    exhale: 8000,
    name: "Deep Breathing",
  },
}

const phases = {
  inhale: { text: "Breathe In", color: "from-blue-400 to-cyan-400", scale: "scale-150" },
  hold: { text: "Hold", color: "from-purple-400 to-indigo-400", scale: "scale-150" },
  exhale: { text: "Breathe Out", color: "from-green-400 to-emerald-400", scale: "scale-75" },
}

export default function Breathing() {
  const navigate = useNavigate()
  const [mode, setMode] = useState("normal")
  const [duration, setDuration] = useState(5)
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState("inhale")
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [completedMinutes, setCompletedMinutes] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const phaseTimerRef = useRef(null)
  const mainTimerRef = useRef(null)
  const audioRef = useRef(null)

  // Initialize timer when duration changes
  useEffect(() => {
    setTimeRemaining(duration * 60)
  }, [duration])

  // Main timer effect
  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      mainTimerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(mainTimerRef.current)
    }

    return () => clearInterval(mainTimerRef.current)
  }, [isActive, timeRemaining])

  // Breathing cycle effect
  useEffect(() => {
    if (isActive) {
      runBreathingCycle()
    } else {
      clearTimeout(phaseTimerRef.current)
    }

    return () => clearTimeout(phaseTimerRef.current)
  }, [isActive, mode])

  const runBreathingCycle = () => {
    const pattern = breathingPatterns[mode]

    // Inhale phase
    setCurrentPhase("inhale")
    phaseTimerRef.current = setTimeout(() => {
      if (!isActive) return

      // Hold phase
      setCurrentPhase("hold")
      phaseTimerRef.current = setTimeout(() => {
        if (!isActive) return

        // Exhale phase
        setCurrentPhase("exhale")
        phaseTimerRef.current = setTimeout(() => {
          if (!isActive) return

          // Restart cycle
          runBreathingCycle()
        }, pattern.exhale)
      }, pattern.hold)
    }, pattern.inhale)
  }

  const handleStart = () => {
    setIsActive(true)
    setIsCompleted(false)
    if (soundEnabled && audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const handleStop = () => {
    setIsActive(false)
    clearTimeout(phaseTimerRef.current)
    clearInterval(mainTimerRef.current)
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const handleRestart = () => {
    setIsActive(false)
    setTimeRemaining(duration * 60)
    setCurrentPhase("inhale")
    setIsCompleted(false)
    clearTimeout(phaseTimerRef.current)
    clearInterval(mainTimerRef.current)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const handleComplete = () => {
    setIsActive(false)
    setIsCompleted(true)
    setCompletedMinutes(duration)
    clearTimeout(phaseTimerRef.current)
    clearInterval(mainTimerRef.current)
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const handleDone = () => {
    const completed = Math.ceil((duration * 60 - timeRemaining) / 60)
    setCompletedMinutes(completed)
    setIsCompleted(true)
    handleStop()
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const currentPhaseData = phases[currentPhase]

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-md border-green-200 rounded-3xl shadow-xl text-center">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">🎉 Well Done!</h2>
            <p className="text-lg text-green-700 mb-6">
              You completed {completedMinutes} minute{completedMinutes !== 1 ? "s" : ""} of{" "}
              {breathingPatterns[mode].name.toLowerCase()}!
            </p>
            <p className="text-green-600 mb-8">
              Take a moment to notice how you feel. Regular breathing exercises can help reduce stress and improve
              focus.
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleRestart}
                className="w-full rounded-2xl bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500"
              >
                Practice Again
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/self-help")}
                className="w-full rounded-2xl border-2 border-green-300 hover:bg-green-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Self-Help
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-all duration-1000 bg-gradient-to-br ${currentPhaseData.color} flex flex-col`}
    >
      {/* Audio element */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/placeholder-audio.mp3" type="audio/mpeg" />
      </audio>

      {/* Header */}
      <div className="bg-white/20 backdrop-blur-md border-b border-white/30 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/self-help")}
            className="rounded-full text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Self-Help
          </Button>
          <h1 className="text-xl font-bold text-white">Breathing Exercise</h1>
          <Button
            variant="ghost"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="rounded-full text-white hover:bg-white/20"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {!isActive && timeRemaining === duration * 60 ? (
            // Setup Screen
            <Card className="bg-white/90 backdrop-blur-md border-white/50 rounded-3xl shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Breathing Exercise Setup</CardTitle>
                <CardDescription className="text-gray-600">
                  Choose your breathing pattern and duration to begin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Breathing Mode</label>
                    <Select value={mode} onValueChange={setMode}>
                      <SelectTrigger className="rounded-2xl border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal (4-2-4 seconds)</SelectItem>
                        <SelectItem value="deep">Deep (6-4-8 seconds)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Duration</label>
                    <Select value={duration.toString()} onValueChange={(value) => setDuration(Number.parseInt(value))}>
                      <SelectTrigger className="rounded-2xl border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 minute</SelectItem>
                        <SelectItem value="3">3 minutes</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

               

                <Button
                  onClick={handleStart}
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 py-3 text-lg font-medium"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Breathing Exercise
                </Button>
              </CardContent>
            </Card>
          ) : (
            // Exercise Screen
            <div className="text-center">
              {/* Timer */}
              <div className="mb-20">
                <div className="text-white/80 text-lg mb-2">Time Remaining</div>
                <div className="text-4xl font-bold text-white">{formatTime(timeRemaining)}</div>
              </div>

              {/* Breathing Circle */}
              <div className="mb-35 flex justify-center mt-35">
                <div
                  className={`w-48 h-48 rounded-full bg-white/30 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center transition-transform duration-1000 ${currentPhaseData.scale}`}
                >
                  <div className="w-32 h-32 rounded-full bg-white/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/60"></div>
                  </div>
                </div>
              </div>

              {/* Phase Text */}
              <div className="mb-8 mt-20">
                <h2 className="text-4xl font-bold text-white mb-2">{currentPhaseData.text}</h2>
                <p className="text-white/80 text-lg">{breathingPatterns[mode].name}</p>
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center space-x-4">
                {isActive ? (
                  <Button
                    onClick={handleStop}
                    variant="outline"
                    className="rounded-full bg-white/20 border-white/50 text-white hover:bg-white/30"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                ) : (
                  <Button
                    onClick={handleStart}
                    variant="outline"
                    className="rounded-full bg-white/20 border-white/50 text-white hover:bg-white/30"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                )}

                <Button
                  onClick={handleRestart}
                  variant="outline"
                  className="rounded-full bg-white/20 border-white/50 text-white hover:bg-white/30"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart
                </Button>

                <Button
                  onClick={handleDone}
                  variant="outline"
                  className="rounded-full bg-white/20 border-white/50 text-white hover:bg-white/30"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
