// src/components/MoodGauge.jsx
import { useRef, useEffect } from "react";
import { Chart as ChartJS, ArcElement, LinearScale } from "chart.js";
import { GaugeController } from "chartjs-gauge";
import { Chart } from "react-chartjs-2";

ChartJS.register(GaugeController, ArcElement, LinearScale);

export default function MoodGauge({ value = 50 }) {
  const chartRef = useRef();

  const data = {
    datasets: [
      {
        value,
        minValue: 0,
        data: [30, 40, 30], // Red, Yellow, Green
        backgroundColor: ["#ef4444", "#facc15", "#22c55e"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    type: "gauge",
    responsive: true,
    cutout: "80%",
    circumference: 180,
    rotation: 270,
    plugins: {
      legend: { display: false },
    },
    needle: {
      radiusPercentage: 2,
      widthPercentage: 3.2,
      lengthPercentage: 80,
      color: "#6366f1",
    },
    valueLabel: {
      display: true,
      formatter: (value) => `${value}`,
      color: "#334155",
      font: { size: 24, weight: "bold" },
    },
  };

  return (
    <div className="rounded-2xl shadow-md p-4 bg-gradient-to-br from-indigo-50 to-white w-full max-w-md mx-auto">
      <h3 className="font-semibold mb-2 text-center">Sentiment Gauge</h3>
      <Chart ref={chartRef} type="gauge" data={data} options={options} height={200} />
      <div className="flex justify-between text-xs mt-2 px-2">
        <span className="text-red-500">Negative</span>
        <span className="text-yellow-500">Neutral</span>
        <span className="text-green-500">Positive</span>
      </div>
    </div>
  );
}
