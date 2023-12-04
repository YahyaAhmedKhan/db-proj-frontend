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
    <div className="bg-gray-200 p-4 my-2 rounded-md w-full">
      <div className="flex divide-x divide-gray-400">
        {/* Column 1 - Passenger number, name, date of birth, gender */}
        <div className="flex-1 px-2">
          <h3 className="font-semibold text-lg mb-1">
            Passenger {passenger.id}
          </h3>
          <p>
            <strong>Name:</strong> {passenger.name}
          </p>
          <p>
            <strong>Date of birth:</strong> {passenger.dob}
          </p>
          <p>
            <strong>Gender:</strong> {passenger.gender}
          </p>
        </div>

        {/* Column 2 - Passport number, country of residence, special needs */}
        <div className="flex-1 px-2">
          <p>
            <strong>Passport Number:</strong> {passenger.passportNumber}
          </p>
          <p>
            <strong>Country of Residence:</strong>{" "}
            {passenger.countryOfResidence}
          </p>
          <p>
            <strong>Special Needs:</strong> {passenger.specialNeeds || "None"}
          </p>
        </div>

        {/* Column 3 - Seat class, extra baggage, price */}
        <div className="flex-1 px-2">
          <div className="grid grid-rows-3 grid-flow-col gap-4">
            <div className="flex justify-between">
              <span className="font-semibold">Seat Class</span>
              <span className="font-semibold">Business</span>
              <span className="font-semibold">$483.70</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Extra Baggage</span>
              <span className="font-semibold">Yes</span>

              <span className="font-semibold">$50.00</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-semibold text-lg">$523.70</span>
            </div>
          </div>

          {/* <p>
            <strong>Extra Baggage:</strong>{" "}
            {passenger.extraBaggage ? "Yes" : "No"}
          </p>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p>${passenger.price.toFixed(2)}</p>
              <p>+ Extra Baggage: ${passenger.extraBaggagePrice.toFixed(2)}</p>
              <p className="border-t mt-1 pt-1">
                ${(passenger.price + passenger.extraBaggagePrice).toFixed(2)}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
