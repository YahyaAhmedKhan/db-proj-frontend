import React, { useState } from "react";
import axios from "axios";
import { Navbar } from "../navbar";
import { backendURL } from "../constants";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (values) => {
    console.log(values);
    console.log(values.target);
    console.log(values.target.values);
    values.preventDefault();
    const response = await axios.post(`${backendURL}accounts`, {
      email: email,
      password: password,
    });
    console.log(response.data);

    console.log("Submitted", { email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar> </Navbar>

      <div className="main-content text-center mt-8">
        <div className="welcome-text">
          <h1 className="text-5xl mb-4 font-bold">
            Explore the world with Khan Airlines!
          </h1>
        </div>
        <div className="signup-form inline-block mt-8 p-8 bg-gray-100 border border-gray-300 rounded-md">
          <form onSubmit={handleSubmit} className="flex flex-col items-stretch">
            <div className=" max-w-xs">
              <h2 className="mb-6 font-bold text-2xl">
                Create an account to make your first booking!
              </h2>
            </div>

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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
