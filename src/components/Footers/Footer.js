import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-blueGray-200 pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center  lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl mt-4 font-semibold">Let's keep in touch!</h4>
              
              <div className="mt-6 lg:mb-0 mb-6">
                <button
                  className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <a
    href="https://x.com/c_shital1"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white text-black-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
  >
                  <i className="fab fa-twitter"></i>
                </a>
                </button>
                <button
                  className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                   <a
    href="https://www.facebook.com/share/1C5d2NbLxX/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white text-blue-500 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
  >
                  <i className="fab fa-facebook-square"></i>
                </a>
                </button>
                <button
                  className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <a
    href="https://www.linkedin.com/in/sanika-babar-1146b82a4/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
  >
                  <i className="fab fa-linkedin"></i>
                </a>
                </button>
                <button
                  className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <a
    href="https://github.com/shital-chavan-11"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2"
  >
                  <i className="fab fa-github"></i>
                </a>
                </button>
              </div>
            </div>
            
          </div>
          <hr className="w-full border-t-2 border-blueGray-300 my-6 mx-0" />

<div className="flex flex-wrap items-center md:justify-between justify-center">
  <div className="w-full md:w-4/12 px-4 mx-auto text-center">
    <div className="text-sm text-blueGray-500 font-semibold py-1">
      Copyright © {new Date().getFullYear()} JANPRASHNA{" "}
      <a
        href="#"
        className="text-blueGray-500 hover:text-blueGray-800"
      >
      </a>
      .
    </div>
  </div>
</div>
</div>
      </footer>
    </>
  );
}