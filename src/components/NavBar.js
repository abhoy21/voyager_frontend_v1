import React, { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { XIcon } from "@heroicons/react/outline"; // Import the cross icon
import { Link } from "react-router-dom";
import logo from "../icons/docin-web-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { SIGNOUT_MUTATION } from "../graphql";
import { useMutation } from "@apollo/client";
import PaperBoatLogo from "./Logo";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [signoutmutation, { loading, error }] = useMutation(SIGNOUT_MUTATION);
  // const[username,setusername] = useState();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignout = async () => {
    try {
      const { data } = await signoutmutation();

      if (data.signout.success) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userid");
        localStorage.removeItem("username");
        navigate("/login");
      } else {
        console.log("Signout failed.");
      }
    } catch (error) {
      console.error("Signout error:", error);
    }
  };

  const username = localStorage.getItem("username");

  return (
    <nav className="">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            {/* <img
              src={logo}
              alt="Doc-in Logo"
              className="w-auto h-auto md:w-10 lg:w-1/4 mx-2 md:mx-0"
            /> */}
            <PaperBoatLogo />
            <div className="md:hidden ml-2 text-cyan-700">{username}</div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              {/* Profile Icon */}
              <button onClick={toggleDropdown} className="focus:outline-none">
                <div className="flex items-center">
                  <UserCircleIcon className="w-10 h-10 md:w-12 md:h-12 text-cyan-500" />
                  <span className="hidden md:inline ml-2 text-cyan-500">
                    {username}
                  </span>
                  {/* Animated Dropdown/Cross Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-1 text-cyan-500 transition-transform duration-300 transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      transform: isDropdownOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-cyan-200 border border-cyan-500 rounded shadow-lg">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-cyan-500 hover:bg-cyan-900"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-cyan-500 hover:bg-cyan-900"
                  >
                    Sign Up
                  </Link>
                  <button
                    onClick={handleSignout}
                    className="block px-4 py-2 text-cyan-500 hover:bg-cyan-900 focus:outline-none"
                  >
                    Signout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
