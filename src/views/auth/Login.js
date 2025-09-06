import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "./styles/Login.css"; // 👈 custom CSS

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://janprashna-backend.onrender.com/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("is_superuser", data.is_superuser ? "true" : "false");
        localStorage.setItem("is_staff", data.is_staff ? "true" : "false");
        localStorage.setItem("isLoggedIn", "true");
Swal.fire({
    title: "Success",
    text: data.message || "Login successful!",
    icon: "success",
    confirmButtonColor: "#1089d3", // 👈 blue confirm button
  }).then(() => {
    if (data.is_superuser || data.is_staff) {
      history.push("/admin/admindashboard");
    } else {
      history.push("/admin/dashboard");
    }
  });
} else {
  Swal.fire({
    title: "Error",
    text: data.error || data.detail || "Invalid credentials",
    icon: "error",
    confirmButtonColor: "#1089d3", // 👈 also blue for error alerts
  });
}
} catch (err) {
  console.error("Login error:", err);
  Swal.fire({
    title: "Error",
    text: "Something went wrong!",
    icon: "error",
    confirmButtonColor: "#1089d3", // 👈 blue button here too
  });
}
  };

  return (
    <div className="login-wrapper">
      {/* LEFT: Form */}
      <div className="login-left">
        <div className="login-container">
          <div className="login-heading">Log In</div>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />

            <div className="forgot-section">
              <Link to="/auth/forget">Forgot Password ?</Link>
            </div>

            <input className="login-button" type="submit" value="Log in" />
          </form>

          <span className="agreement">
            Don’t have an account? <Link to="/auth/register">Create one</Link>
          </span>
        </div>
      </div>

      {/* RIGHT: Video */}
      <div className="login-right">
        <video
          src={require("../../assets/gif/log.mp4")}
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

export default Login;