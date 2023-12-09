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

      <div className="mt-8 text-center main-content">
        <div className="welcome-text">
          <h1 className="mb-4 text-5xl font-bold">Explore the world with Khan Airlines!</h1>
        </div>
        <div className="inline-block p-8 mt-8 bg-gray-100 border border-gray-300 rounded-md signup-form">
          <form onSubmit={handleSubmit} className="flex flex-col items-stretch">
            <div className="max-w-xs ">
              <h2 className="mb-6 text-2xl font-bold">Create an account to make your first booking!</h2>
            </div>

            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 mb-4 border border-gray-300 rounded-md" />
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 mb-4 border border-gray-300 rounded-md" />
            <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="p-2 mb-4 border border-gray-300 rounded-md" />
            <button type="submit" className="py-2 text-white bg-blue-600 border-none button create-account-button">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
