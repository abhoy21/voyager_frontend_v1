import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Trending from "./components/Trending";
import SearchResult from "./components/SearchList";
import LoginForm from "./components/login";
import SignupForm from "./components/signup";
import Article from "./components/article";
import Addpage2 from "./components/addpage2";
import Edit from "./components/edit";
import About from "./components/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TermsAndConditions from "./components/Terms";
import PrivacyPolicy from "./components/Privacy";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route exact path="/addpage1" element={<AddPage />} /> */}
        <Route exact path="/search-results" element={<SearchResult />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/signup" element={<SignupForm />} />
        <Route path="/article/:id" element={<Article />} />
        <Route exact path="/add" element={<Addpage2 />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/about" element={<About />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
};

export default App;