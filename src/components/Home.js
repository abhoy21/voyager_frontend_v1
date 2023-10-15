// Home.js
import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Header from "./Header";
import SocialIcons from "./SocialIcons";
import AddButton from "./AddBttn";
import CardList from "./profilepost";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div>
        <NavBar />
        {/* <Header /> */}
        <SearchBar />
        <div>
          <CardList />
        </div>
        <AddButton />
      </div>
      <div className="">
        {/* <SocialIcons /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
