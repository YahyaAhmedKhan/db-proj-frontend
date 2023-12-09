import { useEffect, useState } from "react";
import "./App.css";
import { FlightsPage } from "./pages/flights-page";
import Login from "./pages/login-page";
import SignUp from "./pages/sign-up-page";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BookingPage } from "./pages/booking-page";
import { ConfirmBookingPage } from "./pages/confirm-booking-page";
import { ThankYouPage } from "./pages/thank-you-page";
import { ErrorPage } from "./pages/error-page";
import { AccountCreatedPage } from "./pages/account-created-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/booking/:flightId/:date" element={<BookingPage />} />
        <Route path="/booking/:flightId/:date/confirm" element={<ConfirmBookingPage />} />
        <Route path="/booking/complete" element={<ThankYouPage />} />
        <Route path="/booking/error" element={<ErrorPage />} />
        <Route path="/signup/success" element={<AccountCreatedPage />} />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
