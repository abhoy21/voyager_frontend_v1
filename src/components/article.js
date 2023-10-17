import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PDF_BY_ID } from "../graphql";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Logo from "./Logo";

const Article = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(PDF_BY_ID, {
    variables: { id: parseInt(id) },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const pdf = data.pdfById;

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-8 pt-28 overflow-y-auto">
      <div className="flex justify-center items-center">
        <div className="w-11/12 min-h-screen max-w-5xl mx-auto">
          <div className="relative mb-8">
            <Logo />
          </div>

          <div className="flex flex-col bg-white rounded-2xl shadow-xl shadow-cyan-500/50">
            <div className="p-6 items-center justify-center flex flex-col">
              <div className="bg-white rounded-2xl shadow-xl p-6 shadow-cyan-500/50 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">{pdf.title}</h1>
                <p className="text-sm text-black">Author: {pdf.author}</p>
                <p className="text-sm text-black">Topic: {pdf.topic}</p>
                <p className="text-sm text-black">
                  Institution: {pdf.institutionName}
                </p>
              </div>

              <div className="w-full mt-6">
                <ReactQuill
                  value={pdf.description}
                  modules={{ toolbar: null }}
                  readOnly={true}
                  theme="bubble"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center bg-white rounded-2xl shadow-md shadow-cyan-500/50 mt-6 text-black p-2 font-semibold ">
            Created At : {new Date(pdf.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;