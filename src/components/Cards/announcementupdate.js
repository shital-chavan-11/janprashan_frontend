 import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaClipboardList, FaTrash, FaEdit } from "react-icons/fa";
import { FaBullhorn, FaFileAlt } from "react-icons/fa";
import "./schmes/allschmes.css";

export default function AnnouncementPage() {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    announcement_type: "",
    ward_number: "",
    valid_until: "",
    file: null,
  });

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
const [filterType, setFilterType] = useState("");

  // ================= Form Handlers =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });

      const response = await fetch("https://janprashna-backend.onrender.com/api/auth/announcements/create/", {
        method: "POST",
        credentials: "include", // ✅ CookieJWTAuthentication
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire("Success", result.detail, "success");
        setFormData({
          title: "",
          message: "",
          announcement_type: "",
          ward_number: "",
          valid_until: "",
          file: null,
        });
        fetchAnnouncements();
      } else {
        Swal.fire("Error", result.detail || "Failed to create announcement", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
      console.error(error);
    }
  };

  // ================= Fetch Announcements =================
  const fetchAnnouncements = async () => {
  try {
    const response = await fetch("https://janprashna-backend.onrender.com/api/auth/announcements/get/", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch announcements");
    const data = await response.json();
    console.log("API response:", data);
    setAnnouncements(Array.isArray(data.announcements) ? data.announcements : []); // ✅ use data.announcements
  } catch (error) {
    console.error(error);
    setAnnouncements([]);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // ================= Delete =================
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the announcement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch(`https://janprashna-backend.onrender.com/api/auth/announcements/delete/${id}/`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        Swal.fire("Deleted!", "Announcement has been deleted.", "success");
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      } else {
        Swal.fire("Error", "Failed to delete announcement", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // ================= Update =================
  const handleUpdate = async (announcement) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Announcement",
      html: `
        <div class="cf-form">
        
         
          <div class="swal-field">
            <label for="swal-title">Title</label>
            <input id="swal-title" class="cf-input" value="${announcement.title || ""}">
          </div>
           
         
        <div class="swal-row">
          <div class="swal-field">
            <label for="swal-type">Type</label>
            <input id="swal-type" class="cf-input" value="${announcement.announcement_type || ""}">
          </div>
          <div class="swal-field">
            <label for="swal-ward">Ward Number</label>
            <input id="swal-ward" class="cf-input" value="${announcement.ward_number || ""}">
          </div>
          </div>
          <div class="swal-row">
          <div class="swal-field">
            <label for="swal-valid">Valid Until</label>
            <input id="swal-valid" type="date" class="cf-input" value="${announcement.valid_until || ""}">
          </div>
          <div class="swal-field">
            <label for="swal-file">File</label>
            <input id="swal-file" type="file" class="cf-input" />
          </div>
          </div>
          <div class="swal-field">
            <label for="swal-message">Message</label>
            <textarea id="swal-message" class="cf-input">${announcement.message || ""}</textarea>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        return {
          title: document.getElementById("swal-title").value,
          message: document.getElementById("swal-message").value,
          announcement_type: document.getElementById("swal-type").value,
          ward_number: document.getElementById("swal-ward").value,
          valid_until: document.getElementById("swal-valid").value,
          file: document.getElementById("swal-file").files[0] || null,
        };
      },
    });

    if (!formValues) return;

    try {
      const updateData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (value) updateData.append(key, value);
      });

      const response = await fetch(`https://janprashna-backend.onrender.com/api/auth/announcements/update/${announcement.id}/`, {
        method: "PUT",
        credentials: "include",
        body: updateData,
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire("Updated!", "Announcement updated successfully", "success");
        fetchAnnouncements();
      } else {
        Swal.fire("Error", result.detail || "Failed to update announcement", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // ================= Render =================
  return (
    <div className="mt-10 flex flex-col items-center">
      {/* ===== Announcement Creation Form ===== */}
      <div className="cf-form-container max-w-2xl w-full">
        <div className="heading1 flex items-center justify-center mb-6">
          <FaFileAlt size={25} className="mr-2 " />
          Create Announcement
        </div>
        <form onSubmit={handleSubmit} className="cf-form">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="cf-input"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="cf-input"
            required
          />
          <select
  name="announcement_type"
  value={formData.announcement_type}
  onChange={handleChange}
  className="cf-input"
  required
>
  <option value="">Select Type</option>
  <option value="welfare">Welfare</option>
  <option value="educational">Educational</option>
  <option value="other">Other</option>
  <option value="commercial">Commercial</option>
</select>

          <input
            type="text"
            name="ward_number"
            value={formData.ward_number}
            onChange={handleChange}
            placeholder="Ward Number"
            className="cf-input"
            required
          />
          <input
            type="date"
            name="valid_until"
            value={formData.valid_until}
            onChange={handleChange}
            className="cf-input"
          />
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="cf-input"
          />
          <button type="submit" className="cf-submit-btn mt-2">
            Create Announcement
          </button>
        </form>
      </div>

      {/* ===== Announcements Table ===== */}
      <div className="w-full mt-10">
        <div className="heading1 flex justify-center items-center mb-8">
          <FaBullhorn size={35} className="mr-2" />
          All Announcements
        </div>
        <div className="flex justify-end mb-4">
  <select
    value={filterType}
    onChange={(e) => setFilterType(e.target.value)}
    className="border px-3 py-1 rounded"
  >
    <option value="">All Types</option>
    <option value="welfare">Welfare</option>
    <option value="educational">Educational</option>
    <option value="other">Other</option>
    <option value="commercial">Commercial</option>
  </select>
</div>


        {loading ? (
          <p className="text-center">Loading announcements...</p>
        ) : announcements.length === 0 ? (
          <p className="text-center text-gray-600">No announcements found.</p>
        ) : (
          <table
            className="w-full border text-sm"
            style={{ boxShadow: "0 4px 16px rgba(23, 37, 84, 0.8)" }}
          >
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Ward</th>
                <th className="px-4 py-2 border">Valid Until</th>
                <th className="px-4 py-2 border">File</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
  {announcements
  .filter((ann) => (filterType ? ann.announcement_type === filterType : true))
  .map((ann, index) => (
    <tr key={ann.id} className="hover:bg-gray-50">
      <td className="px-4 py-2 border">{index + 1}</td>
      <td className="px-4 py-2 border">{ann.title}</td>
      <td className="px-4 py-2 border">{ann.message}</td>
      <td className="px-4 py-2 border">{ann.announcement_type}</td>
      <td className="px-4 py-2 border">{ann.ward_number}</td>
      <td className="px-4 py-2 border">{ann.valid_until || "-"}</td>
      <td className="px-4 py-2 border">
        {ann.file ? (
          <a
            href={`https://janprashna-backend.onrender.com${ann.file}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View
          </a>
        ) : (
          "-"
        )}
      </td>
      <td className="px-4 py-2 border flex gap-4">
        <button
          onClick={() => handleUpdate(ann)}
          className="text-blue-600 hover:text-blue-800 p-2 rounded"
        >
          <FaEdit size={15} />
        </button>
        <button
          onClick={() => handleDelete(ann.id)}
          className="text-red-600 hover:text-red-800 p-2 rounded"
        >
          <FaTrash size={15} />
        </button>
      </td>
    </tr>
  ))}

</tbody>

          </table>
        )}
      </div>
    </div>
  );
}
