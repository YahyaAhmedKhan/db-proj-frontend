import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (values) => {
    console.log(values);
    console.log(values.target);
    console.log(values.target.values);
    values.preventDefault();
    const response = await axios.post("http://localhost:5000/accounts", {
      email: email,
      password: password,
    });
    console.log(response.data);

    console.log("Submitted", { email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="navbar flex justify-between items-center p-4 bg-white shadow-md w-full">
        <div className="khanair-logo inline-flex items-center justify-center rounded-lg border-2 border-black p-1 mx-2">
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
          <button className="button signup-button mx-1 border border-blue-700 rounded-md text-blue-700 px-4 py-2">
            Sign Up
          </button>
          <button className="button login-button mx-1 border border-gray-600 rounded-md text-gray-600 px-4 py-2">
            Login
          </button>
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
            <input
              type="password"
              placeholder="Confirm password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="button create-account-button py-2 border-none bg-blue-600 text-white"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
