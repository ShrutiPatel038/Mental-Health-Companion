"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Heart,
  SkipForward,
  Volume2,
  VolumeX,
  Eye,
  Sparkles,
} from "lucide-react";

const galleryData = {
  Mountains: [
    {
      url: "/videos/mountains1.mp4",
      quote: "Breathe in the stillness of ancient peaks.",
    },
    {
      url: "/videos/mountains2.mp4",
      quote: "You are grounded and calm like the mountains.",
    },
    {
      url: "/videos/mountains3.mp4",
      quote: "Find your strength in nature's majesty.",
    },
  ],
  Beaches: [
    {
      url: "/videos/beach1.mp4",
      quote: "Let your worries wash away with the tide.",
    },
    {
      url: "/videos/beach2.mp4",
      quote: "Feel the sun, feel peace in your soul.",
    },
    { url: "/videos/beach3.mp4", 
      quote: "Ocean waves carry away your stress." },
  ],
  Rain: [
    {
      url: "/videos/rain1.mp4",
      quote: "Rain renews the soul and cleanses the mind.",
    },
    {
      url: "/videos/rain2.mp4",
      quote: "Let it pour, let it cleanse your worries.",
    },
    {
      url: "/videos/rain3.mp4",
      quote: "Find comfort in nature's gentle rhythm.",
    },
  ],
  Night: [
    {
      url: "/videos/night1.mp4",
      quote: "Stillness under the infinite stars above.",
    },
    {
      url: "/videos/night2.mp4",
      quote: "Breathe beneath the peaceful moonlight.",
    },
    {
      url: "/videos/night3.mp4",
      quote: "Night brings rest to the weary heart.",
    },
  ],
  Forest: [
    {
      url: "/videos/forest1.mp4",
      quote: "Among the trees, find your inner peace.",
    },
    { url: "/videos/forest2.mp4", quote: "Nature's embrace heals the spirit." },
    {
      url: "/videos/forest3.mp4",
      quote: "Listen to the whispers of the wind.",
    },
  ],
  Sunset: [
    {
      url: "/videos/sunset1.mp4",
      quote: "Every sunset brings the promise of a new dawn.",
    },
    {
      url: "/videos/sunset2.mp4",
      quote: "Golden light fills your heart with warmth.",
    },
    {
      url: "/videos/sunset3.mp4",
      quote: "End your day with gratitude and peace.",
    },
  ],
};

const categoryColors = {
  Mountains: {
    bg: "from-slate-100 to-blue-100",
    border: "border-slate-300",
    gradient: "from-slate-400 to-blue-500",
  },
  Beaches: {
    bg: "from-cyan-100 to-blue-100",
    border: "border-cyan-300",
    gradient: "from-cyan-400 to-blue-500",
  },
  Rain: {
    bg: "from-gray-100 to-slate-100",
    border: "border-gray-300",
    gradient: "from-gray-400 to-slate-500",
  },
  Night: {
    bg: "from-indigo-100 to-purple-100",
    border: "border-indigo-300",
    gradient: "from-indigo-400 to-purple-500",
  },
  Forest: {
    bg: "from-green-100 to-emerald-100",
    border: "border-green-300",
    gradient: "from-green-400 to-emerald-500",
  },
  Sunset: {
    bg: "from-orange-100 to-pink-100",
    border: "border-orange-300",
    gradient: "from-orange-400 to-pink-500",
  },
};

