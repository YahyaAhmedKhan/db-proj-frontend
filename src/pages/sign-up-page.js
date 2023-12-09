import React, { useState } from "react";
import axios from "axios";
import { Navbar } from "../navbar";
import { backendURL } from "../constants";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  };

  //check if password is 8 characters long
  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const isValidConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  const handleSubmit = async (values) => {
    values.preventDefault();
    const response = await axios.post(`${backendURL}accounts`, {
      email: email,
      password: password,
    });
    console.log(response.data);

    console.log("Submitted", { email, password });
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(!isValidEmail(newEmail));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(!isValidPassword(newPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordError(!isValidConfirmPassword(password, newConfirmPassword));
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

            <input type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} className="p-2 mb-2 border border-gray-300 rounded-md" />
            {email && emailError && <p className="pl-2 mb-2 text-sm text-left text-red-500">Please enter a valid email</p>}
            <input type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} className="p-2 mt-2 mb-4 border border-gray-300 rounded-md" />
            {password && passwordError && <p className="pl-2 mb-2 text-sm text-left text-red-500">Password must be at least 8 characters long</p>}
            <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={handleConfirmPasswordChange} className="p-2 mb-4 border border-gray-300 rounded-md" />
            {confirmPassword && confirmPasswordError && <p className="pl-2 mb-2 text-sm text-left text-red-500">Passwords do not match</p>}
            <button type="submit" className="py-2 font-semibold text-white bg-blue-600 border-none rounded-lg button create-account-button">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
