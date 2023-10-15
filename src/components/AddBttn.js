import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate, useLocation } from "react-router-dom";

const AddButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddButtonClick = () => {
    navigate("/add");
  };

  const isAddPage = location.pathname === "/add";

  if (isAddPage) {
    return null;
  }

  return (
    <button
      onClick={handleAddButtonClick}
      className="fixed bottom-16 right-16 w-20 h-20 bg-cyan-500/50 text-cyan-500 rounded-full shadow-lg flex items-center justify-center hover:bg-cyan-200 transition-colors duration-300"
    >
      <PlusIcon className="w-12 h-12 text-cyan-500 absolute left-4" />
    </button>
  );
};

export default AddButton;
