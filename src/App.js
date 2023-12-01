import { useEffect, useState } from "react";
import "./App.css";
import { FlightsPage } from "./pages/flights-page";
import Login from "./pages/login-page";
import SignUp from "./pages/sign-up-page";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BookingPage } from "./pages/booking-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/booking/:flightId/:date" element={<BookingPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
