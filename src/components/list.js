import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const List_custom = ({ searchResults, handleUpvote, handleDownvote }) => {
  return (
    <>
      {searchResults.map((result, index) => (
        <div
          key={index}
          className="border border-[#2A2F4F] p-4 rounded-lg flex flex-col bg-[#F8EAD8] shadow-md relative "
        >
          <div className="absolute top-0 right-0">
            <div>
              <button
                className="py-2 mt-4 mx-2 px-4 text-[#2A2F4F] font-mono focus:outline-none border border-[#2A2F4F] rounded-full p-1 transition duration-300 ease-in-out hover:bg-[#F8EAD8] bg-opacity-75"
                onClick={() => handleUpvote(result.id)}
              >
                <FaArrowUp className="w-6 h-6 md:w-4 md:h-4 text-[#0D7377]" />
              </button>
              <span className="mx-1 text-[#2A2F4F]">{result.upvote}</span>
              <button
                className="py-2 mt-4 mx-2 px-4 text-[#2A2F4F] font-mono focus:outline-none border border-[#2A2F4F] rounded-full p-1 transition duration-300 ease-in-out hover:bg-[#F8EAD8] bg-opacity-75"
                onClick={() => handleDownvote(result.id)}
              >
                <FaArrowDown className="w-6 h-6 md:w-4 md:h-4 text-[#E63E6D]" />
              </button>
              <span className="mx-1 mr-6 text-[#2A2F4F]">
                {result.downvote}
              </span>
            </div>
          </div>
          <a
            href={result.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-2xl font-semibold mb-1 font-mono hover:underline text-[#A7727D]"
          >
            {result.title}
          </a>
          <p className="text-[#2A2F4F] mb-2 max-w-[500px]">
            {result.description}
          </p>
          <p className="text-[#2A2F4F] mb-2">{result.link}</p>
          <div className="flex items-center space-x-2 mb-2">
            <p className="text-[#2A2F4F] text-lg font-bold">{result.author}</p>
            <p className="text-[#2A2F4F] font-mono text-lg font-bold">
              {result.institutionName}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default List_custom;
