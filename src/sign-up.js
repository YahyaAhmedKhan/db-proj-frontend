import React, { useState } from "react";
import "./sign-up.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-up logic here
    console.log("Submitted", { email, password, confirmPassword });
  };

  return (
    <div className="signup">
      <div className="navbar">
        <div className="khanair-logo">
          <div className="navbar-brand">Khan Airlines</div>
        </div>

        <div className="navbar-menu">
          <a href="#home">Home</a>
          <a href="#experience">The Khan Experience</a>
          <a href="#luggage">Luggage Policy</a>
          <a href="#pricing">Price Info</a>
          <button className="button signup-button">Sign Up</button>
          <button className="button login-button">Login</button>
        </div>
      </div>
      <div className="main-content">
        <div className="welcome-text">
          <h1>Explore the world with Khan Airlines</h1>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <h2>Create an account to make your first booking!</h2>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="button create-account-button">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
