import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  FaArrowRight,
  FaHourglassStart,
  FaCheckCircle,
  FaTimesCircle,
  FaTools,
} from "react-icons/fa";
import "assets/styles/tailwind.css"; // Tailwind CSS

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusConfig = {
    Resolved: {
      label: "Resolved",
      icon: <FaCheckCircle />,
      color: "status-green",
    },
    Pending: {
      label: "Pending",
      icon: <FaHourglassStart />,
      color: "status-yellow",
    },
    Rejected: {
      label: "Rejected",
      icon: <FaTimesCircle />,
      color: "status-red",
    },
    Working: {
      label: "Working",
      icon: <FaTools />,
      color: "status-blue",
    },
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch("https://janprashna-backend.onrender.com/api/auth/mine/", {
          method: "GET",
          credentials: "include", // send cookies automatically
        });

        if (res.ok) {
          const data = await res.json();
          setComplaints(data);
        } else if (res.status === 401) {
          Swal.fire("Unauthorized", "Please login first", "error");
        } else {
          Swal.fire("Error", "Failed to fetch complaints", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Something went wrong", "error");
      }
      setLoading(false);
    };

    fetchComplaints();
  }, []);

  const openComplaintModal = (comp) => {
    const normalizedStatus =
      comp.status &&
      comp.status.charAt(0).toUpperCase() +
        comp.status.slice(1).toLowerCase();

    const status =
      statusConfig[normalizedStatus] || {
        label: comp.status || "Unknown",
        icon: "?",
        color: "status-default",
      };

    Swal.fire({
      title: `<strong>${comp.category}</strong>`,
      html: `
        <div style="text-align: left; font-size: 14px;">
          <p><strong>📍 Ward:</strong> ${comp.ward_number}</p>
          <p><strong>📌 Location:</strong> ${comp.live_location}</p>
          <p><strong>🗕 Date:</strong> ${new Date(
            comp.created_at
          ).toLocaleString()}</p>
          <p><strong>📝 Description:</strong> ${comp.description}</p>
          <p><strong>Status:</strong> ${status.label}</p>
          ${
            comp.image
              ? `<img src="${comp.image}" style="max-width: 100%; margin-top: 10px;" loading="lazy"/>`
              : ""
          }
        </div>
      `,
      confirmButtonText: "Close",
      width: "600px",
    });
  };

  if (loading) return <div className="loading">Loading complaints...</div>;

  if (complaints.length === 0)
    return (
      <div className="empty">
        <div className="empty-box">
          <h2>No Complaints Found</h2>
          <p>You haven't submitted any complaints yet.</p>
        </div>
      </div>
    );

  return (
    <div className="page">
       <div
                 className="heading1 flex items-center justify-center p-8"
               >
                 <FaTools size={20} className="mr-2" />
                My Complaints
               </div>
     
      <div className="card-container">
        {complaints.map((comp) => {
          const normalizedStatus =
            comp.status &&
            comp.status.charAt(0).toUpperCase() +
              comp.status.slice(1).toLowerCase();

          const status =
            statusConfig[normalizedStatus] || {
              label: comp.status || "Unknown",
              icon: "?",
              color: "status-default",
            };

          return (
            <div key={comp.id} className="card_com">
              <div className={`card-status ${status.color}`}>
                <span className="status-icon">{status.icon}</span>
                <span>{status.label}</span>
              </div>

              <div className="card_com-details">
                <p className="text-title">{comp.category}</p>
              </div>

              <button
                className="card_com-button"
                onClick={() => openComplaintModal(comp)}
              >
                Read More
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
