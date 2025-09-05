import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import defaultAvatar from "../assets/img/vue.jpg"; // default profile image
import "../assets/styles/ProfileEdit.css";
import { useHistory } from "react-router-dom";

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    gender: "",
    ward_number: "",
    home_number: "",
    live_location: "",
  });

  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://janprashna-backend.onrender.com/api/auth/profile/", { withCredentials: true })
      .then((res) => setProfile(res.data))
      .catch(() => Swal.fire("Error", "Failed to fetch profile", "error"));
  }, []);

  // Determine redirection path based on user role
  const redirectToDashboard = () => {
    const isSuperUser = localStorage.getItem("is_superuser") === "true";
    history.push(isSuperUser ? "/admin/admindashboard" : "/admin/dashboard");
  };

  const handleUpdateProfile = async () => {
    try {
      const payload = { ...profile };
      if (newEmail && newEmail !== profile.email) payload.email = newEmail;

      const res = await axios.put(
        "https://janprashna-backend.onrender.com/api/auth/profile/update/",
        payload,
        { withCredentials: true }
      );

      Swal.fire("Success", res.data.message || "Profile updated", "success").then(() => {
        if (res.data.message?.includes("OTP sent")) {
          setIsOtpSent(true);
        } else {
          setProfile(res.data);
          setNewEmail("");
          setOtp("");
          setIsOtpSent(false);
          redirectToDashboard(); // ✅ Redirect after successful update
        }
      });

    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Something went wrong",
        "error"
      );
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        "https://janprashna-backend.onrender.com/api/auth/profile/verify-email-otp/",
        { otp },
        { withCredentials: true }
      );

      Swal.fire("Success", res.data.message, "success").then(() => {
        setProfile({ ...profile, email: newEmail });
        setNewEmail("");
        setOtp("");
        setIsOtpSent(false);
        redirectToDashboard(); // ✅ Redirect after OTP verification
      });

    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Invalid OTP",
        "error"
      );
    }
  };

  return (
    <div className="container-profile-edit">
      <div className="profile-edit-card">
        {/* Profile Image */}
        <div className="profile-image-wrapper">
          <img
            src={profile.avatar || defaultAvatar}
            alt="Profile"
            className="profile-image"
          />
        </div>

        <h2 className="profile-edit-title">Edit Profile</h2>

        <div className="profile-edit-form">
          <input
            type="text"
            placeholder="Full Name"
            value={profile.full_name}
            onChange={(e) =>
              setProfile({ ...profile, full_name: e.target.value })
            }
            className="input-edit"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={profile.mobile_number}
            onChange={(e) =>
              setProfile({ ...profile, mobile_number: e.target.value })
            }
            className="input-edit"
          />
          <select
            value={profile.gender}
            onChange={(e) =>
              setProfile({ ...profile, gender: e.target.value })
            }
            className="input-edit"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Ward Number"
            value={profile.ward_number}
            onChange={(e) =>
              setProfile({ ...profile, ward_number: e.target.value })
            }
            className="input-edit"
          />
          <input
            type="text"
            placeholder="Home Number"
            value={profile.home_number}
            onChange={(e) =>
              setProfile({ ...profile, home_number: e.target.value })
            }
            className="input-edit"
          />
          <input
            type="text"
            placeholder="Live Location"
            value={profile.live_location}
            onChange={(e) =>
              setProfile({ ...profile, live_location: e.target.value })
            }
            className="input-edit"
          />
          {!isOtpSent ? (
            <input
              type="email"
              placeholder="New Email (optional)"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="input-edit"
            />
          ) : (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input-edit"
            />
          )}

          {!isOtpSent ? (
            <button onClick={handleUpdateProfile} className="button-edit">
              Update Profile
            </button>
          ) : (
            <button onClick={handleVerifyOtp} className="button-verify">
              Verify OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;