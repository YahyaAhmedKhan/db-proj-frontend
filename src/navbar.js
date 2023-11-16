import { faCaretDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn }) {
  console.log("isLoggedIn:", isLoggedIn);
  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    Cookies.remove("jwtToken", { path: "/" });
  };

  return (
    <div className="navbar flex justify-between items-center p-4 bg-white shadow-md w-full">
      <div className="khanair-logo inline-flex items-center justify-center rounded-lg border-4 border-black px-2 py-1 mx-2">
        <div className="navbar-brand font-extrabold text-xl ">
          Khan Airlines
        </div>
      </div>

      <div className="navbar-menu flex items-center font-semibold">
        <a href="#home" className="mx-2 text-gray-800 no-underline">
          Home
        </a>
        <a href="#experience" className="mx-2 text-gray-800 no-underline">
          The Khan Experience
        </a>
        <a href="#luggage" className="mx-2 text-gray-800 no-underline">
          Luggage Policy
        </a>
        <a href="#pricing" className="mx-2 text-gray-800 no-underline">
          Price Info
        </a>
        <Link to="/flights">
          <p className="mx-2 text-gray-800 no-underline"> Flights</p>
        </Link>
        {!isLoggedIn ? (
          <>
            <Link to="/signup" className=" mx-1">
              <button className="button signup-button mx-1 border-2 border-blue-700 rounded-md text-blue-700 px-4 py-2 hover:bg-slate-100">
                Sign Up
              </button>
            </Link>
            <Link to="/login" className="mx-1">
              <button className="button login-button mx-1 border-2 border-gray-600 rounded-md text-gray-600 px-4 py-2 hover:bg-slate-100">
                Login
              </button>
            </Link>
          </>
        ) : (
          <div
            className=" ml-8 flex flex-row justify-between items-center hover:bg-gray-200 rounded-md px-2 py-1 gap-2"
            onClick={handleLogout}

          >
            <FontAwesomeIcon className="" icon={faCaretDown} />
            <FontAwesomeIcon icon={faCircleUser} />
            <p className=" text-xl font-bold ">Yahya Ahmed</p>{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
