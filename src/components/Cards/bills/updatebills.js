import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaClipboardList, FaTrash, FaEdit } from "react-icons/fa";
import "./../schmes/allschmes.css"; // Make sure your CSS is imported
import { FaFileAlt } from "react-icons/fa";
export default function BillPage() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    ward_number: "",
    user_id: "",
    bill_file: null,
  });

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

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

      const response = await fetch("https://janprashna-backend.onrender.com/api/auth/bills/create/", {
        method: "POST",
        credentials: "include",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire("Success", result.detail, "success");
        setFormData({
          title: "",
          amount: "",
          ward_number: "",
          user_id: "",
          bill_file: null,
        });
        fetchBills();
      } else {
        Swal.fire("Error", result.detail || "Failed to create bill", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
      console.error(error);
    }
  };

  // ================= Fetch Bills =================
  const fetchBills = async () => {
    try {
      const response = await fetch("https://janprashna-backend.onrender.com/api/auth/all-ward-bills/", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch bills");
      const data = await response.json();
      setBills(data.all_bills || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // ================= Delete Bill =================
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the bill!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch(`https://janprashna-backend.onrender.com/api/auth/bills/delete/${id}/`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        Swal.fire("Deleted!", "Bill has been deleted.", "success");
        setBills((prev) => prev.filter((b) => b.id !== id));
      } else {
        Swal.fire("Error", "Failed to delete bill", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

const handleUpdate = async (bill) => {
  // Ask user for updated details
  const { value: formValues } = await Swal.fire({
    title: "Update Bill",
    html: `
    <div class="cf-form-container_bills">

        <div class="swal-row">
          <div class="swal-field">
            <label for="swal-title">Title</label>
            <input id="swal-title" class="cf-input" value="${bill.title || ""}">
          </div>
          <div class="swal-field">
            <label for="swal-type">Amount</label>
            <input id="swal-type" class="cf-input" value="${bill.amount || ""}">
          </div>
        </div>

        <div class="swal-row">
          <div class="swal-field">
            <label for="swal-start">Ward Number</label>
            <input id="swal-start" type="text" class="cf-input" value="${bill.ward_number || ""}">
          </div>
          <div class="swal-field">
            <label for="swal-end">File</label>
            <input id="swal-end" type="file" class="cf-input" value="${bill.end_date || ""}">
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
        amount: document.getElementById("swal-amount").value,
        ward_number: document.getElementById("swal-ward").value,
        bill_file: document.getElementById("swal-file").files[0] || null,
      };
    },
    showCancelButton: true,
  });

  if (!formValues) return; // cancelled

  try {
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("amount", formValues.amount);
    formData.append("ward_number", formValues.ward_number);
    if (formValues.bill_file) {
      formData.append("bill_file", formValues.bill_file);
    }

    const response = await fetch(
      `https://janprashna-backend.onrender.com/api/auth/bills/update/${bill.id}/`,
      {
        method: "PUT",
        credentials: "include",
        body: formData,
      }
    );

    const result = await response.json();
    if (response.ok) {
      Swal.fire("Updated!", "Bill updated successfully", "success");
      fetchBills(); // refresh UI
    } else {
      Swal.fire("Error", result.detail || "Failed to update bill", "error");
    }
  } catch (err) {
    Swal.fire("Error", "Something went wrong", "error");
  }
};


  // ================= Render =================
  return (
  <div className="mt-10 flex flex-col items-center">
    {/* ===== Bill Creation Form ===== */}
    <div className="cf-form-container max-w-2xl w-full">
      <div className="w-full max-w-2xl p-6">
        <div
                    className="heading1 flex items-center justify-center"
                  >
                    <FaClipboardList size={30} className="mr-2" />
                    Bills
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
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="cf-input"
            required
          />
          <input
            type="text"
            name="ward_number"
            value={formData.ward_number}
            onChange={handleChange}
            placeholder="Ward Number"
            className="cf-input"
          />
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            placeholder="User ID"
            className="cf-input"
          />
          <input
            type="file"
            name="bill_file"
            onChange={handleChange}
            className="cf-input"
          />
          <button type="submit" className="cf-submit-btn mt-2">Create Bill</button>
        </form>
      </div>
    </div>

    {/* ===== Bills Table ===== */}
    <div className="w-full">
<div className="heading1 flex justify-center items-center p-8">
    <FaFileAlt size={35} className="mr-2" />
    All Bills
  </div>

      {loading ? (
        <p className="text-center">Loading bills...</p>
      ) : bills.length === 0 ? (
        <p className="text-center text-gray-600">No bills found.</p>
      ) : (
        <table className="w-full border text-sm"  style={{ boxShadow: "0 4px 16px rgba(23, 37, 84, 0.8)" }}     
>
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border"     
>No</th>
              <th className="px-4 py-2 border"    >Title</th>
              <th className="px-4 py-2 border"    >Amount</th>
              <th className="px-4 py-2 border"    >Ward</th>
              <th className="px-4 py-2 border"    >User</th>
              <th className="px-4 py-2 border"    >File</th>
              <th className="px-4 py-2 border"     
>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={bill.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border" >{index + 1}</td>
                <td className="px-4 py-2 border" >{bill.title}</td>
                <td className="px-4 py-2 border" >₹{bill.amount}</td>
                <td className="px-4 py-2 border" >{bill.ward_number || "-"}</td>
                <td className="px-4 py-2 border" >{bill.user_name || "-"}</td>
                <td className="px-4 py-2 border" >
                  {bill.bill_file ? (
                    <a
  href={`https://janprashna-backend.onrender.com${bill.bill_file}`}
  rel="noopener noreferrer"
  className="text-blue-600 hover:underline"
>
  View
</a>

                  ) : (
                    "-"
                  )}
                </td>
 <td className="px-4 py-3 border border-gray-400 flex gap-4"  >
  {/* Edit Button (icon only, no background) */}
  <button
    onClick={() => handleUpdate(bill)}
    className="text-blue-600 hover:text-blue-800 p-2 rounded"
  >
    <FaEdit size={15} />
  </button>

  {/* Delete Button (icon only, no background) */}
  <button
    onClick={() => handleDelete(bill.id)}
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
