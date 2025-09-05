import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import { FaClipboardList } from "react-icons/fa";

export default function SchemeForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    scheme_type: "",
    eligibility: "",
    benefits: "",
    required_documents: "",
    start_date: "",
    end_date: "",
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://janprashna-backend.onrender.com/api/auth/schemes/create/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire("Success", result.detail, "success");
        setFormData({
          title: "",
          description: "",
          scheme_type: "",
          eligibility: "",
          benefits: "",
          required_documents: "",
          start_date: "",
          end_date: "",
        });
      } else if (response.status === 403) {
        Swal.fire("Forbidden", "Only superusers can create schemes.", "error");
      } else {
        Swal.fire("Error", result.detail || "Failed to create scheme", "error");
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="complaints-container">
      {/* Scheme Form */}
      <div className="cf-form-container">
        <div className="heading" style={{ display: "flex", alignItems: "center" }}>
          <FaClipboardList size={30} style={{ marginRight: "8px" }} />
          Create Scheme
        </div>

        <form onSubmit={handleSubmit} className="cf-form">
  {/* Title + Description */}
  <div className="form-row">
    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleChange}
      placeholder="Scheme Title"
      className="cf-input"
      required
    />

    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      rows="2"
      placeholder="Scheme Description"
      className="cf-input"
      required
    />
  </div>

  {/* Scheme Type + Eligibility */}
  <div className="form-row">
    <input
      type="text"
      name="scheme_type"
      value={formData.scheme_type}
      onChange={handleChange}
      placeholder="Scheme Type (e.g., Education, Health)"
      className="cf-input"
      required
    />

    <textarea
      name="eligibility"
      value={formData.eligibility}
      onChange={handleChange}
      rows="2"
      placeholder="Eligibility Criteria"
      className="cf-input"
    />
  </div>

  {/* Benefits + Documents */}
  <div className="form-row">
    <textarea
      name="benefits"
      value={formData.benefits}
      onChange={handleChange}
      rows="2"
      placeholder="Benefits"
      className="cf-input"
    />

    <textarea
      name="required_documents"
      value={formData.required_documents}
      onChange={handleChange}
      rows="2"
      placeholder="Required Documents"
      className="cf-input"
    />
  </div>

  {/* Start Date + End Date */}
  <div className="form-row">
    <input
      type="date"
      name="start_date"
      value={formData.start_date}
      onChange={handleChange}
      className="cf-input"
    />

    <input
      type="date"
      name="end_date"
      value={formData.end_date}
      onChange={handleChange}
      className="cf-input"
    />
  </div>

  <input type="submit" value="Create Scheme" className="cf-submit-btn" />
</form>

      </div>
    </div>
  );
}
