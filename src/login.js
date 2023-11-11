import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted", { email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="navbar flex justify-between items-center p-4 bg-white shadow-md w-full">
        <div className="khanair-logo inline-block rounded-lg border-2 border-black p-1 mx-2">
          <div className="navbar-brand font-bold text-xl">Khan Airlines</div>
        </div>

        <div className="navbar-menu flex items-center">
          <a href="#home" className="mx-2 text-gray-800 no-underline">
            Home
          </a>
          <a href="#experience" className="mx-2 text-gray-800 no-underline">
            The Khan Experience
          </a>
          <a href="#luggage" className="mx-2 text-gray-800 no-underline">
            Luggage Policy
          </a>
          <a href="#pricing" className="mx-2 text-gray-800 no-underline">
            Price Info
          </a>
          <Link to="/signup" className=" mx-1">
            <button className="button signup-button mx-1 border border-blue-700 rounded-md text-blue-700 px-4 py-2">
              Sign Up
            </button>
          </Link>
          <Link to="/login" className="mx-1">
            <button className="button login-button mx-1 border border-gray-600 rounded-md text-gray-600 px-4 py-2">
              Login
            </button>
          </Link>
        </div>
      </div>
      <div className="main-content text-center mt-8">
        <div className="welcome-text">
          <h1 className="text-4xl mb-4">
            Explore the world with Khan Airlines
          </h1>
        </div>
        <div className="signup-form inline-block mt-8 p-8 bg-gray-100 border border-gray-300 rounded-md">
          <form onSubmit={handleSubmit} className="flex flex-col items-stretch">
            <h2 className="mb-6">
              Create an account to make your first booking!
            </h2>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="button create-account-button py-2 border-none bg-blue-600 text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
