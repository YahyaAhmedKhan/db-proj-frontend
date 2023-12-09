import { Link } from "react-router-dom";
import { Navbar } from "../navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center booking-page">
      <Navbar></Navbar>
      <div className="flex justify-between w-full"></div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold pt-14">Sorry!</h1>
        <h1 className="pt-6 w-[70%] text-4xl font-bold text-center">It seems an error occurred while making your booking :(</h1>
        <Link className="flex items-center" to={"/flights"}>
          <FontAwesomeIcon className="pt-4 mr-3 text-3xl" icon={faCircleArrowLeft} style={{ color: "#000000" }} />
          <p className="pt-4 text-2xl font-bold hover:underline">Return to flights page</p>
        </Link>
      </div>
      <div className="w-screen mt-40 bg-gray-300 h-72"></div>
    </div>
  );
};
