import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";   // ✅ SweetAlert2
import "assets/styles/documents.css";

export default function DocumentsList() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wardNumber, setWardNumber] = useState("");
  const [doubt, setDoubt] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://janprashna-backend.onrender.com/api/auth/documents/")
      .then((res) => setDocuments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="page-wrapper">
      {/* Documents Section */}
      <div className="documents-section">
        <h2 className="announcements-heading">Documents</h2>
        <input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
        />
        <ul className="announcements-list">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc) => (
              <li key={doc.id} className="announcement-card hover-card">
                <span className="announcement-title">{doc.name}</span>
                <button
                  className="view-button"
                  onClick={() =>
                    history.push(`/admin/Documentation/${doc.id}`)
                  }
                >
                  View Details
                </button>
              </li>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No documents found.</p>
          )}
        </ul>
      </div>

      {/* Doubt Form Section */}
<div
  className="doubt-form-section"
  style={{ display: "flex", flexDirection: "column", gap: "15px" }}
>
  <h3>Have a Doubt?</h3>
  <form
    onSubmit={handleSubmitDoubt}
    style={{ display: "flex", flexDirection: "column", gap: "10px" }}
  >
    <input
      type="text"
      placeholder="Your Name"
      className="form-input"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
    <input
      type="email"
      placeholder="Your Email"
      className="form-input"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <input
      type="number"
      placeholder="Ward Number"
      className="form-input"
      value={wardNumber}
      onChange={(e) => setWardNumber(e.target.value)}
      required
    />
    <textarea
      placeholder="Your Doubt"
      className="form-input"
      rows="4"
      value={doubt}
      onChange={(e) => setDoubt(e.target.value)}
      required
    />
    <button type="submit" className="view-button" style={{ width: "100%" }}>
      Submit
    </button>
  </form>
</div>

    </div>
  );
}