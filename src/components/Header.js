import React, { useEffect, useState } from "react";

const HeaderMessage = () => {
  const [text, setText] = useState("");
  const message = "  Welcome! Learners.";

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 100; // Typing speed in milliseconds

    const typeWriter = () => {
      if (currentIndex < message.length - 1) {
        setText((prevText) => prevText + message[currentIndex]);
        currentIndex++;
      }
    };

    const interval = setInterval(typeWriter, typingSpeed);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="text-center mt-10 text-[#A7727D] text-5xl font-semibold font-mono">
      {text}
    </div>
  );
};

export default HeaderMessage;
