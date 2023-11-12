import "./App.css";
import { FlightsPage } from "./flights-page";
import Login from "./login";
import SignUp from "./sign-up-page";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/flights" element={<FlightsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
