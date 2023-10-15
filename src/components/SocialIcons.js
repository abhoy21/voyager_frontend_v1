import React from "react";
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const SocialIcons = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/",
    },
    { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com/" },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://www.instagram.com/",
    },
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/" },
  ];

  return (
    <div className="flex">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          <div className="w-10 h-10 text-3xl text-[#A7727D] hover:text-[#2A2F4F]">
            {link.icon}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
