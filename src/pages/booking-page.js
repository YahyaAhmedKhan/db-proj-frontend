import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../navbar";
import { useParams } from "react-router-dom";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Axios } from "axios";
import axiosInstance from "../axiosConfig";

export const BookingPage = () => {
  const { flightId, date } = useParams();
  console.log("flightId:", flightId);
  const [seats, setSeats] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    axiosInstance
      .get(`flights/${flightId}`)
      .then((response) => {
        const { data } = response;
        const { base_price } = data;
        setPrice(base_price);
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
        <div className="h-24 w-screen bg-slate-300 flex justify-center items-center">
          <div className="flex w-[75%] justify-between items-center">
            <p>{flightId} </p>
            <p>Pakistan</p>
            <p>09:00 AM</p>
            <p>10:15 AM</p>
            <p>UAE</p>
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
      </div>
    </div>
  );
};
