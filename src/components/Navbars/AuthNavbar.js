
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo-.jpg"
export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-4 fixed z-50 w-full flex flex-wrap items-center justify-between px-4 py-2 navbar-expand-lg bg-white
       shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          {/* Left side: Logo */}
          <div className="flex justify-start">
  <Link to="/" className="inline-block py-2 mr-4">
    <img
      src={logo}  // replace with actual path
      alt="Logo-"
      className="h-12 w-auto"
    />
  </Link>
  </div>
</div>

      </nav>
    </>
  );
}