export default function VisualRelaxationGallery() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Mountains");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("relaxation-favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const currentScene = galleryData[category][currentIndex];
  const currentColors = categoryColors[category];

  const toggleFavorite = () => {
    const isFav = favorites.some((f) => f.url === currentScene.url);
    const updated = isFav
      ? favorites.filter((f) => f.url !== currentScene.url)
      : [...favorites, { ...currentScene, category }];

    setFavorites(updated);
    localStorage.setItem("relaxation-favorites", JSON.stringify(updated));
  };

  const nextScene = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryData[category].length);
  };

  const previousScene = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + galleryData[category].length) % galleryData[category].length
    );
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentIndex(0);
  };

  const isFavorited = favorites.some((f) => f.url === currentScene.url);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/self-help")}
            className="rounded-full hover:bg-purple-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Self-Help
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Visual Relaxation Gallery
            </h1>
          </div>
          <div className="w-24"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Find Your Visual Sanctuary 🌅
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Immerse yourself in beautiful, calming scenes designed to reduce
            stress and promote deep relaxation.
          </p>
        </div>

        {/* Category Selection */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border-purple-200 rounded-3xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
              Choose Your Escape
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.keys(galleryData).map((cat) => {
                const colors = categoryColors[cat];
                const isActive = category === cat;
                return (
                  <Button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`
                      rounded-2xl px-6 py-3 font-medium transition-all duration-300
                      ${
                        isActive
                          ? `bg-gradient-to-r ${colors.gradient} text-white shadow-lg transform scale-105`
                          : `bg-gradient-to-r ${colors.bg} ${colors.border} border-2 text-gray-700 hover:scale-105`
                      }
                    `}
                  >
                    {cat}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Video Player */}
        <div className="grid lg:grid-cols-1 gap-8">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <Card
              className={`bg-gradient-to-br ${currentColors.bg} ${currentColors.border} border-2 rounded-3xl overflow-hidden shadow-xl`}
            >
              <CardContent className="p-0 relative">
                <div className="relative">
                  <video
                    key={`${category}-${currentIndex}`}
                    src={currentScene.url}
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    poster="/placeholder.svg?height=500&width=800"
                  />

                  {/* Overlay Quote */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <p className="text-white text-lg font-medium italic text-center">
                      "{currentScene.quote}"
                    </p>
                  </div>

                  {/* Favorite Button */}
                  <Button
                    onClick={toggleFavorite}
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorited ? "fill-red-500 text-red-500" : "text-white"
                      }`}
                    />
                  </Button>

                  {/* Category Badge */}
                  <Badge
                    className={`absolute top-4 left-4 bg-gradient-to-r ${currentColors.gradient} text-white rounded-full px-3 py-1`}
                  >
                    {category}
                  </Badge>
                </div>

                {/* Controls */}
                <div className="p-6 bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={previousScene}
                        variant="outline"
                        size="sm"
                        className="rounded-full border-2 hover:scale-105 bg-transparent"
                      >
                        <SkipForward className="w-4 h-4 rotate-180" />
                      </Button>
                      <Button
                        onClick={nextScene}
                        variant="outline"
                        size="sm"
                        className="rounded-full border-2 hover:scale-105 bg-transparent"
                      >
                        <SkipForward className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        {currentIndex + 1} of {galleryData[category].length}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => setIsMuted(!isMuted)}
                        variant="outline"
                        size="sm"
                        className="rounded-full border-2 hover:scale-105"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Scene Navigation */}
            {/* <Card className="bg-white/90 backdrop-blur-sm border-purple-200 rounded-3xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                  {category} Collection
                </h3>
                <div className="space-y-3">
                  {galleryData[category].map((scene, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`
                        w-full text-left p-3 rounded-2xl transition-all duration-200
                        ${
                          index === currentIndex
                            ? `bg-gradient-to-r ${currentColors.gradient} text-white shadow-lg`
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                        }
                      `}
                    >
                      <p className="text-sm font-medium">Scene {index + 1}</p>
                      <p className="text-xs opacity-80 italic">"{scene.quote}"</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            {/* Bottom Action */}
            <div className="space-y-8 x-10 ">
            <Card className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 border-green-300 rounded-3xl">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  🌿 Take a Moment for Yourself
                </h3>
                <p className="text-green-700 mb-4">
                  Regular visual relaxation can help reduce stress, improve
                  focus, and promote better sleep.
                </p>
                <Button
                  onClick={nextScene}
                  className="rounded-2xl bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 px-8"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Discover Next Scene
                </Button>
              </CardContent>
            </Card>

            {/* Favorites */}
            {favorites.length > 0 && (
              <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-300 rounded-3xl">
                <CardContent className="p-8">
                  <h3 className="text-lg font-bold text-pink-800 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2 fill-pink-500 text-pink-500" />
                    Your Favorites ({favorites.length})
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {favorites.map((fav, index) => (
                      <div key={index} className="bg-white/50 p-3 rounded-2xl">
                        <p className="text-sm font-medium text-pink-800">
                          {fav.category}
                        </p>
                        <p className="text-xs text-pink-600 italic">
                          "{fav.quote}"
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            </div>
          </div>
        </div>

        {/* Relaxation Tips - Moved to the bottom */}
        <Card className="mt-8 bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-300 rounded-3xl">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">
              💡 Relaxation Tips
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-blue-700">
              <div className="text-center space-y-3">
                <div className="text-3xl">🧘‍♀️</div>
                <h4 className="font-semibold">Focus on Breathing</h4>
                <p className="text-sm">
                  Take slow, deep breaths while watching the calming scenes
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="text-3xl">🎧</div>
                <h4 className="font-semibold">Use Headphones</h4>
                <p className="text-sm">
                  Enhance your experience with immersive audio
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="text-3xl">⏰</div>
                <h4 className="font-semibold">Set Time Aside</h4>
                <p className="text-sm">
                  Watch for 5-10 minutes for optimal relaxation benefits
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="text-3xl">💝</div>
                <h4 className="font-semibold">Save Favorites</h4>
                <p className="text-sm">
                  Heart your favorite scenes for quick access later
                </p>
              </div>
            </div>
            <div className="mt-8 p-6 bg-white/50 rounded-2xl">
              <h4 className="font-bold text-blue-800 mb-3 text-center">
                🌟 Pro Tips for Maximum Relaxation
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div className="flex items-start space-x-2">
                  <span className="font-medium">✨</span>
                  <span>
                    Find a comfortable, quiet space free from distractions
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium">🌙</span>
                  <span>
                    Dim the lights to create a more immersive atmosphere
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium">🤲</span>
                  <span>Let your hands rest comfortably in your lap</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium">💭</span>
                  <span>
                    Allow your mind to wander naturally with the visuals
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
