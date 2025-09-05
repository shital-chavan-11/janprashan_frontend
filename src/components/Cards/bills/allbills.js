import React, { useState, useEffect } from "react";
import "../../Cards/Education.css";
import { FaFileInvoice } from "react-icons/fa";
import { MdHelpOutline } from "react-icons/md";
import Swal from "sweetalert2";

export default function BillsPage() {
  const [selectedMonth, setSelectedMonth] = useState("2025-08");
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bills from backend
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await fetch("https://janprashna-backend.onrender.com/api/auth/bills/get/", {
          method: "GET",
          credentials: "include", // ✅ for CookieJWTAuthentication
          
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bills");
        }

        const data = await response.json();

        // Merge my_bills + ward_bills
        const allBills = [...data.my_bills, ...data.ward_bills];
        setBills(allBills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  // Filter bills by month
  const filteredBills = bills.filter((bill) =>
    bill.created_at?.startsWith(selectedMonth)
  );

const showBillDetails = (bill) => {
  if (!bill.bill_file) {
    Swal.fire({
      icon: "info",
      title: "No File Available",
      text: "This bill does not have an attached file.",
      confirmButtonText: "Close",
    });
    return;
  }

  // Ensure absolute URL
  const fileUrl = bill.bill_file.startsWith("http")
    ? bill.bill_file
    : `https://janprashna-backend.onrender.com${bill.bill_file}`;

  Swal.fire({
    title: `<strong>${bill.title}</strong>`,
    html: `
      ${
        fileUrl.endsWith(".pdf")
          ? `<iframe src="${fileUrl}" style="width:100%;height:500px;" frameborder="0"></iframe>`
          : `<img src="${fileUrl}" alt="Bill File" style="max-width:100%;max-height:500px;display:block;margin:auto;" />`
      }
    `,
    width: "800px",
    confirmButtonText: "Close",
  });
};

  return (
    <div className="min-h-screen bg-gray-100 pt-32">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-14">
        {/* Bills Section */}
        <div className="page-wrapper">
          <div className="announcements-container w-full md:w-[80%]">
            <div
              className="heading"
              style={{ display: "flex", alignItems: "center" }}
            >
              <FaFileInvoice size={30} style={{ marginRight: "8px" }} />
              Monthly Bills
            </div>

            {/* Month Selector */}
            <div className="mt-4 mb-6">
              <label className="mr-3 font-semibold">Select Month:</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border px-3 py-2 rounded-lg shadow-sm"
              />
            </div>

            {/* Bills List */}
            {loading ? (
              <p className="text-gray-500">Loading bills...</p>
            ) : filteredBills.length > 0 ? (
              <ul className="announcements-list">
                {filteredBills.map((bill) => (
                  <li key={bill.id} className="announcement-card">
                    <h3 className="announcement-title">{bill.title}</h3>
                    <p className="announcement-date">{bill.created_at}</p>
                    <p className="text-gray-700 font-semibold">
                      Amount: ₹{bill.amount}
                    </p>
                    <button
                      onClick={() => showBillDetails(bill)}
                      className="mt-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-black rounded-full shadow hover:scale-105 transition transform duration-200"
                    >
                      View Details
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-5">
                No bills available for this month.
              </p>
            )}
          </div>

          {/* Doubt Form Section */}
          <div className="container doubt-form-section w-full md:w-[10%]">
            <div
              className="heading"
              style={{ display: "flex", alignItems: "center" }}
            >
              <MdHelpOutline size={30} style={{ marginRight: "8px" }} />
              Have a Doubt?
            </div>

            <form className="form">
              <input required className="input" type="text" placeholder="Ward No" />
              <textarea
                required
                className="input"
                placeholder="Your Question..."
                style={{ height: "100px", resize: "none" }}
              ></textarea>
              <input className="login-button" type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
