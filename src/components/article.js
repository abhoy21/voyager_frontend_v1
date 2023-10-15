import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PDF_BY_ID } from "../graphql";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.snow.css";
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
    <div className="fixed inset-0 bg-white p-8 pt-28 mb-8 flex justify-center items-center">
      <div className="px-6 w-11/12 mb-8 pt-20">
        <div className="relative pt-20 mb-8">
          <Logo />
        </div>
        <div className="p-2 w-full max-h-screen bg-white rounded-lg shadow-xl shadow-cyan-500/50 overflow-y-auto min-h-screen">
          <div className="flex flex-col justify-center items-center p-6">
            <div className="p-11 bg-white rounded-lg shadow-xl shadow-cyan-500/50 flex flex-col justify-center items-center w-2/5">
              <h1 className="text-2xl text-black font-bold">{pdf.title}</h1>
              <p className="text-sm text-black">Author: {pdf.author}</p>
              <p className="text-sm text-black">
                Institution: {pdf.institutionName}
              </p>
            </div>

            <div className="p-6 w-full pb-24">
              <ReactQuill
                value={pdf.description}
                modules={{ toolbar: null }}
                readOnly={true}
                theme="bubble"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
