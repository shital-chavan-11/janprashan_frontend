import React, { useState,useEffect } from "react";
import Swal from "sweetalert2";
import { FaClipboardList, FaTrash, FaEdit } from "react-icons/fa";
import { Lightbulb } from "lucide-react";
import { FaFileAlt } from "react-icons/fa";
import "./allschmes.css"; // Make sure your CSS is imported
 import TruncatedText from "./TruncatedText"
export default function SchemePage() {
  // ==================== Form State ====================
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://janprashna-backend.onrender.com/api/auth/schemes/create/",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
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

  // ==================== Schemes State ====================
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
 const [editingRow, setEditingRow] = useState(null);
const [editFormData, setEditFormData] = useState({});

 

  const SCHEME_TYPES = [
    "all",
    "Education",
    "Health",
    "Agriculture",
    "Employment",
    "Housing",
    "Other",
  ];

   
    const fetchSchemes = async () => {
      try {
        const response = await fetch(
          "https://janprashna-backend.onrender.com/api/auth/schemes/get/",
          { method: "GET", credentials: "include" }
        );
        if (!response.ok) throw new Error("Failed to fetch schemes");
        const data = await response.json();
        setSchemes(data);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchSchemes();
    }, []);
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the scheme!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch(
        `https://janprashna-backend.onrender.com/api/auth/schemes/delete/${id}/`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        Swal.fire("Deleted!", "Scheme has been deleted.", "success");
        setSchemes((prev) => prev.filter((s) => s.id !== id));
      } else {
        Swal.fire("Error", "Failed to delete scheme", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

 const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleEditClick = (scheme) => {
  Swal.fire({
    title: "Edit Scheme",
    html: `
      <div class="swal-container">

        <div class="swal-row">
          <div class="swal-field">
            <label for="swal-title" className="text-2xl">Title</label>
            <input id="swal-title" class="cf-input" value="${scheme.title || ""}">
          </div>
          <div class="swal-field">
            <label for="swal-type">Type</label>
            <input id="swal-type" class="cf-input" value="${scheme.scheme_type || ""}">
          </div>
        </div>

        <div class="swal-row">
          <div class="swal-field">
            <label for="swal-start">Start Date</label>
            <input id="swal-start" type="date" class="cf-input" value="${scheme.start_date || ""}">
          </div>
          <div class="swal-field">
            <label for="swal-end">End Date</label>
            <input id="swal-end" type="date" class="cf-input" value="${scheme.end_date || ""}">
          </div>
        </div>
 <div class="swal-row">
        <div class="swal-field">
          <label for="swal-eligibility">Eligibility</label>
          <textarea id="swal-eligibility" class="cf-input">${scheme.eligibility || ""}</textarea>
        </div>

        <div class="swal-field">
          <label for="swal-benefits">Benefits</label>
          <textarea id="swal-benefits" class="cf-input">${scheme.benefits || ""}</textarea>
        </div>
</div>
 <div class="swal-row">
        <div class="swal-field">
          <label for="swal-documents">Required Documents</label>
          <textarea id="swal-documents" class="cf-input">${scheme.required_documents || ""}</textarea>
        </div>

        <div class="swal-field">
          <label for="swal-description">Description</label>
          <textarea id="swal-description" class="cf-input">${scheme.description || ""}</textarea>
        </div>
</div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Save",
    customClass: {
      popup: "swal-custom-popup",
      confirmButton: "swal-save-btn",
      cancelButton: "swal-cancel-btn",
    },
    preConfirm: () => {
      return {
        title: document.getElementById("swal-title").value,
        scheme_type: document.getElementById("swal-type").value,
        eligibility: document.getElementById("swal-eligibility").value,
        benefits: document.getElementById("swal-benefits").value,
        required_documents: document.getElementById("swal-documents").value,
        start_date: document.getElementById("swal-start").value,
        end_date: document.getElementById("swal-end").value,
        description: document.getElementById("swal-description").value,
      };
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://janprashna-backend.onrender.com/api/auth/schemes/update/${scheme.id}/`,
          {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result.value),
          }
        );

        if (!response.ok) throw new Error("Update failed");

        Swal.fire("Updated!", "Scheme updated successfully", "success");
        fetchSchemes();
      } catch (err) {
        Swal.fire("Error", "Failed to update scheme", "error");
      }
    }
  });
};


 


  const filteredSchemes =
    filterType === "all"
      ? schemes
      : schemes.filter((scheme) => scheme.scheme_type === filterType);

  // ==================== Render ====================
  return (
    <div className="mt-10 flex flex-col items-center">
      {/* ===== Form + Video Side by Side ===== */}
      <div className="cf-form-container max-w-2xl w-full">
        {/* Left: Scheme Form */}
  
          <div
            className="heading1 flex items-center justify-center p-8"
          >
            <FaFileAlt size={30} className="mr-2" />
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
                placeholder="Scheme Type"
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

            {/* Benefits + Required Documents */}
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
      {/* ===== Schemes List Below ===== */}
      
      {/* ===== Schemes List Below ===== */}
<div className="w-full">
  <div className="heading1 flex justify-center items-center p-4 mt-12">
    <Lightbulb size={35} className="mr-2" />
    All Schemes
  </div>

  {/* Filter Dropdown */}
  <div className="flex justify-end mb-5">
    <select
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
      className="border border-gray-700 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {SCHEME_TYPES.map((type, index) => (
        <option key={index} value={type}>
          {type === "all" ? "All Types" : type}
        </option>
      ))}
    </select>
  </div>

   {loading ? (
  <p>Loading schemes...</p>
) : filteredSchemes.length === 0 ? (
  <p className="text-center text-gray-600">
    No schemes found for this category.
  </p>
) : (
  <div
    className="overflow-x-auto shadow-lg rounded-lg border border-gray-200"
    style={{ boxShadow: "0 4px 16px rgba(23, 37, 84, 0.8)" }}
  >

            <table className="min-w-full bg-white text-sm border border-gray-400">
              <thead>
                <tr className=" text-gray-700 uppercase border border-gray-700"> 
                  <th className="px-4 py-3 border border-gray-400"  >no</th>
                  <th className="px-4 py-3 border border-gray-400"  >Title</th>
                  <th className="px-4 py-3 border border-gray-400"  >Type</th>
                  <th className="px-4 py-3 border border-gray-400"  >Eligibility</th>
                  <th className="px-4 py-3 border border-gray-400"  >Benefits</th>
                  <th className="px-4 py-3 border border-gray-400"  >Documents</th>
                  <th className="px-4 py-3 border border-gray-400"  >Start Date</th>
                  <th className="px-4 py-3 border border-gray-400"  >End Date</th>
                  <th className="px-4 py-3 border border-gray-400"  >Description</th>
                  <th className="px-4 py-3 border border-gray-400"  >Actions</th>
                </tr>
              </thead>
   <tbody className="divide-y divide-gray-200">
  {filteredSchemes.map((scheme, index) => (
    <tr key={scheme.id} className="scheme-row">
      <td className="px-4 py-3 border border-gray-400" >{index + 1}</td>

      {[
        "title",
        "scheme_type",
        "eligibility",
        "benefits",
        "required_documents",
        "start_date",
        "end_date",
        "description",
      ].map((field) => (
        <td key={field} className="px-4 py-3 border border-gray-400 max-w-[200px]">
          <TruncatedText text={scheme[field] || "-"} limit={30} />
        </td>
      ))}

      <td className="px-4 py-3 border border-gray-400 flex gap-4">
  {/* Edit Button (icon only, no background) */}
  <button
    onClick={() => handleEditClick(scheme)}
    className="text-blue-600 hover:text-blue-800 p-2 rounded"
  >
    <FaEdit size={15} />
  </button>

  {/* Delete Button (icon only, no background) */}
  <button
    onClick={() => handleDelete(scheme.id)}
    className="text-red-600 hover:text-red-800 p-2 rounded"
  >
    <FaTrash size={15} />
  </button>
</td>

    </tr>
  ))}
</tbody>


      </table>
    </div>
  )}
</div>

    </div>
  );
}
