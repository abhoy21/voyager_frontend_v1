import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGNOUT_MUTATION } from "../graphql";
import { useMutation } from "@apollo/client";
import { FaBars, FaTimes, FaUser, FaInfo, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaFire } from "react-icons/fa";
import PaperBoatLogo from "./Logo";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [signoutMutation, { loading, error }] = useMutation(SIGNOUT_MUTATION);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignout = async () => {
    try {
      const { data } = await signoutMutation();

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
            <PaperBoatLogo />
          </div>
          <div className="text-[#555] sm:mx-4">
            <button onClick={toggleSidebar} className="focus:outline-none">
              {isSidebarOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        >
          <div className="bg-white border-l border-cyan-500 fixed top-0 right-0 h-full w-64 flex flex-col items-start">
            <button
              onClick={toggleSidebar}
              className="text-cyan-500 absolute top-2 right-2 focus:outline-none"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <div className="text-cyan-500 my-16 mx-4 w-full">
              {username && (
                <div className="pb-2 w-full flex items-center">
                  <FaUser className="w-6 h-6 mr-2" />
                  {username}
                </div>
              )}
              <div>
                <hr className="border-t border-cyan-500 my-4 w-full" />
                <div className="pb-2 w-full flex items-center mt-8">
                  <FaInfo className="w-6 h-6 mr-2" />
                  <Link to="/about" className="hover:underline">
                    About
                  </Link>
                </div>
                <div className="pb-2 w-full flex items-center mt-2">
                  <div
                    onClick={() => navigate("/trending")}
                    className="text-cyan-500 py-2 flex items-center hover:underline cursor-pointer"
                  >
                    <FaFire className="w-6 h-6 mr-2" />
                    Trending
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-grow"></div>
            <hr className="border-t border-cyan-500 my-4 w-full" />
            <Link
              to="/login"
              className="text-cyan-900 py-2 px-4 flex items-center hover:text-cyan-300"
            >
              <FaSignInAlt className="w-6 h-6 mr-2" />
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-cyan-900 py-2 px-4 flex items-center hover:text-cyan-300"
            >
              <FaUserPlus className="w-6 h-6 mr-2" />
              Sign Up
            </Link>
            <button
              onClick={handleSignout}
              className="text-cyan-900 py-2 px-4 flex items-center hover:text-cyan-300"
            >
              <FaSignOutAlt className="w-6 h-6 mr-2" />
              Signout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;