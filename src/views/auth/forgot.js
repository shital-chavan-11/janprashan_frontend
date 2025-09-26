import React, { useState } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom"; //  
import "./styles/Login.css"; // 👈 custom CSS
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory(); // ✅ initialize history

  // Step 1: Request OTP
  const handleRequestOTP = async () => {
    try {
      const res = await axios.post(
        "https://janprashna-backend.onrender.com/api/auth/forgot-password-request/",
        { email }
      );

      Swal.fire({
        title: "Success",
        text: res.data.message,
        icon: "success",
        confirmButtonColor: "#1089d3",
      }).then(() => setStep(2));
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.error || "Error requesting OTP",
        icon: "error",
        confirmButtonColor: "#1089d3",
      });
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async () => {
    try {
      const res = await axios.post(
        "https://janprashna-backend.onrender.com/api/auth/forgot-password-verify-otp/",
        { email, otp }
      );

      Swal.fire({
        title: "Success",
        text: res.data.message,
        icon: "success",
        confirmButtonColor: "#1089d3",
      }).then(() => setStep(3));
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.error || "Error verifying OTP",
        icon: "error",
        confirmButtonColor: "#1089d3",
      });
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match!",
        icon: "error",
        confirmButtonColor: "#1089d3",
      });
      return;
    }

    try {
      const res = await axios.post(
        "https://janprashna-backend.onrender.com/api/auth/forgot-password-reset/",
        { email, new_password: newPassword, confirm_password: confirmPassword }
      );

      Swal.fire({
        title: "Success",
        text: res.data.message,
        icon: "success",
        confirmButtonColor: "#1089d3",
      }).then(() => {
        history.push("/auth/login"); // ✅ redirect to login page
      });
      
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.error || "Error resetting password",
        icon: "error",
        confirmButtonColor: "#1089d3",
      });
    }
  };

  return (
    <div className="login-wrapper">
      {/* LEFT: Form */}
      <div className="login-left">
        <div className="login-container">
          <div className="login-heading">
            {step === 1 && "Forgot Password"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Reset Password"}
          </div>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            {step === 1 && (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                  required
                />
                <button
                  type="button"
                  className="login-button"
                  onClick={handleRequestOTP}
                >
                  Send OTP
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="login-input"
                  required
                />
                <button
                  type="button"
                  className="login-button"
                  onClick={handleVerifyOTP}
                >
                  Verify OTP
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="login-input"
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="login-input"
                  required
                />
                <button
                  type="button"
                  className="login-button"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* RIGHT: Video */}
      <div className="login-right">
        <video
          src={require("../../assets/gif/new.mp4")}
          autoPlay
          loop
          muted
          playsInline
          className="video-bg"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;