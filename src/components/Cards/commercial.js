import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { RiMegaphoneLine } from "react-icons/ri";
import { MdHelpOutline } from "react-icons/md";
import "../Cards/Education.css";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);

  // ✅ Doubt form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wardNumber, setWardNumber] = useState("");
  const [doubt, setDoubt] = useState("");

  // ✅ Fetch announcements from backend
  useEffect(() => {
    axios
      .get("https://janprashna-backend.onrender.com/api/auth/announcements/", {
        withCredentials: true,
      })
      .then((res) => {
        const filtered = res.data.filter(
          (ann) => ann.announcement_type?.toLowerCase() === "commercial"
        );
        setAnnouncements(filtered);
      })
      .catch((err) => {
        console.error("Error fetching announcements:", err);
      });
  }, []);

  // ✅ Function to show details
  const showDetails = (item) => {
    Swal.fire({
      title: `<strong>${item.title}</strong>`,
      html: `
        <div style="text-align: left; font-size: 14px; line-height: 1.6;">
          <p><strong>📁 Type:</strong> ${item.announcement_type}</p>
          <p><strong>📍 Ward:</strong> ${item.ward_number}</p>
          <p><strong>📅 Valid Until:</strong> ${item.valid_until || "N/A"}</p>
          <p><strong>🗓 Created At:</strong> ${new Date(
            item.created_at
          ).toLocaleString()}</p>
          <p><strong>📝 Message:</strong> ${item.message || "No details"}</p>
          ${
            item.file_url
              ? `<p><a href="${item.file_url}" target="_blank" style="color:#008bf8; text-decoration: underline;">📂 View Attached File</a></p>`
              : ""
          }
        </div>
      `,
      confirmButtonText: "Close",
      width: "600px",
    });
  };

  // ✅ Handle doubt form submission
  const handleSubmitDoubt = async (e) => {
    e.preventDefault();
    if (!name || !email || !wardNumber || !doubt) {
      Swal.fire("Oops!", "All fields are required!", "warning");
      return;
    }

    try {
      await axios.post(
        "https://janprashna-backend.onrender.com/api/auth/doubts/submit/",
        {
          name,
          email,
          ward_number: wardNumber,
          doubt,
        },
        { withCredentials: true }
      );

      Swal.fire("Success!", "Your doubt was submitted successfully!", "success");

      // Reset form
      setName("");
      setEmail("");
      setWardNumber("");
      setDoubt("");
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error!",
        error.response?.data?.error || "Something went wrong!",
        "error"
      );
    }
  };

  return (
    <div className="announcements-page">
      <div className="layout-container">
        {/* ✅ Announcements Section */}
        <div className="announcements-section">
          <div className="heading1 flex items-center justify-center mb-6">
            <RiMegaphoneLine size={28} className="mr-2 " />
            Commercial Announcements
          </div>

          <ul className="announcements-list">
            {announcements.length > 0 ? (
              announcements.map((item) => (
                <li key={item.id} className="announcement-card">
                  <h3 className="announcement-title">{item.title}</h3>
                  <p className="announcement-date">
                    {item.valid_until || item.created_at}
                  </p>
                  <button
                    onClick={() => showDetails(item)}
                    className="view-btn"
                  >
                    View Details
                  </button>
                </li>
              ))
            ) : (
              <p className="empty-state">
                No commercial announcements available.
              </p>
            )}
          </ul>
        </div>

        {/* ✅ Doubt Form Section */}
        <div className="doubt-form">
          <div className="section-header">
            <MdHelpOutline size={28} className="icon" />
            <h2>Have a Doubt?</h2>
          </div>

          <form className="form" onSubmit={handleSubmitDoubt}>
            <input
              required
              className="input"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              className="input"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              className="input"
              type="number"
              placeholder="Ward No"
              value={wardNumber}
              onChange={(e) => setWardNumber(e.target.value)}
            />
            <textarea
              required
              className="input"
              placeholder="Your Question..."
              rows="4"
              value={doubt}
              onChange={(e) => setDoubt(e.target.value)}
            ></textarea>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
