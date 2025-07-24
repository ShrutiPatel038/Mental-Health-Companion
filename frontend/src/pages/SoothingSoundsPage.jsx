"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Slider } from "@/Components/ui/slider"
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Moon,
  CloudRain,
  Waves,
  TreePine,
  Droplets,
  Brain,
  BrainCircuitIcon,
  Music,
} from "lucide-react"
import ProtectedRoute from "@/Components/ProtectedRoute"
import SidebarLayout from "@/Components/SidebarLayout"

const soundTracks = [
  {
    id: 1,
    title: "Ocean Waves",
    description: "Gentle waves lapping on the shore",
    icon: Waves,
    color: "from-blue-400 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
    audioUrl: "/sounds/ocean.mp3",
    duration: "30:00",
  },
  {
    id: 2,
    title: "Rainfall",
    description: "Soft rain falling on leaves",
    icon: CloudRain,
    color: "from-gray-400 to-blue-500",
    bgColor: "from-gray-50 to-blue-50",
    audioUrl: "/sounds/rain.wav",
    duration: "25:00",
  },
  {
    id: 3,
    title: "Forest Sounds",
    description: "Birds chirping in a peaceful forest",
    icon: TreePine,
    color: "from-green-400 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    audioUrl: "/sounds/nature.wav",
    duration: "35:00",
  },
  {
    id: 4,
    title: "Water falls",
    description: "Tranquil waterfall with gentle wind chimes",
    icon: Droplets,
    color: "from-purple-400 to-indigo-500",
    bgColor: "from-purple-50 to-indigo-50",
    audioUrl: "/sounds/waterfall.mp3",
    duration: "20:00",
  },
  {
    id: 5,
    title: "Binaural beats",
    description: "Calming beats for focus and relaxation",
    icon: BrainCircuitIcon,
    color: "from-orange-400 to-red-500",
    bgColor: "from-orange-50 to-red-50",
    audioUrl: "/sounds/bb.mp3",
    duration: "40:00",
  },
  {
    id: 6,
    title: "Night Sounds",
    description: "Peaceful crickets and night ambiance",
    icon: Moon,
    color: "from-indigo-400 to-purple-500",
    bgColor: "from-indigo-50 to-purple-50",
    audioUrl: "/audio/night-sounds.mp3",
    duration: "45:00",
  },
  {
    id: 7,
    title: "Meditation Bells",
    description: "Tibetan bells for meditation and mindfulness",
    icon: Music,
    color: "from-yellow-400 to-orange-500",
    bgColor: "from-yellow-50 to-orange-50",
    audioUrl: "/sounds/tibetan-bells.mp3",
    duration: "30:00",
  },
  {
    id: 8,
    title: "Alpha Waves",
    description: "Binaural beats for deep relaxation",
    icon: Brain,
    color: "from-pink-400 to-purple-500",
    bgColor: "from-pink-50 to-purple-50",
    audioUrl: "/sounds/alpha.mp3",
    duration: "60:00",
  },
]

export default function SoothingSoundsPage() {
  const navigate = useNavigate()
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([70])
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleTrackEnd)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleTrackEnd)
    }
  }, [currentTrack])

  const handleTrackEnd = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const playTrack = (track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    } else {
      setCurrentTrack(track)
      setIsPlaying(true)
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play()
        }
      }, 100)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const restartTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const currentTrackData = currentTrack ? soundTracks.find((t) => t.id === currentTrack.id) : null

  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-md border-b border-purple-200 px-4 sm:px-6 py-4 mb-8">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/self-help")}
                className="rounded-full hover:bg-purple-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Self-Help
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Soothing Sounds
                </h1>
              </div>
              <div className="w-24" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Find Your Peace 🎵
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Immerse yourself in calming sounds designed to reduce stress, improve focus, and promote deep relaxation.
              </p>
            </div>

            {/* Current Playing Track */}
            {currentTrack && (
              <Card className="mb-8 bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-md border-purple-200 rounded-3xl shadow-xl">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${currentTrackData?.color} rounded-3xl flex items-center justify-center`}
                    >
                      {currentTrackData && <currentTrackData.icon className="w-10 h-10 text-white" />}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{currentTrack.title}</h3>
                      <p className="text-gray-600 mb-4">{currentTrackData?.description}</p>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-wrap items-center gap-4">
                      <Button variant="ghost" size="sm" onClick={restartTrack} className="rounded-full hover:bg-purple-100">
                        <RotateCcw className="w-5 h-5" />
                      </Button>

                      <Button
                        onClick={() => playTrack(currentTrack)}
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500"
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                      </Button>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={toggleMute} className="rounded-full hover:bg-purple-100">
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                        <div className="w-20 sm:w-24">
                          <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sound Tracks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {soundTracks.map((track) => {
                const IconComponent = track.icon
                const isCurrentTrack = currentTrack?.id === track.id

                return (
                  <Card
                    key={track.id}
                    className={`bg-gradient-to-br ${track.bgColor} border-2 rounded-3xl cursor-pointer hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl ${
                      isCurrentTrack ? "ring-4 ring-blue-300 shadow-xl scale-105" : "border-opacity-20"
                    }`}
                    onClick={() => playTrack(track)}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${track.color} rounded-3xl flex items-center justify-center mx-auto mb-4 ${
                          isCurrentTrack && isPlaying ? "animate-pulse" : ""
                        }`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 mb-2">{track.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{track.description}</p>

                      {isCurrentTrack && (
                        <div className="mt-3 flex items-center justify-center">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              isPlaying ? "bg-green-400 animate-pulse" : "bg-gray-400"
                            } mr-2`}
                          />
                          <span className="text-xs font-medium text-gray-600">
                            {isPlaying ? "Playing" : "Paused"}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Tips Section */}
            <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-300 rounded-3xl mb-8">
              <CardContent className="p-4 sm:p-6 text-center">
                <h3 className="text-xl font-bold text-green-800 mb-4">💡 Relaxation Tips</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-green-700">
                  <div>
                    <strong>Find a quiet space:</strong> Choose a comfortable, distraction-free environment
                  </div>
                  <div>
                    <strong>Use headphones:</strong> For the best immersive experience
                  </div>
                  <div>
                    <strong>Focus on breathing:</strong> Let the sounds guide your natural rhythm
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Audio Element */}
          {currentTrack && (
            <div className="fixed bottom-4 left-4 right-4 z-50 sm:static sm:z-auto">
              <audio ref={audioRef} src={currentTrack.audioUrl} loop preload="auto" />
            </div>
          )}
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  )
}
