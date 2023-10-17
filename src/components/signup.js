import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../graphql";
import Logo from "./Logo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const { data } = await registerMutation({
        variables: { email, password, username, firstname, lastname },
      });

      if (data.signup.success) {
        console.log("Signed up successfully");
        navigate("/login");
      } else {
        if (!data.signup.success) {
          const notify = () => toast.error("username or email may already exist!");
          notify();
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div>
        <div className="flex justify-center pb-10">
          <Logo />
        </div>
        <div className=" p-8 bg-white border border-solid border-gray-300 w-[400px] rounded-2xl shadow-lg shadow-cyan-500/50">
          <h2 className="text-4xl font-semibold mb-4 text-cyan-500">
            Create an Account
          </h2>
          <p className="text-sm text-gray-700 mb-6">
            Fill out the form below to get started.
          </p>
          <form onSubmit={handleSignup}>
            <div className="flex">
              <div className="m-2">
                <label className="block mb-1 font-medium text-gray-700">
                  <FaUser className="inline-block mr-2 text-cyan-500" />
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-100 rounded-lg border border-solid border-cyan-500 pl-10 focus:ring-cyan-500 focus:border-cyan-500"
                  value={firstname}
                  onChange={(e) => setfirstName(e.target.value)}
                  required
                />
              </div>
              <div className="m-2">
                <label className="block mb-1 font-medium text-gray-700">
                  <FaUser className="inline-block mr-2 text-cyan-500" />
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-100 rounded-lg border border-solid border-cyan-500 pl-10 focus:ring-cyan-500 focus:border-cyan-500"
                  value={lastname}
                  onChange={(e) => setlastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex">
              <div className="m-2">
                <label className="block mb-1 font-medium text-gray-700">
                  <FaEnvelope className="inline-block mr-2 text-cyan-500" />
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-3 bg-gray-100 rounded-lg border border-solid border-cyan-500 pl-10 focus:ring-cyan-500 focus:border-cyan-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="m-2">
                <label className="block mb-1 font-medium text-gray-700">
                  <FaUser className="inline-block mr-2 text-cyan-500" />
                  Username
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-100 rounded-lg border border-solid border-cyan-500 pl-10 focus:ring-cyan-500 focus:border-cyan-500"
                  value={username}
                  onChange={(e) => setuserName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="m-2">
              <label className="block mb-1 font-medium text-gray-700">
                <FaLock className="inline-block mr-2 text-cyan-500" />
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 bg-gray-100 rounded-lg border border-solid border-cyan-500 pl-10 focus:ring-cyan-500 focus:border-cyan-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              onClick={handleSignup}
              className="w-full bg-cyan-500 mt-2 text-white py-3 rounded-lg hover:bg-cyan-600 hover:text-gray-100 transition-colors border border-solid border-cyan-500"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;