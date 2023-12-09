import { faCaretDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "./actions/actionTypes";
import { formatPrice } from "./helper/helper-functions";

export function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const email = useSelector((state) => state.auth.email);
  const balance = useSelector((state) => state.auth.balance);
  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const handleLogout = () => {
    Cookies.remove("jwtToken", { path: "/" });
    dispatch({ type: LOGOUT });
  };

  return (
    <div className="flex items-center justify-between w-full p-4 bg-white shadow-md navbar">
      <div className="inline-flex items-center justify-center px-2 py-1 mx-2 border-4 border-black rounded-lg khanair-logo">
        <div className="text-xl font-extrabold navbar-brand ">Khan Airlines</div>
      </div>

      <div className="flex items-center font-semibold navbar-menu ">
        <a href="#home" className="mx-2 text-gray-800 no-underline hover:text-blue-600 ">
          Home
        </a>

        <a href="#experience" className="mx-2 text-gray-800 no-underline hover:text-blue-600">
          The Khan Experience
        </a>
        <a href="#luggage" className="mx-2 text-gray-800 no-underline hover:text-blue-600">
          Luggage Policy
        </a>
        <a href="#pricing" className="mx-2 text-gray-800 no-underline hover:text-blue-600">
          Price Info
        </a>
        <Link to="/flights">
          <p className="mx-2 text-gray-800 no-underline hover:text-blue-600"> Flights</p>
        </Link>
        {!isLoggedIn ? (
          <>
            <Link to="/signup" className="mx-1 ">
              <button className="px-4 py-2 mx-1 text-blue-700 border-2 border-blue-700 rounded-md button signup-button hover:bg-slate-100">Sign Up</button>
            </Link>
            <Link to="/login" className="mx-1">
              <button className="px-4 py-2 mx-1 text-gray-600 border-2 border-gray-600 rounded-md button login-button hover:bg-slate-100">Login</button>
            </Link>
          </>
        ) : (
          <div className="relative select-none" ref={dropdownRef}>
            <div className="flex items-center gap-2 px-2 py-1 ml-8 rounded-md cursor-pointer hover:bg-gray-200" onClick={toggleDropdown}>
              <FontAwesomeIcon className="text-xl " icon={faCircleUser} />
              <p className="text-xl font-bold ">{email}</p>
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {showDropdown && (
              <div className="absolute right-0 z-10 w-40 mt-2 bg-white border rounded shadow-lg">
                <p className="block px-4 py-2 text-sm hover:bg-gray-100">Balance: ${formatPrice(balance)}</p>
                <a className="block px-4 py-2 text-sm hover:bg-gray-100" href="#" onClick={handleLogout}>
                  Logout
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
