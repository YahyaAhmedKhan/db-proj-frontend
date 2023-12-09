import { Navbar } from "../navbar";

import React, { startTransition, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faPlane, faPlaneArrival, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Axios } from "axios";
import axiosInstance from "../axiosConfig";
import { backendURL } from "../constants";
import { formatTimeToAMPM } from "../helper/helper-functions";
import { UPDATE_BALANCE } from "../actions/actionTypes";

export const ConfirmBookingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const flight = useSelector((state) => state.flightDetails);
  const accountId = useSelector((state) => state.auth.accountId);
  const flightRecordId = useSelector((state) => state.flightDetails.flight_record_id);

  function mapPassengerDetails(passengers) {
    const genderMap = {
      male: "M",
      female: "F",
      other: "O",
      "rather not say": "X",
    };

    return passengers.map((passenger) => {
      const { firstName, lastName, dateOfBirth, passportNumber, nationality, gender, seatClass, specialNeeds, extraBaggage } = passenger.passengerDetails;

      const price = passenger.price;

      return {
        firstName,
        lastName,
        dateOfBirth,
        passportNumber,
        nationality,
        gender: genderMap[gender.toLowerCase()] || "X",
        seatClass,
        specialNeeds,
        extraBaggage,
        price,
      };
    });
  }

  const passengerDetailsList = useSelector((state) => state.passengerFormList);

  function getPathWithoutLastSegment(url) {
    const parts = url.split("/");
    parts.pop();
    return parts.join("/");
  }
  const passengerDetails = mapPassengerDetails(passengerDetailsList);

  const bookingDetails = {
    accountId,
    flightRecordId,
    passengerDetails,
  };

  const handleConfirmBooking = async () => {
    const url = "booking/makeBooking";
    console.log(bookingDetails);

    try {
      const response = await axiosInstance.post(`${backendURL}booking/makeBooking`, bookingDetails);
      if (response.status === 200) {
        navigate("/booking/complete");
      } else {
        console.error("Error booking flight");
        navigate("/booking/complete");
      }
    } catch (error) {
      console.error("Network error:", error);
      navigate("/booking/error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center booking-page">
      <Navbar></Navbar>
      <div className="flex justify-between w-full">
        <div className="pt-5 pl-5 text-3xl">
          <FontAwesomeIcon icon={faAngleLeft} />
          <Link className="ml-2 font-bold" to={getPathWithoutLastSegment(window.location.pathname)}>
            Return to Booking Page
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-4 text-5xl font-bold pt-14">Review & Confirm your Booking</h1>
        <p className=" w-[45%] text-center text-lg font-medium pb-8">Review all the passenger details and confirm your booking once you have done so. Press confirm and pay to complete your booking.</p>
        <div className="w-full px-4 py-6 bg-gray-200 flight-info-bar">
          <div className="flex items-center justify-between px-6 font-bold">
            <div className="flex font-medium">
              <FontAwesomeIcon icon={faPlane} className="pt-1 mr-4 -rotate-45" />
              <p>{flight.flight_id}</p>
            </div>
            <p>{flight.origin}</p>
            <p>{formatTimeToAMPM(flight.dep_time)}</p>
            <FontAwesomeIcon icon={faPlaneDeparture} />
            <FontAwesomeIcon icon={faPlaneArrival} />
            <p>{formatTimeToAMPM(flight.arrival_time)}</p>
            <p>{flight.destination}</p>
            <p>{flight.date}</p>
          </div>
        </div>

        {passengerDetails.map((passenger, index) => (
          <PassengerInfoCard key={index} index={index} passengerDetails={passenger} price={passenger.price} />
        ))}

        <div className="flex justify-end w-full ">
          <Link className="mt-10 transition transform bg-white border-[3px] border-black cursor-pointer h-1/2 rounded-xl focus:outline-none hover:bg-blue-1 hover:scale-105 duration-600" onClick={handleConfirmBooking}>
            <div className="px-2 py-1 text-xl font-bold rounded-lg p">Confirm & Pay Now</div>
          </Link>
        </div>
      </div>
      <div className="w-screen mt-40 bg-gray-300 h-72"></div>
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
  "first class": formatPrice(500),
};

const seatClassMap = {
  economy: "Economy",
  business: "Business",
  "first class": "First Class",
};

const genderMap = {
  M: "Male",
  F: "Female",
  O: "Other",
  X: "Rather not say",
};

function formatDate(inputDate) {
  const dateParts = inputDate.split("-");
  const year = dateParts[0];
  const month = new Date(inputDate).toLocaleString("default", {
    month: "short",
  });
  const day = dateParts[2];
  return `${day} ${month} ${year}`;
}

const PassengerInfoCard = ({ index, passengerDetails, price }) => {
  const { firstName, lastName, dateOfBirth, passportNumber, nationality, gender, seatClass, specialNeeds, extraBaggage } = passengerDetails;

  return (
    <div className="flex flex-row w-full px-10 py-4 mt-4 bg-gray-200 ">
      <div className="flex flex-col w-4/12 pr-4 space-y-1">
        <div className="flex flex-row text-xl font-medium">Passenger {index + 1}</div>
        <div className="flex flex-row text-2xl font-extrabold">{`${firstName} ${lastName}`}</div>
        <div className="flex flex-row justify-between">
          <div className="">Date of Birth </div>
          <div className="font-bold text-right ">{formatDate(dateOfBirth)}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="">Gender </div>
          <div className="font-bold text-right ">{genderMap[gender]}</div>
        </div>
      </div>
      <div className="flex flex-col justify-end w-4/12 pl-4 pr-5 space-y-1 border border-r-black">
        <div className="flex flex-row justify-between">
          <div className="">Passport Number </div>
          <div className="font-bold text-right ">{passportNumber}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="">Country of Residence </div>
          <div className="font-bold text-right ">{nationality}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="">Special Needs </div>
          <div className="font-bold text-right ">{specialNeeds ? "Yes" : "None"}</div>
        </div>
      </div>
      <div className="flex flex-col justify-end w-4/12 pl-4 space-y-1">
        <div className="flex flex-row ">
          <div className="w-4/12 ">Seat Class</div>
          <div className="w-4/12 font-bold text-right ">{seatClassMap[seatClass]}</div>
          <div className="w-4/12 font-semibold text-right ">{seatClassPrice[seatClass]}</div>
        </div>
        <div className="flex flex-row ">
          <div className="w-4/12 ">Extra Baggage</div>
          <div className="w-4/12 font-bold text-right ">{extraBaggage ? "Yes" : "No"}</div>
          <div className="w-4/12 font-semibold text-right ">{extraBaggage ? "50.00" : "0.00"}</div>
        </div>

        <div className="flex flex-row justify-end ">
          <div className="box-border flex flex-row border-black border-y">
            <div className="pr-4 ">$</div>
            <div className="font-semibold ">{formatPrice(price)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
