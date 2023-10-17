import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      if (data.signin.success) {
        console.log("Logged in successfully");
        localStorage.setItem("authToken", data.signin.token);
        localStorage.setItem("username", data.signin.username);
        navigate("/");
      } else {
        console.log("Login failed.");
        if(!data.signin.success)
        {
          const notify = () => toast.error("wrong username or password !");
          notify();
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="items justify-center">
        <div className="flex justify-center pb-10">
          <Logo />
        </div>
        <div className="max-w-md w-full p-8 bg-white border border-solid border-gray-300 rounded-2xl shadow-lg shadow-cyan-400/50 ">
          <h2 className="text-4xl font-semibold mb-6 text-cyan-400">
            Login to Your Account
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block mb-2 font-medium text-cyan-400">
                <FaEnvelope className="inline-block mr-3 text-lg" />
                Username
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-solid border-cyan-400 focus:ring-cyan-400 focus:border-cyan-400"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium text-cyan-400">
                <FaLock className="inline-block mr-3 text-lg" />
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 rounded-lg border border-solid border-cyan-400 focus:ring-cyan-400 focus:border-cyan-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className="w-full bg-cyan-400 text-white py-3 rounded-lg hover:bg-cyan-600 hover:text-gray-100 transition-colors border border-solid border-cyan-400"
              onClick={handleLogin}
            >
              Log In
            </button>
          </form>
          <p className="mt-6 text-gray-700 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;