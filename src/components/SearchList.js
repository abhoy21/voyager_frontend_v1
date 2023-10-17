import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPVOTE_QUERY, DOWNVOTE_QUERY, SEARCH_QUERY } from "../graphql";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchResult = () => {
  const [loadingTime, setLoadingTime] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const homesearch = new URLSearchParams(location.search).get("q");
  const [searchQuery, setSearchQuery] = useState(homesearch || "");
  const [executeSearch, { loading, data }] = useLazyQuery(SEARCH_QUERY);
  const [upvotePdf, { loading: upvoteLoading, error: upvoteError }] =
    useMutation(UPVOTE_QUERY);
  const [downvotePdf, { loading: downvoteLoading, error: downvoteError }] =
    useMutation(DOWNVOTE_QUERY);

  useEffect(() => {
    const startTime = performance.now();

    if (homesearch) {
      executeSearch({ variables: { query: homesearch } });
    }

    return () => {
      const endTime = performance.now();
      setLoadingTime(endTime - startTime);
    };
  }, [executeSearch, homesearch]);

  useEffect(() => {
    if (data && data.searchPdfs) {
      setSearchResults(data.searchPdfs);
    }
  }, [data]);

  const handleSearch = () => {
    const startTime = performance.now(); // Measure start time

    executeSearch({ variables: { query: searchQuery } });

    const endTime = performance.now();
    const loadingTime = endTime - startTime;
    setLoadingTime(loadingTime);
  };

  const handleUpvote = (id) => {
    
    try {
      upvotePdf({
        variables: { id: parseInt(id) },
      });
      const notify = ()=> toast('Article upvoted successfully');
      notify();
    } catch (error) {
      console.log("error occured while upvoting article")
    }
  };

  const handleDownvote = (id) => {
    try {
      downvotePdf({
        variables: { id: parseInt(id) },
      });
      const notify = () => toast('Article downvoted successfully');
      notify();

    } catch (error) {
      console.log("error occured while downvoting article");
    }
  };

  const navigateToPdf = (id) => {
    navigate(`/article/${id}`);
  };

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 183; // Adjust as needed
    const wordCount = text.split(" ").length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-screen-xl p-8">
        <div className="relative my-4">
          <div className="relative my-4">
            <Logo />
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-[90%] md:w-[60%] lg:w-[40%]">
              <button
                onClick={handleSearch}
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

          <div className="text-md font-semibold mt-6 text-[#555] text-center">
            {data && data.searchPdfs
              ? `${data.searchPdfs.length} results found ${
                  loadingTime ? ` in ${loadingTime.toFixed(2)} ms` : ""
                }`
              : "Loading..."}
          </div>

          {searchResults.map((result, index) => (
            <div
              className="border border-[#d1e0db] p-10 rounded-2xl bg-gray-50 shadow-md relative my-4 mb-8 shadow-cyan-500/50 cursor-pointer transition-transform transform-gpu hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
              key={index}
              onClick={() => navigateToPdf(result.id)}
            >
              <div className="absolute top-0 right-0">
                <button
                  className="p-2 mt-4 mx-2 px-4 text-[#2A2F4F] font-mono   rounded-full  transition duration-300 ease-in-out bg-opacity-75 shadow-sm shadow-green-500 hover:shadow-md hover:shadow-green-500"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event propagation
                    handleUpvote(result.id);
                  }}
                >
                  <FaArrowUp className="w-6 h-6 md:w-4 md:h-4 text-green-500" />
                </button>
                <span className="mx-1 text-[#0c133eb]">{result.upvote}</span>
                <button
                  className="p-2 mt-4 mx-2 px-4 text-[#2A2F4F] font-mono rounded-full transition duration-300 ease-in-out bg-opacity-75 shadow-sm shadow-red-600 hover:shadow-md hover:shadow-red-600"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event propagation
                    handleDownvote(result.id);
                  }}
                >
                  <FaArrowDown className="w-6 h-6 md:w-4 md:h-4 text-red-600" />
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

              <div className=" text-black text-sm font-mono font-semibold">
                {new Date(result.createdAt).toLocaleString()}
              </div>

              <p
                className="text-gray-600 mb-2 max-w-[500px] line-clamp-2 "
                dangerouslySetInnerHTML={{ __html: result.description }}
              ></p>
              <div className="flex flex-row  justify-between">
                <p className="text-cyan-400/75 mb-2">{result.link}</p>
                <div className="flex flex-row items-center">
                  <div className="text-md text-[#555] font-semibold ">
                    {`${calculateReadingTime(result.description)} min read`}
                  </div>
                  <div className=" bg-[#E8E8E8] text-black text-md rounded-full pl-2 pr-2 pt-1 pb-1 ml-6">
                    {result.topic}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;