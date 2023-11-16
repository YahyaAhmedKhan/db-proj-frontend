import { useEffect, useState } from "react";
import "./App.css";
import { FlightsPage } from "./pages/flights-page";
import Login from "./pages/login-page";
import SignUp from "./pages/sign-up-page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("jwtToken");

    if (token) {
      setIsLoggedIn(true);
      // console.log("User is logged in!");
    } else {
      setIsLoggedIn(false);
      // console.log("User is not logged in!");
    }
  }, [isLoggedIn]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} />} />
        <Route
          path="/flights"
          element={<FlightsPage isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
