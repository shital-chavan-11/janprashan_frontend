import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function Logout() {
  const history = useHistory();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch("https://janprashna-backend.onrender.com/api/auth/logout/", {
          method: "POST",
          credentials: "include",       // Include cookies in request
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),      // No need to send refresh token in body if you use cookie
        });
if (response.ok) {
  // Clear local storage flags
  localStorage.clear();

  Swal.fire({
    title: "Logged Out",
    text: "You have been logged out successfully.",
    icon: "success",
    confirmButtonColor: "#1089d3", // 👈 blue button
  }).then(() => {
    history.push("/");
  });
} else {
  Swal.fire({
    title: "Error",
    text: "Logout failed. Try again.",
    icon: "error",
    confirmButtonColor: "#1089d3", // 👈 blue button
  });
}
} catch (error) {
  console.error("Logout error:", error);
  Swal.fire({
    title: "Error",
    text: "Something went wrong!",
    icon: "error",
    confirmButtonColor: "#1089d3", // 👈 blue button
  });
}
    }
Swal.fire({
  title: "Are you sure?",
  text: "You will be logged out of your session.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#1089d3", // 👈 new blue color
  cancelButtonColor: "rgba(223, 42, 42, 1)", // red cancel button
  confirmButtonText: "Yes, logout",
  cancelButtonText: "Cancel",
}).then((result) => {
  if (result.isConfirmed) {
    logoutUser();
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    history.goBack();
  }
});

  }, [history]);

  return null;
}