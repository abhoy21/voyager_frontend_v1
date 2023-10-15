import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { LogoComponent } from "./Icons";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="shadow-md shadow-cyan-500/50 bg-gray-50 border-2 p-2 px-4 rounded-3xl flex items-center">
        <LogoComponent />

        <span className="text-3xl font-bold ml-4 pb-4 mt-4 font-mono text-[#555]">
          Voyager
        </span>
      </div>
    </Link>
  );
};

export default Logo;
