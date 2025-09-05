import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-white"
            : "relative w-full bg-white") + " pb-6"
        }
      >
        {/* Full-width HR outside container */}
        <hr className="border-t border-blueGray-600 w-full m-0" />

        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © {new Date().getFullYear()} JANPRASHNA{" "}
                <a
                  href="#"
                  className="text-blueGray-500 hover:text-blueGray-800"
                ></a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}