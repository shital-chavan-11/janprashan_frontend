import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "assets/styles/ComplaintForm.css";
import {FaEnvelopeOpenText} from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    ward_number: "",
    live_location: "",
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
      const response = await fetch(
        "https://janprashna-backend.onrender.com/api/auth/complaints/submit/",
        {
          method: "POST",
          credentials: "include",
          body: data,
        }
      );

      const result = await response.json();

      if (response.ok) {
        Swal.fire("Success", result.message, "success");
        setFormData({
          category: "",
          description: "",
          ward_number: "",
          live_location: "",
        });
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else if (response.status === 401) {
        Swal.fire(
          "Unauthorized",
          "You are not logged in. Please login first.",
          "error"
        );
      } else {
        Swal.fire("Error", result.error || "Submission failed", "error");
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="complaints-container">
      {/* Complaint Form */}
      <div className="cf-form-container_com">
        <div className="heading1" style={{ display: "flex", alignItems: "center",justifyContent:"center"}}>
                      <FaEnvelopeOpenText size={20} style={{ marginRight: "8px" }} />
                      Submit Complaint
                    </div>
         
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="cf-form">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="cf-input"
          >
            <option value="">-- Select Category --</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Garbage">Garbage</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Description"
            className="cf-input"
            required
          />

          <input
            type="number"
            name="ward_number"
            value={formData.ward_number}
            onChange={handleChange}
            placeholder="Ward Number"
            className="cf-input"
            required
          />

          <input
            type="file"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="cf-input"
          />

       <input
  type="text"
  name="live_location"   // ✅ correct name
  value={formData.live_location}
  onChange={handleChange}
  placeholder="Enter Live Location (e.g., Street/Area)"
  className="cf-input"
  required
/>

          <input
            type="submit"
            value="Submit Complaint"
            className="cf-submit-btn"
          />
        </form>
      </div>

      {/* Instructions */}
      <div className="cf-instructions-container">
     <div className="heading1" style={{ display: "flex", alignItems: "center" ,justifyContent:"center"}}>
                   <FaClipboardList size={20} style={{ marginRight: "8px" }} />
                   Instructions
                 </div>
        <p>Please follow these steps before submitting your complaint</p>
        <hr />
        <ul>
          <li>Select the correct <strong>complaint category</strong>.</li>
          <li>Describe your <strong>issue clearly and concisely</strong>.</li>
          <li>Provide an <strong>accurate ward number</strong>.</li>
          <li>Upload an <strong>image</strong> if available.</li>
          <li>Enable <strong>location access</strong>.</li>
          <li>Ensure all information is <strong>up-to-date</strong>.</li>
          <li>Check your complaint <strong>details carefully</strong>.</li>
        </ul>
      </div>
    </div>
  );
}