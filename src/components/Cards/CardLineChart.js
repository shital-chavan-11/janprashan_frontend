import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

export default function CardLineChart() {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://janprashna-backend.onrender.com/api/auth/complaints/chart/", {
          withCredentials: true,
        });
        const data = res.data;

        const ctx = chartRef.current.getContext("2d");

        if (chartInstance) chartInstance.destroy(); // Destroy previous chart

        const newChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            datasets: [
              {
                label: "Pending",
                data: data.pending,
                borderColor: "#FBBF24", // yellow
                backgroundColor: "#FBBF24",
                fill: false,
              },
              {
                label: "Working",
                data: data.working,
                borderColor: "#3B82F6", // blue
                backgroundColor: "#3B82F6",
                fill: false,
              },
              {
                label: "Resolved",
                data: data.resolved,
                borderColor: "#10B981", // green
                backgroundColor: "#10B981",
                fill: false,
              },
              {
                label: "Rejected",
                data: data.rejected,
                borderColor: "#EF4444", // red
                backgroundColor: "#EF4444",
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "bottom", labels: { color: "white" } },
              title: { display: false },
            },
            scales: {
              x: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.2)" } },
              y: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.2)" } },
            },
          },
        });

        setChartInstance(newChart);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
              Overview
            </h6>
            <h2 className="text-white text-xl font-semibold">Complaints Status</h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-[350px]">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}