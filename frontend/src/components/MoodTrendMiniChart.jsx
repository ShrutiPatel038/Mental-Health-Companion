import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js"
import "chartjs-adapter-date-fns"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const moodLabels = ["Struggling", "Low", "Okay", "Good", "Amazing"]
const moodColors = [
  "#f87171", // Struggling
  "#a78bfa", // Low
  "#60a5fa", // Okay
  "#34d399", // Good
  "#fbbf24", // Amazing
]

export default function MoodTrendMiniChart({ data }) {
  // data: array of { value, date }
  const labels = data.map((d) =>
    new Date(d.date).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  )

  const chartData = {
    labels,
    datasets: [
      {
        label: "Mood",
        data: data.map((d) => d.value),
        backgroundColor: data.map((d) => moodColors[d.value - 1] || "#a3a3a3"),
        borderRadius: 6,
        maxBarThickness: 20,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${moodLabels[ctx.raw - 1] || "Unknown"} (${ctx.raw}/5)`,
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
      },
      y: {
        display: false,
        min: 1,
        max: 5,
        grid: { display: false },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    },
  }

  return (
    <div className="h-48 w-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
      <Bar data={chartData} options={options} />
    </div>
  )
}