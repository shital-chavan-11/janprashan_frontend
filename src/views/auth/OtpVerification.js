import React, { useState, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import video from "../../assets/gif/otp.mp4";
import "./styles/otp.css";

function OtpVerification(props) {
  const [otp, setOtp] = useState(new Array(6).fill("")); // 6 digits
  const inputsRef = useRef([]);

  const email = props.location.state?.email || localStorage.getItem("otp_email");

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // only digits
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (index < otp.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    try {
      const response = await fetch("https://janprashna-backend.onrender.com/api/auth/verify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();

     if (response.ok) {
  Swal.fire({
    title: "Success",
    text: data.message || "OTP verified successfully!",
    icon: "success",
    confirmButtonColor: "#1089d3", // 👈 blue button
  }).then(() => {
    props.history.push("/auth/login"); // ✅ works in v5
  });
} else {
  Swal.fire({
    title: "Error",
    text: data.detail || "Invalid OTP",
    icon: "error",
    confirmButtonColor: "#1089d3", // 👈 blue button
  });
}
} catch (error) {
  console.error("OTP verification error:", error);
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
      {/* LEFT - Form */}
      <div className="login-left">
        <div className="login-container">
          <h2 className="login-title">OTP Verification</h2>
          <form className="login-form" onSubmit={handleOtpSubmit}>
            <label className="login-label">
              {email ? `Enter OTP sent to ${email}` : "Enter OTP"}
            </label>

            {/* OTP BOXES */}
            <div className="otp-input-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  className="otp-input-box"
                />
              ))}
            </div>

            <button type="submit" className="login-button">
              Verify OTP
            </button>

            <div className="login-extra">
              <p>
                Didn’t receive the code?{" "}
                <button
                  type="button"
                  className="resend-btn"
                  onClick={() =>
                    Swal.fire("Info", "Resend OTP logic goes here", "info")
                  }
                >
                  Resend OTP
                </button>
              </p>
              <p>
                <Link to="/auth/login" className="back-link">
                  ← Back to Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT - Video */}
      <div className="login-right">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="login-video"
        />
      </div>
    </div>
  );
}

export default withRouter(OtpVerification);