import React, { useState, useEffect } from "react";
import "./allschmes.css";
import Swal from "sweetalert2";
import { Lightbulb } from "lucide-react";

export default function AllSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");

  const SCHEME_TYPES = [
    "all",
    "Education",
    "Health",
    "Agriculture",
    "Employment",
    "Housing",
    "Other",
  ];

  useEffect(() => {
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
    fetchSchemes();
  }, []);

  const showSchemeDetails = (scheme) => {
    Swal.fire({
      title: `<strong>${scheme.title}</strong>`,
      html: `
        <p><b>Type:</b> ${scheme.scheme_type}</p>
        <p><b>Eligibility:</b> ${scheme.eligibility}</p>
        <p><b>Benefits:</b> ${scheme.benefits}</p>
        <p><b>Required Documents:</b> ${scheme.required_documents}</p>
        <p><b>Valid From:</b> ${scheme.start_date} - ${scheme.end_date || "Ongoing"}</p>
        <p><b>Description:</b> ${scheme.description}</p>
      `,
      confirmButtonText: "Close",
      width: "600px",
    });
  };

  const filteredSchemes =
    filterType === "all"
      ? schemes
      : schemes.filter((scheme) => scheme.scheme_type === filterType);

  // ==================== Render ====================
  return (
    <div className="mt-16">
      {/* ===== Heading ===== */}
     <div className="heading1 flex items-center justify-center text-2xl">
             <Lightbulb size={30} className="mr-2" />
            All Schemes
           </div>
      {/* ===== Filter Dropdown ===== */}
      <div className="flex justify-end mb-8">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {SCHEME_TYPES.map((type, index) => (
            <option key={index} value={type}>
              {type === "all" ? "All Types" : type}
            </option>
          ))}
        </select>
      </div>

      {/* ===== Scheme Cards ===== */}
      <div className="schemes-grid">
        {loading ? (
          <p>Loading schemes...</p>
        ) : filteredSchemes.length === 0 ? (
          <p>No schemes found for this category.</p>
        ) : (
          filteredSchemes.map((scheme, index) => (
            <div
              key={scheme.id}
              className="card cursor-pointer"
              onClick={() => showSchemeDetails(scheme)}
            >
              <div className="number">
                <p className="text">{String(index + 1).padStart(2, "0")}</p>
              </div>
              <div className="icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 
                  10-10S17.52 2 12 2zm0 18c-4.41 
                  0-8-3.59-8-8s3.59-8 8-8 
                  8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </div>
              <p className="heading">{scheme.title}</p>
              <p className="content">{scheme.scheme_type}</p>
              <p className="content">
                {scheme.start_date} - {scheme.end_date || "Ongoing"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
