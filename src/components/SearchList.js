import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom"; // Change to useNavigate
import { FaArrowUp, FaArrowDown, FaSearch } from "react-icons/fa";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPVOTE_QUERY } from "../graphql";
import { DOWNVOTE_QUERY } from "../graphql";
import { SEARCH_QUERY } from "../graphql";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";

const SearchResult = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate hook
  const homesearch = new URLSearchParams(location.search).get("q");
  const [searchQuery, setSearchQuery] = useState(homesearch || "");
  const [executeSearch, { loading, data }] = useLazyQuery(SEARCH_QUERY);
  const [upvotePdf, { loading: upvoteLoading, error: upvoteError }] =
    useMutation(UPVOTE_QUERY);
  const [downvotePdf, { loading: downvoteLoading, error: downvoteError }] =
    useMutation(DOWNVOTE_QUERY);

  useEffect(() => {
    if (homesearch) {
      executeSearch({ variables: { query: homesearch } });
    }
  }, [executeSearch, homesearch]);

  useEffect(() => {
    if (data && data.searchPdfs) {
      setSearchResults(data.searchPdfs);
    }
  }, [data]);

  const handleSearch = () => {
    executeSearch({ variables: { query: searchQuery } });
  };

  const handleUpvote = (id) => {
    upvotePdf({
      variables: { id: parseInt(id) },
    });
  };

  const handleDownvote = (id) => {
    downvotePdf({
      variables: { id: parseInt(id) },
    });
  };

  const navigateToPdf = (id) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-screen-xl p-8">
        <div className="relative my-4">
          <div className="relative my-4">
            <Logo />
          </div>
          {/* <div className="flex items-center justify-center">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Google..."
                className="px-4 py-2 text-cyan-300/50 bg-[#ebf4f1] text-[#0c133b] border border-cyan-300 rounded-xl focus:outline-none w-96"
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 top-0 mt-2 mr-3 text-cyan-500 focus:outline-none"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </div>
          </div> */}
          <div className="flex items-center justify-center">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                autoFocus
                className="w-full px-6 py-4 rounded-full bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none shadow-md shadow-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300"
              />
            </div>
          </div>
          <h1 className="text-3xl font-semibold mt-6 mb-4 text-cyan-500 text-center">
            Search Results
          </h1>

          {searchResults.map((result, index) => (
            <div
              className="border border-[#d1e0db] p-10 rounded-2xl bg-gray-50 shadow-md relative my-4 mb-8 shadow-cyan-500/50 cursor-pointer transition-transform transform-gpu hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
              key={index}
              onClick={() => navigateToPdf(result.id)}
            >
              <div className="absolute top-0 right-0">
                <button
                  className="py-2 mt-4 mx-2 px-4 text-[#2A2F4F] font-mono focus:outline-none border border-cyan-700/50 rounded-full p-1 transition duration-300 ease-in-out hover:bg-[#F8EAD8] bg-opacity-75"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event propagation
                    handleUpvote(result.id);
                  }}
                >
                  <FaArrowUp className="w-6 h-6 md:w-4 md:h-4 text-cyan-300" />
                </button>
                <span className="mx-1 text-[#0c133eb]">{result.upvote}</span>
                <button
                  className="py-2 mt-4 mx-2 px-4 text-[#2A2F4F] font-mono focus:outline-none border border-cyan-700/50 rounded-full p-1 transition duration-300 ease-in-out hover:bg-[#F8EAD8] bg-opacity-75"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event propagation
                    handleDownvote(result.id);
                  }}
                >
                  <FaArrowDown className="w-6 h-6 md:w-4 md:h-4 text-[#E63E6D]" />
                </button>
                <span className="mx-1 mr-6 text-[#0c133eb]">
                  {result.downvote}
                </span>
              </div>
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-2xl font-semibold mb-2 font-mono hover:underline text-cyan-500"
              >
                {result.title}
              </a>
              <p
                className="text-gray-600 mb-2 max-w-[500px] line-clamp-2 "
                dangerouslySetInnerHTML={{ __html: result.description }}
              ></p>
              <p className="text-cyan-400/75 mb-2">{result.link}</p>
              <div className="flex items-center"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
