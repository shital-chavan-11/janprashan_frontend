import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "assets/styles/ComplaintForm.css";
import { FaFileAlt } from "react-icons/fa";
import file from "assets/gif/file.mp4";

export default function AdminDocumentForm() {
  const [formData, setFormData] = useState({
    name: "",
    required_documents: "",
    process: "",
    office_address: "",
    office_contact: "",
    office_hours: "",
  });
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      const response = await axios.post(
        "https://janprashna-backend.onrender.com/api/auth/add-document/",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      Swal.fire("Success", response.data.message, "success");

      setFormData({
        name: "",
        required_documents: "",
        process: "",
        office_address: "",
        office_contact: "",
        office_hours: "",
      });
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      if (error.response?.status === 401) {
        Swal.fire("Unauthorized", "You are not logged in as superuser.", "error");
      } else {
        Swal.fire("Error", error.response?.data?.error || "Submission failed", "error");
      }
    }
  };

  return (
    <div className="cf-wrapper">
      {/* Left: Form */}
      <div className="cf-form-container flex flex-col justify-center p-8">
        <div className="heading1 flex items-center justify-center mb-6">
          <FaFileAlt size={25} className="mr-2" />
          Add New Document
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="cf-form">
          {/* Full width fields */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Document Name"
            className="cf-input"
            required
          />

          <textarea
            name="required_documents"
            value={formData.required_documents}
            onChange={handleChange}
            rows="3"
            placeholder="Required Documents (comma-separated)"
            className="cf-input"
            required
          />

          <textarea
            name="process"
            value={formData.process}
            onChange={handleChange}
            rows="3"
            placeholder="Process"
            className="cf-input"
            required
          />

          {/* Row: address + contact */}
          <div className="cf-row">
            <input
              type="text"
              name="office_address"
              value={formData.office_address}
              onChange={handleChange}
              placeholder="Office Address"
              className="cf-input half"
              required
            />

            <input
              type="text"
              name="office_contact"
              value={formData.office_contact}
              onChange={handleChange}
              placeholder="Office Contact"
              className="cf-input half"
              required
            />
          </div>

          {/* Row: hours + file */}
          <div className="cf-row">
            <input
              type="text"
              name="office_hours"
              value={formData.office_hours}
              onChange={handleChange}
              placeholder="Office Hours (e.g., Mon-Fri, 9 AM - 5 PM)"
              className="cf-input half"
              required
            />

            <input
              type="file"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="cf-input half"
            />
          </div>

          <input type="submit" value="Add Document" className="cf-submit-btn" />
        </form>
      </div>

      {/* Right: MP4 Video */}
      <div className="cf-video-container">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover rounded-none">
          <source src={file} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
