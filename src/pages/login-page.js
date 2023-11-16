import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCircleUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

const Login = ({ isLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    values.preventDefault();
    const response = await axios.post("http://localhost:5000/login", {
      email: email,
      password: password,
    });
    const { message, token } = response.data;

    console.log("message:", message, " token:", token);
    Cookies.set("jwtToken", token, {
      expires: 1 / 24, // 1 hr
      path: "/",
      // secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar isLoggedIn={isLoggedIn}> </Navbar>
      <div className="main-content text-center mt-8">
        <div className="welcome-text">
          <h1 className="text-5xl mb-4 font-bold">
            Explore the world with Khan Airlines!
          </h1>
        </div>
        <div className="signup-form inline-block mt-8 p-8 bg-gray-100 border border-gray-300 rounded-md">
          <form onSubmit={handleSubmit} className="flex flex-col items-stretch">
            <h2 className="mb-6 font-bold text-2xl">
              Welcome back! <br /> Please login to your account.
            </h2>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded-md"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded-md"
            />
            {/* <p className=" cursor-pointer" onClick={toggleShowPassword}>
              show
            </p> */}
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