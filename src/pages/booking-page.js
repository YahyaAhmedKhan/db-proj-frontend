import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../navbar";

import { useDispatch } from "react-redux";

import { faAngleLeft, faAngleRight, faCircleMinus, faCirclePlus, faPlane, faPlaneArrival, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
import { BookingForm } from "../components/booking-form";
import { addSeat, removeSeat } from "../slices/passenger-details-slice";
import { useSelector } from "react-redux";
import { formatPrice, formatTimeToAMPM } from "../helper/helper-functions";

export const BookingPage = () => {
  const dispatch = useDispatch();

  const seats = useSelector((state) => state.passengerFormList.length);
  const passengerForms = useSelector((state) => state.passengerFormList);
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
          <Link to={"/flights"} className="relative flex inline-block font-bold group">
            <FontAwesomeIcon icon={faAngleLeft} className="pt-1 transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
            <div className="ml-3">Return to Flights</div>
          </Link>
        </div>
        <div className="pt-5 pr-5 text-3xl">
          <Link to={`${window.location.pathname}/confirm`} className="relative flex inline-block mr-2 font-bold group">
            <div className="mr-2">Proceed to Confirmations</div>
            <FontAwesomeIcon icon={faAngleRight} className="pt-1 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-4 text-5xl font-bold pt-14">Making your booking</h1>
        <p className=" w-[45%] text-center text-lg font-medium pb-8">Please select the number of passengers in your booking (max 9) and fill in their respective details.</p>
        <div className="flex items-center justify-center w-screen h-24 flight-info-bar bg-slate-300">
          <div className="flight-info-row font-bold text-lg flex w-[85%] justify-between items-center">
            <div className="flex items-center font-medium">
              <FontAwesomeIcon className="-rotate-45 " icon={faPlane} style={{ color: "#000000" }} />
              <p className="ml-1 ">{flight ? flight.flight_id : null}</p>
            </div>
            <p>{flight ? flight.origin : null}</p>
            <p>{flight ? formatTimeToAMPM(flight.dep_time) : null}</p>
            <FontAwesomeIcon icon={faPlaneArrival} style={{ color: "#000000" }} />
            <FontAwesomeIcon icon={faPlaneDeparture} style={{ color: "#000000" }} />
            <p>{flight ? formatTimeToAMPM(flight.arrival_time) : null}</p>
            <p>{flight ? flight.destination : null}</p>
            <div className="flex select-none ">
              <FontAwesomeIcon onClick={handleMinusClick} className="text-2xl transition-transform transform cursor-pointer hover:scale-110 " icon={faCircleMinus} style={{ color: "#000000" }} />
              <p className="px-3 ">Seats: {seats}</p>
              <FontAwesomeIcon onClick={handlePlusClick} className="text-2xl transition-transform transform cursor-pointer hover:text-green-500 hover:scale-110" icon={faCirclePlus} style={{ color: "#000000" }} />
            </div>
            <div className="w-[200px] flex justify-between">
              <p className="">Total price:</p>
              <p className="text-right ">${formatPrice(price)}</p>
            </div>
          </div>
        </div>

        <h1 className="py-4 text-4xl font-bold ">Passenger Details</h1>

        {passengerForms.map((_, index) => (
          <BookingForm key={index} index={index} base_price={flight.base_price} />
        ))}
      </div>
    </div>
  );
};
