import React, { useState } from "react";
import { useEffect } from "react";
import { USER_POST_QUERY } from "../graphql";
import { useLazyQuery, useMutation } from "@apollo/client";
import List_custom from "./list";
import { UPVOTE_QUERY } from "../graphql";
import { DOWNVOTE_QUERY } from "../graphql";
import { useNavigate } from "react-router-dom";
import { DELETE_PDF } from "../graphql";

const Card = ({ title, description, author, institution, link, id }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [deletePdf] = useMutation(DELETE_PDF);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleEdit = () => {
    // Add edit functionality here
    navigate(`/edit/${id}`);
    console.log("Edit clicked for:", title);
    setDropdownVisible(false);
  };

  const handleDelete = () => {
    deletePdf({
      variables: { id: parseInt(id) },
    });
    setDropdownVisible(false);
  };

  const navigateToPdf = (id) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="relative w-80 p-6 mt-24  rounded-xl mx-4 bg-white mb-4 shadow-cyan-500/50 shadow-xl hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/100">
      <div className="absolute top-0 right-0 mt-2 mr-2 ">
        <div className="relative inline-block text-black">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M2.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm5 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm5 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 py-2 w-24 bg-white border rounded shadow-lg">
              <button
                onClick={handleEdit}
                className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div onClick={() => navigateToPdf(id)}>
        <h2 className="text-lg font-semibold mb-2 text-black overflow-hidden whitespace-nowrap overflow-ellipsis">
          {title}
        </h2>
        <p
          className="text-sm text-black mb-4 overflow-hidden whitespace-nowrap overflow-ellipsis"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="flex flex-col">
          <p className="text-xs text-black mb-1">{author}</p>
          <p className="text-xs text-black mb-1">{institution}</p>
          <a
            className="text-xs text-black hover:underline"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Check Out
          </a>
        </div>
      </div>
    </div>
  );
};

const CardList = () => {
  const userid = localStorage.getItem("userid");
  const [searchpdf, { data }] = useLazyQuery(USER_POST_QUERY);
  const [pdfs, setpdfs] = useState([]);
  const [upvotePdf, { loading: upvoteLoading, error: upvoteError }] =
    useMutation(UPVOTE_QUERY);
  const [downvotePdf, { loading: downvoteLoading, error: downvoteError }] =
    useMutation(DOWNVOTE_QUERY);

  useEffect(() => {
    const fetchData = async () => {
      await searchpdf();
    };

    fetchData();
  }, [searchpdf]);

  useEffect(() => {
    if (data && data.searchPdfsByUser) {
      console.log(data.searchPdfsByUser);
      setpdfs(data.searchPdfsByUser);
    }
  }, [data]);

  const handleUpvote = (id) => {
    upvotePdf({
      variables: { id: parseInt(id) },
    });
  };

  const handleDownvote = (id) => {
    console.log(parseInt(id));
    downvotePdf({
      variables: { id: parseInt(id) },
    });
  };

  return (
    <div className="flex flex-wrap justify-center p-4">
      {pdfs.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          author={card.author}
          institution={card.institutionName}
          link={card.link}
          id={card.id}
        />
      ))}
    </div>
  );
};

export default CardList;