import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_PDF_MUTATION } from "../graphql";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import Logo from "./Logo";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addpage2 = () => {
  const [authorName, setAuthorName] = useState("");
  const [institution, setInstitution] = useState("");
  const [topic, setTopic] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createPdf] = useMutation(CREATE_PDF_MUTATION);
  const navigate = useNavigate();

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    ["link", "image", "video", "formula"],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const handleSave = async () => {
    setIsSaving(true);

    const data = {
      title,
      description: editorHtml,
      author: authorName,
      institution_name: institution,
      topic: topic,
      link,
    };

    try {
      const response = await createPdf({
        variables: data,
      });
      const notify = () => toast('Article added successfully');
      notify();
      navigate('/')

      console.log("Article added successfully:", response.data.createPdf.pdf);

    } catch (error) {
      console.error("Error adding Article", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const [editorHtml, setEditorHtml] = useState("");
  return (
    <div className="flex flex-col h-screen bg-gray-50  p-8 pt-28 overflow-y-auto">
      <div className="flex justify-center items-center">
        <div className="w-11/12 min-h-screen max-w-5xl mx-auto">
          <div className="relative mb-8">
            <Logo />
          </div>
          <div className="flex flex-col bg-white rounded-2xl shadow-xl shadow-cyan-500/50">
            <div className="p-6 items-center justify-center flex flex-col">
              <div className="bg-white rounded-2xl shadow-xl p-6 shadow-cyan-500/50 flex flex-col justify-center items-center">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-2xl text-black font-bold bg-transparent  text-center"
                  placeholder="Enter the Title"
                />

                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="text-sm text-black bg-transparent mt-2  text-center"
                  placeholder="Author"
                />

                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="text-sm text-black bg-transparent mt-2 b text-center"
                  placeholder="Topic"
                />
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="text-sm text-black bg-transparent mt-2 b text-center"
                  placeholder="Institution"
                />

                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="text-sm text-black bg-transparent mt-2  text-center"
                  placeholder="Link"
                />
              </div>

              <div className="p-6 w-full">
                <ReactQuill
                  modules={{ toolbar: toolbarOptions }}
                  value={editorHtml}
                  onChange={setEditorHtml}
                  className="quill-editor"
                  style={{ width: "100%", height: "100%" }}
                  theme="snow"
                />
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={handleSave}
                  className={`${
                    isSaving
                      ? "bg-blue-500"
                      : "text-black bg-white shadow-lg shadow-green-600 px-4 py-2 rounded"
                  } text-black px-6 py-3 rounded-lg mr-2 transition-colors duration-300`}
                  disabled={isSaving}
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="mr-2 text-black bg-white shadow-lg shadow-red-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {showSuccessModal && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <AlertsSuccess />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AlertsSuccess = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-lg transform transition-all hover:scale-105">
          <div className="p-6 space-y-6">
            <svg
              className="w-12 h-12 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              // xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <h3 className="text-2xl font-semibold text-center mb-2">
              Project Added Successfully
            </h3>
            <p className="text-gray-600 text-center">
              You can manage all available projects from your{" "}
              <a className="text-emerald-600 hover:text-emerald-400" href="#">
                personal dashboard
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addpage2;