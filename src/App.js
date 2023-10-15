// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import AddPage from "./components/AddPage";
import SearchResult from "./components/SearchList";
import LoginForm from "./components/login";
import SignupForm from "./components/signup";
import Article from "./components/article";
import Addpage2 from "./components/addpage2";
import Edit from "./components/edit";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route exact path="/addpage1" element={<AddPage />} /> */}
        <Route exact path="/search-results" element={<SearchResult />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/signup" element={<SignupForm />} />
        <Route path="/article/:id" element={<Article/>} />
        <Route exact path="/add" element={<Addpage2/>} />
        <Route path="/edit/:id" element={<Edit/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
