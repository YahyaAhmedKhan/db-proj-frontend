import { Link } from "react-router-dom";
import { Navbar } from "../navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const ThankYouPage = () => {
  return (
    <div className="flex flex-col items-center justify-center booking-page">
      <Navbar></Navbar>
      <div className="flex justify-between w-full"></div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold pt-14">Booking Succesful</h1>
        <h1 className="pt-6 text-4xl font-bold text-center">
          Thank you for choosing to fly with <br></br> Khan Airlines!
        </h1>
        <Link className="flex items-center" to={"/flights"}>
          <FontAwesomeIcon className="pt-4 mr-3 text-3xl" icon={faCircleArrowLeft} style={{ color: "#000000" }} />
          <p className="pt-4 text-2xl font-bold hover:underline">Return to flights page</p>
        </Link>
      </div>
      <div className="w-screen mt-40 bg-gray-300 h-72"></div>
    </div>
  );
};
