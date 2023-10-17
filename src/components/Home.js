import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Header from "./Header";
import SocialIcons from "./SocialIcons";
import AddButton from "./AddBttn";
import CardList from "./profilepost";
import Footer from "./Footer";
import About from "./About";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <SearchBar />
      <div className="flex-grow">
        <CardList />
      </div>
      <AddButton />
      <Footer />
    </div>
  );
};

export default Home;
