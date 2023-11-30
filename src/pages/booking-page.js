import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../navbar";
import { useParams } from "react-router-dom";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const BookingPage = () => {
  const { flightId } = useParams();
  console.log("flightId:", flightId);
  const [seats, setSeats] = useState(0);
  const [price, setPrice] = useState(0);

  return (
    <div className="booking-page flex flex-col items-center justify-center">
      <Navbar></Navbar>
      <div className=" flex flex-col items-center justify-center">
        <h1 className="text-5xl mb-4 font-bold pt-14">Making your booking</h1>
        <p className=" w-[70%] text-center text-lg font-medium pb-8">
          Please select the number of passengers in your booking (max 9) and
          fill in their respective details.
        </p>
        <div className=" h-24 w-screen bg-slate-300 justify-center items-center">
          <div className=" flex w-[75%] justify-between center">
            <p>{flightId} </p>
            <p>Pakistan</p>
            <p>09:00 AM</p>
            <p>10:15 AM</p>
            <p>UAE</p>
            <FontAwesomeIcon
              icon={faCircleMinus}
              style={{ color: "#000000" }}
            />
            <p>Seats: {seats}</p>

            <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#000000" }} />

            <p>Total price: ${price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
