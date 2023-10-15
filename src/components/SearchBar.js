import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [homeSearch, setHomeSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-results?q=${homeSearch}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-gray-50 flex items-center justify-center mt-16 rounded-full"
    >
      <div className="relative w-[90%] md:w-[60%] lg:w-[40%]">
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 flex items-center justify-center bg-cyan-500/50 rounded-full hover:bg-blue-700 transition duration-300"
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-white" />
        </button>
        <input
          type="text"
          id="searchInput"
          value={homeSearch}
          onChange={(e) => setHomeSearch(e.target.value)}
          placeholder="Search..."
          autoFocus
          className="w-full px-6 py-4 rounded-full bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none shadow-md shadow-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300"
        />
      </div>
    </form>
  );
};

export default SearchBar;