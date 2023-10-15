import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await loginMutation({
        variables: { username: username, password: password },
      });
      
      if (data && data.signin.success) {
        console.log("the username is  : ", data.signin.username);
        localStorage.setItem("authToken", data.signin.token);
        localStorage.setItem("username", data.signin.username);
        navigate("/");
      } else {
        console.log("Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#EDDBC7]">
      <div className="max-w-md w-full p-8 bg-[#F8EAD8] border border-solid border-[#A7727D]">
        <h2 className="text-4xl font-semibold mb-6 text-[#A7727D]">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-[#A7727D]">
              <FaEnvelope className="inline-block mr-3 text-lg" />
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 border border-solid border-[#A7727D]"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-[#A7727D]">
              <FaLock className="inline-block mr-3 text-lg" />
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-solid border-[#A7727D]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            className="w-full bg-[#A7727D] text-white py-3 rounded hover:bg-[#F9F5E7] hover:text-[#A7727D] transition-colors border border-solid border-[#A7727D]"
            onClick={handleLogin}
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-gray-700 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#A7727D] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
