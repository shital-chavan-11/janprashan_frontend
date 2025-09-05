import React, { useEffect, useState } from "react";
import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  const [stats, setStats] = useState({
    pending: 0,
    resolved: 0,
    rejected: 0,
    working: 0,
    percentages: {
      pending: 0,
      resolved: 0,
      rejected: 0,
      working: 0,
    },
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    setLoading(true);
    fetch("http://localhost:8000/api/auth/complaints/stats/", {
      method: "GET",
      credentials: "include", // if using cookie JWT
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats({
          pending: data.status_counts.pending,
          resolved: data.status_counts.resolved,
          rejected: data.status_counts.rejected,
          working: data.status_counts.working,
          percentages: data.percentages,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStats();

    // 🔄 Auto refresh every 5 seconds (1000ms = 1s, better to keep > 5s for performance)
    const interval = setInterval(() => {
      fetchStats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Helper: if loading, show "..." instead of number
  const displayValue = (value) => (loading ? "..." : value);

  return (
    <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="Resolved Complaints"
                statTitle={displayValue(stats.resolved)}
                statPercent={displayValue(stats.percentages.resolved.toFixed(2))}
                statPercentColor="text-emerald-500"
                statDescripiron="Since last month"
                statIconName="far fa-check-circle"
                statIconColor="bg-red-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="Working Complaints"
                statTitle={displayValue(stats.working)}
                statPercent={displayValue(stats.percentages.working.toFixed(2))}
                statPercentColor="text-red-500"
                statDescripiron="Since last week"
                statIconName="far fa-play-circle"
                statIconColor="bg-orange-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="Pending Complaints"
                statTitle={displayValue(stats.pending)}
                statPercent={displayValue(stats.percentages.pending.toFixed(2))}
                statPercentColor="text-orange-500"
                statDescripiron="Since yesterday"
                statIconName="far fa-clock"
                statIconColor="bg-pink-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="Rejected Complaints"
                statTitle={displayValue(stats.rejected)}
                statPercent={displayValue(stats.percentages.rejected.toFixed(2))}
                statPercentColor="text-emerald-500"
                statDescripiron="Since last month"
                statIconName="far fa-times-circle"
                statIconColor="bg-lightBlue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
