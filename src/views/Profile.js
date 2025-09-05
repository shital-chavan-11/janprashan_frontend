import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import defaultAvatar from "../assets/img/pic1.jpg";
import "../assets/styles/Profile.css";

const ProfileView = () => {
  const [profile, setProfile] = useState({});
  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://janprashna-backend.onrender.com/api/auth/profile/", { withCredentials: true })
      .then((res) => setProfile(res.data))
      .catch(() => Swal.fire("Error", "Failed to fetch profile", "error"));
  }, []);

  const handleEdit = () => {
    history.push("/admin/Profile/edit");
  };

  return (
    <div className="profile-layout">
      {/* LEFT SIDE PROFILE */}
      <div className="container-profile">
        <div className="profile-card">
          <h2 className="profile-name">{profile.full_name || "User Name"}</h2>
          <p className="profile-email">{profile.email || "user@example.com"}</p>

          {/* IMAGE BELOW NAME/EMAIL */}
          <div className="profile-image-wrapper">
            <img
              src={profile.avatar || defaultAvatar}
              alt="Profile"
              className="profile-image"
            />
          </div>

          <div className="profile-details">
            <div className="profile-row">
              <span>Mobile Number</span>
              <span>{profile.mobile_number || "-"}</span>
            </div>
            <div className="profile-row">
              <span>Gender</span>
              <span>{profile.gender || "-"}</span>
            </div>
            <div className="profile-row">
              <span>Ward Number</span>
              <span>{profile.ward_number || "-"}</span>
            </div>
            <div className="profile-row">
              <span>Home Number</span>
              <span>{profile.home_number || "-"}</span>
            </div>
            <div className="profile-row">
              <span>Live Location</span>
              <span>{profile.live_location || "-"}</span>
            </div>
          </div>

          <button className="edit-button" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* RIGHT SIDE INSTRUCTIONS */}
      <div className="instructions-box">
        <h2>Instructions</h2>
        <p>
          Here you can view your profile details on the left.  
          Use the <b>Edit Profile</b> button to update your information.  
          On this page you will also see guidelines or other instructions.
        </p>
        <ul>
          <li>Keep your profile updated.</li>
          <li>Ensure your email is verified.</li>
          <li>Contact support if you face issues.</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileView;