import React, { useState } from "react";
import { Navbar } from "../navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { backendURL } from "../constants";
import { loginUser } from "../actions/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = ({ loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    values.preventDefault();
    const response = await axios.post(`${backendURL}login`, {
      email: email,
      password: password,
    });

    const { message, token, accountId, balance } = response.data;
    const emailRes = response.data.email;

    console.log("message:", message, " token:", token, "email:", emailRes, "accountId:", accountId, "balance:", balance);
    Cookies.set("jwtToken", token, {
      expires: 1 / 24, // 1 hr
      path: "/",
      // secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    // setIsLoggedIn(true);
    loginUser({ token, email, password, balance, accountId });
    navigate("/flights");
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
            <h2 className="mb-6 text-2xl font-bold">
              Welcome back! <br /> Please login to your account.
            </h2>
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 mb-4 border border-gray-300 rounded-md" />
            <input type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 mb-4 border border-gray-300 rounded-md" />
            <button type="submit" className="py-2 font-semibold text-white bg-blue-600 border-none rounded-lg button create-account-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// // Map Redux state to component props
const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

// Map Redux actions to component props
const mapDispatchToProps = {
  loginUser, // This should be an action creator that dispatches login action
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
