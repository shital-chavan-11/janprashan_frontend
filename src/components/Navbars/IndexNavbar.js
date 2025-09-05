/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // <-- import useTranslation
import logo from "../../assets/img/logo-.jpg";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { i18n } = useTranslation(); // <-- initialize i18n

  // function to change language
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <nav className="top-4 fixed z-50 w-full flex flex-wrap items-center justify-between px-4 py-2 navbar-expand-lg bg-white shadow">
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

          {/* Right side: Login button + Language buttons */}
          <div className="flex items-center ml-auto space-x-2">
            {/* Language buttons */}
            <button
              onClick={() => changeLanguage("en")}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("hi")}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
            >
              HI
            </button>
            <button
              onClick={() => changeLanguage("mr")}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
            >
              MR
            </button>

            {/* Login button */}
            <Link to="/auth/login">
              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
