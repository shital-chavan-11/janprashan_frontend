import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "assets/styles/DocumentDetail.css";

export default function DocumentDetail() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    axios
      .get(`https://janprashna-backend.onrender.com/api/auth/documents/${id}/`)
      .then((res) => setDocument(res.data))
      .catch((err) => console.error(err));
  }, [id]);
  

  if (!document)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
<div className="document-detail-wrapper">
    {/* Heading */}
    <h2>{document.name}</h2>

    <div className="document-detail-content">
      {/* Left Section */}
      <div className="left-section">
        {/* Required Documents */}
        {document.required_documents && (
          <div className="instruction-card">
            <p><strong>Required Documents:</strong></p>
            <ul>
              {document.required_documents.split("\n").map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Process Steps */}
        {document.process && (
          <div className="instruction-card">
            <p><strong>Process:</strong></p>
            <ol>
              {document.process.split("\n").map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Office Details */}
        <div className="office-details">
          <p><strong>Office Details:</strong></p>
          <p>Address: {document.office_address}</p>
          <p>Contact: {document.office_contact}</p>
          <p>Working Hours: {document.office_hours}</p>
        </div>

        {/* Document Image */}
        {document.image && (
          <div className="document-image">
            <img src={document.image} alt={document.name} />
          </div>
        )}
      </div>
    </div>

    {/* Back Button */}
    <div style={{ textAlign: "center" }}>
      <Link to="/admin/Documentation" className="back-button">
        ← Back to Documents
      </Link>
    </div>
  </div>
);
}