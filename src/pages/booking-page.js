import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../navbar";

import { useDispatch } from "react-redux";

import { faAngleLeft, faAngleRight, faArrowRight, faCircleMinus, faCirclePlus, faCommentDollar, faMinus, faPlane, faPlaneArrival, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../axiosConfig";
import { BookingForm } from "../components/booking-form";
import { addSeat, removeSeat } from "../slices/passenger-details-slice";
import { useSelector } from "react-redux";

export const BookingPage = () => {
  // const { flightId, date } = useParams();
  // const [flight, setFlight] = useState({});

  const dispatch = useDispatch();

  const seats = useSelector((state) => state.passengerFormList.length);
  const passengerForms = useSelector((state) => state.passengerFormList);
  // const flightId = useSelector((state) => state.flightDetails.flightId);
  const flight = useSelector((state) => state.flightDetails);

  const price = useMemo(() => {
    return passengerForms.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);
  }, [passengerForms]);

  const handleMinusClick = () => {
    if (seats > 1) {
      dispatch(removeSeat({ index: seats - 1 }));
    }
  };

  const handlePlusClick = () => {
    if (seats < 9) {
      dispatch(addSeat({ index: seats }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center booking-page">
      <Navbar></Navbar>
      <div className="flex justify-between w-full">
        <div className="pt-5 pl-5 text-3xl">
          <FontAwesomeIcon icon={faAngleLeft} />
          <Link className="ml-2 font-bold" to={"/flights"}>
            Return to Flights
          </Link>
        </div>
        <div className="pt-5 pr-5 text-3xl">
          <Link className="mr-2 font-bold" to={`${window.location.pathname}/confirm`}>
            Proceed to Confirmations
          </Link>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-4 text-5xl font-bold pt-14">Making your booking</h1>
        <p className=" w-[45%] text-center text-lg font-medium pb-8">Please select the number of passengers in your booking (max 9) and fill in their respective details.</p>
        <div className="flex items-center justify-center w-screen h-24 flight-info-bar bg-slate-300">
          <div className="flight-info-row font-bold text-lg flex w-[85%] justify-between items-center">
            <div className="flex items-center">
              <FontAwesomeIcon className="-rotate-45 " icon={faPlane} style={{ color: "#000000" }} />
              <p className="ml-1 ">{flight ? flight.flight_id : null}</p>
            </div>
            <p>{flight ? flight.origin : null}</p>
            <p>{flight ? flight.dep_time : null}</p>
            <FontAwesomeIcon icon={faPlaneArrival} style={{ color: "#000000" }} />
            {/* <div className="" >
              <p className="text-sm m">{timeDifference(flight.dep_time, flight.arrival_time)}</p>
              <FontAwesomeIcon
                className="ml-4 "
                icon={faMinus}
                style={{ color: "#000000", transform: "scaleX(7)" }}
              />
              <FontAwesomeIcon
                className=" ml-7"
                icon={faArrowRight}
                style={{ color: "#000000" }}
              />
            </div> */}
            <FontAwesomeIcon icon={faPlaneDeparture} style={{ color: "#000000" }} />
            <p>{flight ? flight.arrival_time : null}</p>
            <p>{flight ? flight.destination : null}</p>
            <div className="flex select-none ">
              <FontAwesomeIcon onClick={handleMinusClick} className="text-2xl transition-transform transform cursor-pointer hover:scale-110 " icon={faCircleMinus} style={{ color: "#000000" }} />
              <p className="px-3 ">Seats: {seats}</p>
              <FontAwesomeIcon onClick={handlePlusClick} className="text-2xl transition-transform transform cursor-pointer hover:text-green-500 hover:scale-110" icon={faCirclePlus} style={{ color: "#000000" }} />
            </div>
            <p>Total price: ${price}</p>
          </div>
        </div>

        <h1 className="py-4 text-4xl font-bold ">Passenger Details</h1>

        {passengerForms.map((_, index) => (
          <BookingForm key={index} index={index} base_price={flight.base_price} />
        ))}

        {/* <BookingForm></BookingForm> */}
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
