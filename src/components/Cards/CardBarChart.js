import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function CardBarChart() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://janprashna-backend.onrender.com/api/auth/announcements/stats/", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();

      const monthLabels = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ];

const types = ["welfare", "educational", "other", "commercial"];


const colors = {
  welfare: "#ed64a6",       // pink
  educational: "#4c51bf",   // blue
  other: "#f6ad55",         // orange
  commercial: "#48bb78"     // green
};


    const datasets = types.map(type => ({
  label: type.charAt(0).toUpperCase() + type.slice(1),
  data: monthLabels.map((_, idx) => data[idx+1]?.[type] || 0),
  backgroundColor: colors[type],
  barThickness: 20
}));

      setLoading(false);

      // Wait until canvas is rendered
      setTimeout(() => {
        if (chartRef.current) {
          if (chartInstanceRef.current) chartInstanceRef.current.destroy();
          const ctx = chartRef.current.getContext("2d");
          chartInstanceRef.current = new Chart(ctx, {
            type: "bar",
            data: { labels: monthLabels, datasets },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "bottom", labels: { color: "#666" } },
                title: { display: false }
              },
              scales: {
                x: { grid: { color: "rgba(33, 37, 41, 0.1)" } },
                y: { beginAtZero: true, grid: { color: "rgba(33, 37, 41, 0.1)" } }
              }
            }
          });
        }
      }, 0); // defer to next tick
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setLoading(false);
    }
  };

  fetchData();
}, []);


  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
              Announcements
            </h6>
            <h2 className=" text-blueGray-700 text-xl font-semibold">
              Month-wise Count
            </h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-96">
          {loading ? <p className="text-center mt-20">Loading chart...</p> : <canvas ref={chartRef}></canvas>}
        </div>
      </div>
    </div>
  );
}
