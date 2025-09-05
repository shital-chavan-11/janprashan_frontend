import React, { useEffect, useState } from "react";
import axios from "axios";
import "assets/styles/admindoubts.css";

export default function AdminDoubts() {
  const [doubts, setDoubts] = useState([]);
  const [filteredDoubts, setFilteredDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDoubt, setActiveDoubt] = useState(null);
  const [currentReply, setCurrentReply] = useState("");
  const [replying, setReplying] = useState(false);
  const [wardFilter, setWardFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchDoubts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [doubts, wardFilter, statusFilter]);

  const fetchDoubts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://janprashna-backend.onrender.com/api/auth/doubts/", {
        withCredentials: true,
      });

      const dataWithStatus = response.data.map((d) => ({
        ...d,
        status: d.reply ? "Answered" : "Unanswered",
      }));

      setDoubts(dataWithStatus);
    } catch (error) {
      console.error("Error fetching doubts:", error);
      alert("Failed to fetch doubts");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let temp = [...doubts];

    if (wardFilter) {
      temp = temp.filter((d) =>
        d.ward_number.toString().includes(wardFilter)
      );
    }

    if (statusFilter === "answered") {
      temp = temp.filter((d) => d.status === "Answered");
    } else if (statusFilter === "unanswered") {
      temp = temp.filter((d) => d.status === "Unanswered");
    }

    setFilteredDoubts(temp);
  };

  const openReplyModal = (doubt) => {
    setActiveDoubt(doubt);
    setCurrentReply(doubt.reply || "");
  };

  const closeReplyModal = () => {
    setActiveDoubt(null);
    setCurrentReply("");
  };

  const sendReply = async () => {
    if (!currentReply.trim()) return alert("Please enter reply text");
    setReplying(true);
    try {
      const response = await axios.post(
        `https://janprashna-backend.onrender.com/api/auth/doubts/${activeDoubt.id}/reply/`,
        { reply: currentReply },
        { withCredentials: true }
      );

      const updatedDoubt = {
        ...response.data,
        status: response.data.reply ? "Answered" : "Unanswered",
      };

      setDoubts((prev) =>
        prev.map((d) => (d.id === activeDoubt.id ? updatedDoubt : d))
      );
      closeReplyModal();
    } catch (error) {
      console.error("Error sending reply:", error.response || error);
      alert("Error sending reply");
    } finally {
      setReplying(false);
    }
  };

  if (loading) return <p className="loading">Loading doubts...</p>;

  return (
    <div className="cf-wrapper_doubt">
      {/* Page Container */}
      <div className="cf-form-container_doubt">
        <h2 className="heading1">📚 Admin Doubts</h2>

        {/* Filters */}
        <div className="filters-row">
          <button
            className={`view-button ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          <button
            className={`view-button ${statusFilter === "answered" ? "active" : ""}`}
            onClick={() => setStatusFilter("answered")}
          >
            Answered
          </button>
          <button
            className={`view-button ${statusFilter === "unanswered" ? "active" : ""}`}
            onClick={() => setStatusFilter("unanswered")}
          >
            Unanswered
          </button>
          <input
            type="text"
            placeholder="Filter by Ward Number..."
            value={wardFilter}
            onChange={(e) => setWardFilter(e.target.value)}
            className="form-input"
          />
        </div>

        {/* Doubts Table */}
        <div className="documents-section">
          {filteredDoubts.length === 0 ? (
            <p className="no-data">No doubts found.</p>
          ) : (
            <div className="table-container">
              <table className="doubts-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Ward</th>
                    <th>Doubt</th>
                    <th>Action</th>
                    <th>Reply</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoubts.map((doubt) => (
                    <tr
                      key={doubt.id}
                      className={doubt.status === "Answered" ? "answered" : "pending"}
                    >
                      <td>{doubt.id}</td>
                      <td>{doubt.ward_number}</td>
                      <td>{doubt.doubt}</td>
                      <td>
                        {doubt.status === "Unanswered" ? (
                          <button
                            className="view-button"
                            onClick={() => openReplyModal(doubt)}
                          >
                            Reply
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>{doubt.reply ? doubt.reply : "-"}</td>
                      <td className={`status ${doubt.status.toLowerCase()}`}>
                        {doubt.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {activeDoubt && (
        <div className="modal-overlay" onClick={closeReplyModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Reply to Doubt #{activeDoubt.id}</h3>
            <p>
              <strong>Doubt:</strong> {activeDoubt.doubt}
            </p>
            <textarea
              value={currentReply}
              onChange={(e) => setCurrentReply(e.target.value)}
              placeholder="Write your reply here..."
            />
            <div className="modal-buttons">
              <button className="view-button cancel" onClick={closeReplyModal}>
                Cancel
              </button>
              <button
                className="view-button"
                onClick={sendReply}
                disabled={replying}
              >
                {replying ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}