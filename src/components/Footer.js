import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8 text-gray-600 text-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          {/* Copyright notice */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
            <p className="text-base sm:text-lg font-semibold">
              &copy; {new Date().getFullYear()} Voyager. All Rights Reserved
            </p>
            <p className="text-sm sm:text-base mt-4">Read our <a href="/terms-and-conditions" className="text-blue-500 hover:text-blue-700">Terms and Conditions</a></p>
          </div>

          {/* Social media links */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
            <p className="text-base sm:text-lg font-semibold">Made by:</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.linkedin.com/in/uddalak-seal-8a0967233/" className="text-blue-500 hover:text-blue-700">
                @Uddalak_Seal
              </a>
              <span className="text-gray-600">&nbsp;&nbsp;&&nbsp;&nbsp;</span>
              <a href="https://www.linkedin.com/in/abhoy-sarkar-a7b23a201/" className="text-blue-500 hover:text-blue-700">
                @Abhoy_Sarkar
              </a>
            </div>
          </div>

          {/* Contact information */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
            <p className="text-base sm:text-lg font-semibold">Contact us:</p>
            <p className="text-sm sm:text-base mt-4">mail-UD: <a href="mailto:sealuddalak84@gmail.com" className="text-blue-500 hover:text-blue-700">sealuddalak84@gmail.com </a></p>
            <p className="text-sm sm:text-base mt-4">mail-AB: <a href="mailto:sarkar.ab07@gmail.com" className="text-blue-500 hover:text-blue-700">sarkar.ab07@gmail.com</a></p>
          </div>

          {/* Additional links or sections */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
            <p className="text-base sm:text-lg font-semibold">Explore Voyager:</p>
            <p className="text-sm sm:text-base mt-4">
              <a href="/about" className="text-blue-500 hover:text-blue-700">About Us</a><br />
              <a href="/privacy-policy" className="text-blue-500 hover:text-blue-700">Privacy Policy</a><br />
              {/* <a href="/sitemap" className="text-blue-500 hover:text-blue-700">Sitemap</a> */}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
