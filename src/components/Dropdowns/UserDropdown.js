import React, { useRef, useState, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import profile1 from "../../assets/img/pic1.jpg";

const UserDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef(null);
  const popoverDropdownRef = useRef(null);

  // Initialize Popper when dropdown opens
  useEffect(() => {
    if (dropdownPopoverShow && btnDropdownRef.current && popoverDropdownRef.current) {
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "bottom-start",
      });
    }
  }, [dropdownPopoverShow]);

  return (
    <div className="relative"> {/* ✅ parent must be relative */}
      <button
        ref={btnDropdownRef}
        className="flex items-center w-12 h-12 rounded-full overflow-hidden border-none cursor-pointer"
        onClick={() => setDropdownPopoverShow(!dropdownPopoverShow)}
      >
        <img
          alt="Profile"
          className="w-full h-full object-cover rounded-full shadow-lg"
          src={profile1}
        />
      </button>

      <div
        ref={popoverDropdownRef}
        style={{ display: dropdownPopoverShow ? "block" : "none" }} // ✅ use style
        className="absolute left-0 mt-2 bg-white text-base z-50 py-2 list-none text-left rounded shadow-lg min-w-[150px]"
      >
        <a
          href="/admin/Profile"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100 rounded"
        >
          Profile
        </a>

        <div className="h-0 my-2 border border-solid border-blueGray-100" />

        <a
          href="/auth/logout"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100 rounded"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default UserDropdown;
