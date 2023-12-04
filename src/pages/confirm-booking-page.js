import Navbar from "../navbar";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
  const passengerData = {
    id: 1,
    name: "Yahya Khan",
    dob: "20/4/2002",
    gender: "Male",
    passportNumber: "90395380520",
    countryOfResidence: "Pakistan",
    specialNeeds: "None",
    seatClass: "Business",
    extraBaggage: true,
    price: 483.7,
    extraBaggagePrice: 50.0,
  };

  return (
    <div className="booking-page flex flex-col items-center justify-center">
      <Navbar></Navbar>

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

        <PassengerInfoCard passenger={passengerData} />
      </div>
    </div>
  );
};

const PassengerInfoCard = ({ passenger }) => {
  return (
    <div className="flex flex-row w-full py-4 mt-4 bg-gray-200 px-10">
      <div className="flex flex-col w-4/12 pr-4">
        <div className="flex flex-row text-xl font-medium"> Passenger 1</div>
        <div className="flex flex-row font-extrabold text-2xl"> Yahya Khan</div>
        <div className="flex flex-row justify-between">
          <div className="">date of birth </div>
          <div className=" font-bold text-right">20/4/2002 </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="">Gender </div>
          <div className=" font-bold text-right">Male </div>
        </div>
      </div>
      <div className="flex flex-col w-4/12 justify-end border-r-black border pr-5 pl-4">
        <div className="flex flex-row justify-between">
          <div className="">Passport Number </div>
          <div className=" font-bold text-right">90395380520 </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="">Country of residence </div>
          <div className=" font-bold text-right">Pakistan </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="">Special Needs </div>
          <div className=" font-bold text-right">None </div>
        </div>
      </div>
      <div className="flex flex-col w-4/12 justify-end pl-4">
        <div className=" flex-row flex">
          <div className=" w-4/12">Seat Class</div>
          <div className=" w-4/12 font-bold text-right">Business</div>
          <div className=" w-4/12 text-right">483.70</div>
        </div>
        <div className=" flex-row flex">
          <div className=" w-4/12">Extra Baggage</div>
          <div className=" w-4/12  font-bold text-right">Yes</div>
          <div className=" w-4/12 text-right">50.00</div>
        </div>

        <div className=" flex flex-row justify-end">
          <div className=" flex-row flex border-y border-black box-border">
            <div className=" pr-4">$</div>
            <div>523.70</div>
          </div>
        </div>
      </div>
    </div>
  );
};
