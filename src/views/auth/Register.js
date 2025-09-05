import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./styles/register.css";
import img1 from "../../assets/gif/sign up.mp4"; // 👈 same as login video/image

export default function Register() {
  const history = useHistory();

  const [form, setForm] = useState({
    full_name: "",
    gender: "",
    mobile_number: "",
    email: "",
    home_number: "",
    ward_number: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm_password) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    try {
      const response = await fetch("https://janprashna-backend.onrender.com/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
if (response.ok) {
  Swal.fire({
    title: "Success",
    text: data.message || "Registration successful",
    icon: "success",
    confirmButtonColor: "#1089d3", // 👈 blue button
  }).then(() => {
    localStorage.setItem("otp_email", form.email);
    history.push({
      pathname: "/auth/otp-verification",
      state: { email: form.email },
    });
  });
} else {
  const firstError = Object.values(data)[0];
  Swal.fire({
    title: "Error",
    text: firstError || "Registration failed",
    icon: "error",
    confirmButtonColor: "#1089d3", // 👈 blue button
  });
}
} catch (error) {
  console.error("Registration error:", error);
  Swal.fire({
    title: "Error",
    text: "Something went wrong!",
    icon: "error",
    confirmButtonColor: "#1089d3", // 👈 blue button
  });
}
  };

  return (
    <div className="login-wrapper">
      {/* LEFT: Form */}
      <div className="login-left">
        <div className="container1">
          <div className="heading">Register</div>

          <form className="form" onSubmit={handleRegister}>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
              className="input"
              placeholder="Full Name"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="input"
              placeholder="Email"
            />

            <div className="input-row">
              <input
                type="text"
                name="mobile_number"
                value={form.mobile_number}
                onChange={handleChange}
                required
                className="input"
                placeholder="Mobile Number"
              />
                <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="input select-input"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>


            </div>

            <div className="input-row">
              <input
                type="text"
                name="home_number"
                value={form.home_number}
                onChange={handleChange}
                required
                className="input"
                placeholder="Home Number"
              />
              <input
                type="text"
                name="ward_number"
                value={form.ward_number}
                onChange={handleChange}
                required
                className="input"
                placeholder="Ward Number"
              />
            </div>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="input"
              placeholder="Password"
            />

            <input
              type="password"
              name="confirm_password"
              value={form.confirm_password}
              onChange={handleChange}
              required
              className="input"
              placeholder="Confirm Password"
            />

            <button type="submit" className="login-button mb-4">
              Create Account
            </button>
          </form>

          <span className="agreement">
            Already have an account? <Link to="/auth/login">Sign In</Link>
          </span>
        </div>
      </div>

      {/* RIGHT: Video/Image */}
      <div className="login-right">
        <video
          src={img1}
          autoPlay
          loop
          muted
          playsInline
          className="video-bg"
        />
      </div>
    </div>
  );
}