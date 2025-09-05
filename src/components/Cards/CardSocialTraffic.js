import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; // ✅ useHistory for navigation

export default function CardSocialTraffic() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory(); // ✅ get history object

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "https://janprashna-backend.onrender.com/api/auth/stats/monthly/",
          {
            method: "GET",
            credentials: "include", // include cookies for JWT
          }
        );
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">Loading stats...</div>
    );
  }

  if (!stats) {
    return (
      <div className="p-4 text-center text-red-500">
        Failed to load stats. Please try again.
      </div>
    );
  }

  // Calculate totals for each category
  const announcementCount = stats.announcements.reduce(
    (acc, a) => acc + a.count,
    0
  );
  const complaintCount = stats.complaints.reduce((acc, c) => acc + c.count, 0);
  const schemeCount = stats.schemes.reduce((acc, s) => acc + s.count, 0);
  const billCount = stats.bills.count;
  const billAmount = stats.bills.total_amount;

  // Map data with navigation paths
  const socialData = [
    { name: "Announcements", count: announcementCount, path: "/admin/education" },
    { name: "Complaints", count: complaintCount, path: "/admin/mycomplaints" },
    { name: "Schemes", count: schemeCount, path: "/admin/schemes" },
    { name: "Bills", count: billCount, path: "/admin/bills" },
    { name: "Bills Amount", count: `₹${billAmount}`, path: null },
  ];

  // Handle row click
  const handleClick = (path) => {
    if (path) history.push(path);
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">
              Monthly Stats – {stats.month}
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead className="thead-light">
            <tr>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Category
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {socialData.map((item, idx) => (
              <tr
                key={idx}
                className={`border-t hover:bg-gray-100 cursor-pointer ${
                  item.path ? "text-blue-600" : "text-black"
                }`}
                onClick={() => handleClick(item.path)}
              >
                <td className="border-t-0 px-6 py-4 text-xs text-left font-semibold">
                  {item.name}
                </td>
                <td className="border-t-0 px-6 py-4 text-xs">{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
