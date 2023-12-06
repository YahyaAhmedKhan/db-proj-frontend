import { Navbar } from "../navbar";

import React, { startTransition, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCommentDollar,
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const ConfirmBookingPage = () => {
  const flight = {
    arrival_time: "10:15:00",
    base_price: "250.00",
    dep_time: "09:00:00",
    destination: "Dubai",
    flight_id: "EK606",
    flight_record_id: 4,
    origin: "Karachi",
    plane_id: 101,
    seats_left: 100,
  };
  // const passengerData = {
  //   id: 1,
  //   name: "Yahya Khan",
  //   dob: "20/4/2002",
  //   gender: "Male",
  //   passportNumber: "90395380520",
  //   countryOfResidence: "Pakistan",
  //   specialNeeds: "None",
  //   seatClass: "Business",
  //   extraBaggage: true,
  //   price: 483.7,
  //   extraBaggagePrice: 50.0,
  // };

  const passengerDetails = useSelector((state) => state.passengerFormList);
  useEffect(() => {
    console.log(passengerDetails);
  });

  const passengerData = passengerDetails[0];

  useEffect(() => {
    console.log("passengerData:", passengerData);
  }, [passengerData]);

  function getPathWithoutLastSegment(url) {
    const parts = url.split("/");
    parts.pop();
    return parts.join("/");
  }

  return (
    <div className="booking-page flex flex-col items-center justify-center">
      <Navbar></Navbar>
      <div className="flex justify-between w-full">
        <div className="pl-5 pt-5 text-3xl">
          <FontAwesomeIcon icon={faAngleLeft} />
          <Link
            className="font-bold ml-2"
            to={getPathWithoutLastSegment(window.location.pathname)}
          >
            Return to Booking Page
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl mb-4 font-bold pt-14">
          Review & Confirm your Booking
        </h1>
        <p className=" w-[45%] text-center text-lg font-medium pb-8">
          Review all the passenger details and confirm your booking once you
          have done so. Press confirm and pay to complete your booking.
        </p>
        <div className="flight-info-bar bg-gray-200 py-6 px-4 w-full">
          <div className="flex items-center justify-between">
            <FontAwesomeIcon icon={faPlane} className="-rotate-45" />
            <p>{flight.flight_id}</p>
            <p>{flight.origin}</p>
            <p>{flight.dep_time}</p>
            <FontAwesomeIcon icon={faPlaneDeparture} />
            <FontAwesomeIcon icon={faPlaneArrival} />
            <p>{flight.arrival_time}</p>
            <p>{flight.destination}</p>
            <p>{flight.date}</p>
          </div>
        </div>

        <PassengerInfoCard {...passengerData} />
      </div>
    </div>
  );
};

function formatPrice(price) {
  return parseFloat(price.toFixed(2)).toFixed(2);
}

// make a dicitonrary to map seat class to price
const seatClassPrice = {
  Economy: formatPrice(250),
  Business: formatPrice(375),
  FirstClass: formatPrice(500),
};

const PassengerInfoCard = ({ index, passengerDetails, price }) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    passportNumber,
    nationality,
    gender,
    seatClass,
    specialNeeds,
    extraBaggage,
  } = passengerDetails;

  return (
    <div className="flex flex-row w-full py-4 mt-4 bg-gray-200 px-10 ">
      <div className="flex flex-col w-4/12 pr-4 space-y-1">
        <div className="flex flex-row text-xl font-medium">
          Passenger {index + 1}
        </div>
        <div className="flex flex-row font-extrabold text-2xl">
          {`${firstName} ${lastName}`}
        </div>
        <div className="flex flex-row justify-between">
          <div className="">Date of Birth </div>
          <div className=" font-bold text-right">{dateOfBirth}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="">Gender </div>
          <div className=" font-bold text-right">{gender}</div>
        </div>
      </div>
      <div className="flex flex-col w-4/12 justify-end border-r-black border pr-5 pl-4 space-y-1">
        <div className="flex flex-row justify-between">
          <div className="">Passport Number </div>
          <div className=" font-bold text-right">{passportNumber}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="">Country of Residence </div>
          <div className=" font-bold text-right">{nationality}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="">Special Needs </div>
          <div className=" font-bold text-right">
            {specialNeeds ? "Yes" : "None"}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-4/12 justify-end pl-4 space-y-1">
        <div className=" flex-row flex">
          <div className=" w-4/12">Seat Class</div>
          <div className=" w-4/12 font-bold text-right">{seatClass}</div>
          <div className=" w-4/12 text-right">{seatClassPrice[seatClass]}</div>
        </div>
        <div className=" flex-row flex">
          <div className=" w-4/12">Extra Baggage</div>
          <div className=" w-4/12  font-bold text-right">
            {extraBaggage ? "Yes" : "No"}
          </div>
          <div className=" w-4/12 text-right">50.00</div>
        </div>

        <div className=" flex flex-row justify-end">
          <div className=" flex-row flex border-y border-black box-border">
            <div className=" pr-4">$</div>
            <div>{formatPrice(price)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
