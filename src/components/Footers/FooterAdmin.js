import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 text-center">
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