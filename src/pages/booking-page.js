import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../navbar";

import { useDispatch } from "react-redux";

import {
  faAngleLeft,
  faAngleRight,
  faArrowRight,
  faCircleMinus,
  faCirclePlus,
  faCommentDollar,
  faMinus,
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../axiosConfig";
import { BookingForm } from "../components/booking-form";
import { addSeat, removeSeat } from "../slices/passenger-details-slice";
import { useSelector } from "react-redux";

export const BookingPage = () => {
  const { flightId, date } = useParams();
  // const [seats, setSeats] = useState(1);
  // const [price, setPrice] = useState(423.2);
  const [flight, setFlight] = useState({});
  // const [passengerForms, setPassengerForms] = useState([]);

  const dispatch = useDispatch();

  const seats = useSelector((state) => state.passengerFormList.length);
  const passengerForms = useSelector((state) => state.passengerFormList);

  const price = useMemo(() => {
    return passengerForms.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);
  }, [passengerForms]);

  useEffect(() => {
    dispatch(addSeat({ index: 0 }));
    // console.log("Passenger forms:", passengerForms);
  }, []);

  useEffect(() => {
    axiosInstance
      .post(`flights/${flightId}`)
      .then((response) => {
        const flightData = response.data;
        setFlight(flightData[0]); // Set flight details in state
        // console.log("Flight details:", flight);

        // setPrice(flight.base_price * 1);
      })
      .catch((error) => {
        console.error("Error fetching flight details:", error);
      });
  }, [flightId]);

  const handleMinusClick = () => {
    if (seats > 1) {
      // setSeats(seats - 1);
      dispatch(removeSeat({ index: seats - 1 }));
      // setPassengerForms(passengerForms.slice(0, seats - 1));
    }
  };

  const handlePlusClick = () => {
    if (seats < 9) {
      // setSeats(seats + 1);
      dispatch(addSeat({ index: seats }));
      // setPassengerForms([...passengerForms, {}]);
    }
  };

  return (
    <div className="booking-page flex flex-col items-center justify-center">
      <Navbar></Navbar>
      <div className="flex justify-between w-full">
        <div className="pl-3 pt-3 text-3xl">
          <FontAwesomeIcon icon={faAngleLeft} />
          <Link className="font-semibold ml-2" to={"/flights"}>
            Return to Flights
          </Link>
        </div>
        <div className="pr-3 pt-3 text-3xl">
          <Link className="font-semibold mr-2">Proceed to Confirmations</Link>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>

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
            <div className=" flex select-none">
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

        {passengerForms.map((_, index) => (
          <BookingForm
            key={index}
            index={index}
            base_price={flight.base_price}
          />
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
