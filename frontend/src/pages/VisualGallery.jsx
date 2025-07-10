import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";

const galleryData = {
  Mountains: [
    { url: "/videos/mountains1.mp4", quote: "Breathe in the stillness." },
    { url: "/videos/mountains2.mp4", quote: "You are grounded and calm." },
  ],
  Beaches: [
    { url: "/videos/beach1.mp4", quote: "Let your worries wash away." },
    { url: "/videos/beach2.mp4", quote: "Feel the sun, feel peace." },
  ],
  Rain: [
    { url: "/videos/rain1.mp4", quote: "Rain renews the soul." },
    { url: "/videos/rain2.mp4", quote: "Let it pour, let it cleanse." },
  ],
  Night: [
    { url: "/videos/night1.mp4", quote: "Stillness under the stars." },
    { url: "/videos/night2.mp4", quote: "Breathe beneath the moonlight." },
  ],
};

export default function VisualRelaxationGallery() {
  const [category, setCategory] = useState("Mountains");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const currentScene = galleryData[category][currentIndex];

  const toggleFavorite = () => {
    const isFav = favorites.some((f) => f.url === currentScene.url);
    const updated = isFav
      ? favorites.filter((f) => f.url !== currentScene.url)
      : [...favorites, currentScene];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const nextScene = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryData[category].length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-700 dark:text-white">
        Visual Relaxation Gallery
      </h1>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {Object.keys(galleryData).map((cat) => (
          <Button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setCurrentIndex(0);
            }}
            className={`${
              category === cat ? "bg-blue-500 text-white" : "bg-white text-gray-800"
            } px-4 py-2 rounded shadow`}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="relative w-full max-w-xl">
        <video
          src={currentScene.url}
          className="rounded-xl w-full shadow-md object-cover h-[400px]"
          autoPlay
          loop
          muted={!isPlaying}
          playsInline
        />
        <p className="absolute bottom-4 left-4 text-white bg-black/50 px-3 py-1 rounded text-sm">
          {currentScene.quote}
        </p>
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 text-white text-xl"
        >
          {favorites.some((f) => f.url === currentScene.url) ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="flex gap-4 mt-4">
        <Button onClick={nextScene}>Next Scene</Button>
        <Button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "Pause Sound" : "Play Sound"}
        </Button>
      </div>
    </div>
  );
}
