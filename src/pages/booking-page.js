import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../navbar";
import { useParams } from "react-router-dom";
import {
  faArrowRight,
  faCircleMinus,
  faCirclePlus,
  faMinus,
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";

export const BookingPage = () => {
  const { flightId, date } = useParams();
  const [seats, setSeats] = useState(0);
  const [price, setPrice] = useState(0);
  const [flight, setFlight] = useState({});

  useEffect(() => {
    axiosInstance
      .post(`flights/${flightId}`)
      .then((response) => {
        const flightData = response.data;
        setFlight(flightData[0]); // Set flight details in state
        console.log("Flight details:", flight);

        setPrice(flight.base_price);
      })
      .catch((error) => {
        console.error("Error fetching flight details:", error);
      });
  }, [flightId]);

  const handleMinusClick = () => {
    if (seats > 0) {
      setSeats(seats - 1);
    }
  };

  const handlePlusClick = () => {
    if (seats < 9) {
      setSeats(seats + 1);
    }
  };

  return (
    <div className="booking-page flex flex-col items-center justify-center">
      <Navbar></Navbar>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl mb-4 font-bold pt-14">Making your booking</h1>
        <p className=" w-[45%] text-center text-lg font-medium pb-8">
          Please select the number of passengers in your booking (max 9) and
          fill in their respective details.
        </p>
        <div className="flight-info-bar h-24 w-screen bg-slate-300 flex justify-center items-center">
          <div className="flight-info-row font-bold text-lg flex w-[85%] justify-between items-center">
            <div className="flex items-center">
              <FontAwesomeIcon
                className=" -rotate-45"
                icon={faPlane}
                style={{ color: "#000000" }}
              />
              <p className=" ml-1">{flight ? flight.flight_id : null}</p>
            </div>
            <p>{flight ? flight.origin : null}</p>
            <p>{flight ? flight.dep_time : null}</p>
            <FontAwesomeIcon
              icon={faPlaneArrival}
              style={{ color: "#000000" }}
            />
            {/* <div className="" >
              <p className=" text-sm m">{timeDifference(flight.dep_time, flight.arrival_time)}</p>
              <FontAwesomeIcon
                className=" ml-4"
                icon={faMinus}
                style={{ color: "#000000", transform: "scaleX(7)" }}
              />
              <FontAwesomeIcon
                className=" ml-7"
                icon={faArrowRight}
                style={{ color: "#000000" }}
              />
            </div> */}
            <FontAwesomeIcon
              icon={faPlaneDeparture}
              style={{ color: "#000000" }}
            />
            <p>{flight ? flight.arrival_time : null}</p>
            <p>{flight ? flight.destination : null}</p>
            <div className=" flex">
              <FontAwesomeIcon
                onClick={handleMinusClick}
                className="text-2xl cursor-pointer hover:scale-110 transform transition-transform "
                icon={faCircleMinus}
                style={{ color: "#000000" }}
              />
              <p className=" px-3">Seats: {seats}</p>
              <FontAwesomeIcon
                onClick={handlePlusClick}
                className="text-2xl hover:text-green-500 cursor-pointer hover:scale-110 transform transition-transform"
                icon={faCirclePlus}
                style={{ color: "#000000" }}
              />
            </div>
            <p>Total price: ${price}</p>
          </div>
        </div>

        <h1 className=" font-bold text-4xl py-4">Passenger Details</h1>

        <BookingForm></BookingForm>
        <BookingForm></BookingForm>
      </div>
    </div>
  );
};

function timeDifference(time1, time2) {
  // Function to convert time string to minutes
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  // Convert both times to minutes
  const minutes1 = timeToMinutes(time1);
  const minutes2 = timeToMinutes(time2);

  // Calculate the difference in minutes
  let diff = Math.abs(minutes2 - minutes1);

  // Convert the difference back to hours and minutes
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return `${hours}hr ${minutes}mins`;
}

const BookingForm = () => {
  const [passengerDetails, setPassengerDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    nationality: "",
    gender: "",
    specialNeeds: false,
    extraBaggage: false,
  });
  const [seatPrice, setSeatPrice] = useState(523.7);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPassengerDetails({
      ...passengerDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="w-full mb-10">
      <form
        // onSubmit={handleSubmit}
        className="bg-gray-200 px-48 py-6 rounded-lg"
      >
        <div className="form-info-top justify-between flex">
          <h2 className="text-3xl mb-4 font-bold">Passenger 1 Details</h2>
          <div className="flex text-2xl items-center">
            <h2 className=" font-bold">Seat Price: </h2>
            <p className="pl-2 italic font-medium ">
              ${parseFloat(seatPrice.toFixed(2)).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              First Name
            </label>
            <input
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              type="text"
              name="firstName"
              value={passengerDetails.firstName}
              onChange={handleInputChange}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Last Name
            </label>
            <input
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              type="text"
              name="lastName"
              value={passengerDetails.lastName}
              onChange={handleInputChange}
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Date of Birth
            </label>
            <input
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              type="date"
              name="dateOfBirth"
              value={passengerDetails.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Passport Number */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Passport Number
            </label>
            <input
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              type="text"
              name="passportNumber"
              value={passengerDetails.passportNumber}
              onChange={handleInputChange}
            />
          </div>

          {/* Nationality */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Nationality
            </label>
            <input
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              type="text"
              name="nationality"
              value={passengerDetails.nationality}
              onChange={handleInputChange}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Gender
            </label>
            {/* <input
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              type="text"
              name="gender"
              value={passengerDetails.gender}
              onChange={handleInputChange}
            /> */}
            <select
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              name="gender"
              value={passengerDetails.gender}
              onChange={handleInputChange}
            >
              <option value="Economy">Male</option>
              <option value="Business">Female</option>
              <option value="First Class">Other</option>
              <option value="Rather not say">Rather not say</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Seat Class */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Seat Class
            </label>
            <select
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              name="seatClass"
              value={passengerDetails.seatClass}
              onChange={handleInputChange}
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First Class">First Class</option>
            </select>
          </div>

          {/* Special Needs */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Special Needs
            </label>
            <input
              type="checkbox"
              name="specialNeeds"
              checked={passengerDetails.specialNeeds}
              onChange={handleInputChange}
            />
          </div>

          {/* Extra Baggage Allowance */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Extra Baggage Allowance
            </label>
            <input
              type="checkbox"
              name="extraBaggage"
              checked={passengerDetails.extraBaggage}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
