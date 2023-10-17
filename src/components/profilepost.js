import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  USER_POST_QUERY,
  UPVOTE_QUERY,
  DOWNVOTE_QUERY,
  DELETE_PDF,
} from "../graphql";
import { BlankPostComponent } from "./Icons";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({
  title,
  description,
  author,
  institution,
  link,
  id,
  createdAt,
  topic,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [deletePdf] = useMutation(DELETE_PDF);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
    setDropdownVisible(false);
  };

  const handleDelete = () => {
    deletePdf({
      variables: { id: parseInt(id) },
    })
      .then(() => {
        setDropdownVisible(false);
        const notify = () => toast('Article deleted successfully');
        notify(); 
      })
      .catch((error) => {
        console.error('Error deleting PDF:', error);
      });
  };
  

  const navigateToPdf = () => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4 pt-8">
      <div className="bg-white  rounded-lg shadow-md shadow-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/100  transition duration-300 transform hover:scale-105 cursor-pointer">
        <div className="bg-white rounded-lg shadow-md shadow-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/100 transition duration-300 transform hover:scale-105 cursor-pointer">
          <div className="p-3" onClick={navigateToPdf}>
            <div className="text-2xl font-semibold mb-1 truncate">{title}</div>

            <p
              className="text-sm text-black mb-4 line-clamp-1"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            <div className="text-xs text-[#555] mb-1 line-clamp-1 font-bold">
              Author: {author}
            </div>
            <div className="text-[#555] text-xs font-bold">
              Institution: {institution}
            </div>

            <div className="flex flex-row justify-between">
              <div className="text-black text-xs font-mono font-semibold pt-1 mt-2 mr-2">
                {new Date(createdAt).toLocaleString()}
              </div>
              <div className="bg-[#E8E8E8] text-black text-md rounded-full pl-2 pr-2 pt-1 pb-1 ">
                {topic}
              </div>
            </div>

            {/* <a
      className="text-xs text-cyan-500 hover:underline"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      Check Out
    </a> */}
          </div>
        </div>

        <div className="absolute top-0 right-0 mt-2 mr-2">
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
      </div>
    </div>
  );
};

const NoPostsMessage = () => {
  return (
    <div className="w-full h-auto flex justify-center items-center p-12">
      <div className="text-center">
        <div className="flex items-center justify-center p-8">
          <BlankPostComponent />
        </div>
        <h2 className="text-3xl sm:text-2xl font-bold text-gray-600">
          You haven't added any posts yet.
        </h2>
        <p className="text-lg sm:text-lg text-gray-400 mt-4">
          Why not create your first post and share it with the community?
        </p>
      </div>
    </div>
  );
};

const CardList = ({ isAuthenticated }) => {
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
      setpdfs(data.searchPdfsByUser);
    }
  }, [data]);

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

  return (
    <div className="flex flex-wrap p-4">
      {pdfs.length > 0 ? (
        pdfs.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            author={card.author}
            institution={card.institutionName}
            link={card.link}
            id={card.id}
            createdAt={card.createdAt}
            topic={card.topic}
          />
        ))
      ) : (
        <NoPostsMessage />
      )}
    </div>
  );
};

const GetStarted = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="container mx-auto p-4 h-screen">
      {isAuthenticated ? (
        <CardList isAuthenticated={isAuthenticated} />
      ) : (
        <div className="h-auto flex flex-col justify-center items-center p-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-black mt-6">Get Started</h1>
            <p className="text-lg text-gray-600 mt-2">
              Sign up to explore and share your thoughts with the community.
            </p>
            <button
              onClick={handleGetStarted}
              className="text-white bg-cyan-500 hover:bg-cyan-600 rounded-md px-4 py-2 mt-4"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetStarted;