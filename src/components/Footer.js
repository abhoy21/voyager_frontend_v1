import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8 text-gray-600 mt-[60px]">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Copyright notice */}
        <p className="text-sm">&copy; {new Date().getFullYear()} All Rights Reserved</p>

        {/* Social media links */}
        <div className="flex space-x-4">
          <a href="https://www.linkedin.com/in/uddalak-seal-8a0967233/" className="text-blue-500 hover:text-blue-700">
            Uddalak Seal
          </a>
          <span className="text-gray-600">&nbsp;&nbsp;&&nbsp;&nbsp;</span> {/* Space between names */}
          <a href="https://www.linkedin.com/in/abhoy-sarkar-a7b23a201/" className="text-blue-500 hover:text-blue-700">
            Abhoy Sarkar
          </a>
        </div>

        {/* Contact information */}
        <div className="text-sm">
          <p>Email: example@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
