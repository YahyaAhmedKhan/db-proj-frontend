import { Link } from "react-router-dom";
import { Navbar } from "../navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

export const AccountCreatedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center booking-page">
      <Navbar></Navbar>
      <div className="flex justify-between w-full"></div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold pt-14">Account Created Succesfully!</h1>
        <Link className="flex items-center mt-5" to={"/login"}>
          <p className="pt-4 text-3xl font-bold hover:underline">Proceed to login page</p>
          <FontAwesomeIcon className="pt-4 ml-3 text-3xl" icon={faCircleArrowRight} style={{ color: "#000000" }} />
        </Link>
      </div>
      <div className="w-screen mt-40 bg-gray-300 h-72"></div>
    </div>
  );
};
