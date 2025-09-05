import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaBullhorn, FaExclamationCircle, FaCommentDots, FaFileArchive } from "react-icons/fa";
import {
  FaCheckCircle,
  FaHourglassStart,
  FaTimesCircle,
  FaTools,
  FaArrowRight,
} from "react-icons/fa";
 

export default function AdminComplaintsDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [selectedWard, setSelectedWard] = useState("all");

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Working", value: "working" },
    { label: "Resolved", value: "resolved" },
    { label: "Rejected", value: "rejected" },
  ];

  const statusConfig = {
    pending: { label: "Pending", icon: <FaHourglassStart />, color: "status-yellow" },
    working: { label: "Working", icon: <FaTools />, color: "status-blue" },
    resolved: { label: "Resolved", icon: <FaCheckCircle />, color: "status-green" },
    rejected: { label: "Rejected", icon: <FaTimesCircle />, color: "status-red" },
  };

  // Fetch complaints
  const fetchComplaints = useCallback(async () => {
    try {
      const res = await axios.get("https://janprashna-backend.onrender.com/api/auth/complaints/", {
        withCredentials: true,
      });
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch complaints", "error");
    }
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  // Update complaint status
  const handleStatusUpdate = async (complaintId, newStatus) => {
    try {
      await axios.patch(
        `https://janprashna-backend.onrender.com/api/auth/complaints/${complaintId}/status/`,
        { status: newStatus },
        { withCredentials: true }
      );
      Swal.fire("Updated!", "Complaint status updated", "success");
      fetchComplaints();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not update complaint status", "error");
    }
  };

  const openComplaintModal = (complaint) => {
    const username = typeof complaint.user === "object" ? complaint.user.username : complaint.user;
    const currentStatus = complaint.status || "Unknown";

    Swal.fire({
      title: <strong>${username}</strong>,
      html: `
        <div style="text-align: left; font-size: 14px;">
          <p><strong>📍 Ward:</strong> ${complaint.ward_number || "N/A"}</p>
          <p><strong>📌 Location:</strong> ${complaint.live_location || "N/A"}</p>
          <p><strong>📂 Category:</strong> ${complaint.category || "N/A"}</p>
          <p><strong>📝 Description:</strong> ${complaint.description || "N/A"}</p>
          ${
            complaint.image
              ? <img src="${complaint.image}" style="max-width:100%; margin-top:10px; border-radius:12px;" />
              : ""
          }
          <div class="mt-4 text-left">
            <label><strong>Update Status</strong></label>
            <select id="statusSelect" style="width:100%; padding:0.5rem; margin-top:0.5rem;">
              ${statusOptions
                .map(
                  (s) =>
                    `<option value="${s.value}" ${s.value === currentStatus ? "selected" : ""}>${s.label}</option>`
                )
                .join("")}
            </select>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Update Status",
      cancelButtonText: "Cancel",
      width: "600px",
      preConfirm: () => {
        const newStatus = document.getElementById("statusSelect").value;
        if (newStatus !== currentStatus) {
          return handleStatusUpdate(complaint.id, newStatus);
        }
        return null;
      },
    });
  };

  // Filter and sort complaints by ward_number
  const filteredComplaints =
    selectedWard === "all"
      ? complaints.sort((a, b) => a.ward_number - b.ward_number)
      : complaints
          .filter((c) => String(c.ward_number) === selectedWard)
          .sort((a, b) => a.ward_number - b.ward_number);

  return (
    <div className="page">
      <div className="heading1 flex items-center justify-center mb-6">
                <FaFileArchive size={25} className="mr-2 " />
                 Manage Complaints
              </div>

      <div className="flex justify-end mb-8">
        <select
          className="border border-slate-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
        >
          <option value="all">All Wards</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={String(i + 1)}>
              Ward {i + 1}
            </option>
          ))}
        </select>
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="empty-box">
          <h2>No complaints found.</h2>
        </div>
      ) : (
        <div className="card-container">
          {filteredComplaints.map((comp) => {
            const status = statusConfig[comp.status] || {
              label: comp.status || "Unknown",
              icon: "?",
              color: "status-default",
            };

            return (
              <div key={comp.id} className="card_com">
  <div className="card_com-details">
    <p className="text-title">{comp.category || "No Category"}</p>
    <p className="text-body">
      Status: {status.label} 
      
    </p>
    <p className="text-body">

      {status.icon}
    </p>
    <p className="text-body">Ward: {comp.ward_number}</p>
  </div>

  <button
    className="card_com-button"
    onClick={() => openComplaintModal(comp)}
  >
    More info
  </button>
</div>

            );
          })}
        </div>
      )}
    </div>
  );
}