import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CardPageVisits() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch latest announcements from your DRF API
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("https://janprashna-backend.onrender.com/api/auth/latest/", {
          withCredentials: true, // required if using cookie auth
        });
        setAnnouncements(response.data.latest_announcements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">
              Latest Announcements
            </h3>
          </div>
          
        </div>
      </div>
      <div className="block w-full overflow-hidden">
        <table className="w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Title
              </th>
              

              <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((a) => (
              <tr key={a.id} className="hover:bg-transparent">
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {a.title}
                </td>
                
                 
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {new Date(a.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
