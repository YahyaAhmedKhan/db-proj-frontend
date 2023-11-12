import React, { useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import FlightRow from "./flight-row";

export const FlightsPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (values) => {
    console.log(values);
    console.log(values.target);
    console.log(values.target.values);
    values.preventDefault();
    const response = await axios.post("http://localhost:5000/accounts", {
      email: email,
      password: password,
    });
    console.log(response.data);

    console.log("Submitted", { email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl mb-4 font-bold pt-10">Search for flights</h1>
        <p
          className=" w-1/2 text-center text-lg font-medium leading-6"
          style={{ width: "45%" }}
        >
          Search for the flight you want by specifying the origin and
          destination, and which day you'd like to fly. Then you can select the
          flight you want and proceed to the booking procedure.
        </p>
        <div className=" flex w-3/4 h-24 mt-6 bg-gray-200 items-center px-[2%] justify-between">
          <div className="w-[26%] h-[50%] bg-white rounded-xl"></div>
          <div className="w-[26%] h-[50%] bg-white rounded-xl"></div>
          <div className="w-[20%] h-[50%] bg-white rounded-xl"></div>
          <div className="w-[20%] h-[50%] bg-white rounded-xl"></div>
        </div>

        <div className="flight-results w-3/4 flex flex-col mt-6 bg-gray-200 px-[2%]">
          <table className="flights-table w-full  h-full mt-3  mb-5 border-separate border-spacing-y-3">
            <thead>
              <tr className="text-center underline">
                <th className="pb-3 font-medium">Flight Code</th>
                <th className="pb-3 font-medium">Departure Details</th>
                <th className="pb-3 font-medium">Flight Duration</th>
                <th className="pb-3 font-medium">Arrival Details</th>
                <th className="pb-3 font-medium">Seats Left</th>
                <th className="pb-3 pl-10 font-medium">Price</th>
              </tr>
            </thead>
            <tbody className=" font-medium">
              {[
                {
                  flightCode: "EK606",
                  departureDetails: "Pakistan 09:00 AM",
                  flightDuration: "6 hours",
                  arrivalDetails: "UAE 10:15 AM",
                  seatsLeft: "20",
                  price: "$499.00",
                },
                {
                  flightCode: "EK606",
                  departureDetails: "Pakistan 09:00 AM",
                  flightDuration: "6 hours",
                  arrivalDetails: "UAE 10:15 AM",
                  seatsLeft: "20",
                  price: "$499.00",
                },
                {
                  flightCode: "EK606",
                  departureDetails: "Pakistan 09:00 AM",
                  flightDuration: "6 hours",
                  arrivalDetails: "UAE 10:15 AM",
                  seatsLeft: "20",
                  price: "$499.00",
                },
                {
                  flightCode: "EK606",
                  departureDetails: "Pakistan 09:00 AM",
                  flightDuration: "6 hours",
                  arrivalDetails: "UAE 10:15 AM",
                  seatsLeft: "20",
                  price: "$499.00",
                },
                {
                  flightCode: "EK606",
                  departureDetails: "Pakistan 09:00 AM",
                  flightDuration: "6 hours",
                  arrivalDetails: "UAE 10:15 AM",
                  seatsLeft: "20",
                  price: "$499.00",
                },
              ].map((flight) => {
                return (
                  <>
                    <tr className=" text-center bg-white">
                      <td className="py-5">{flight.flightCode}</td>
                      <td className="font-extrabold py-5">
                        {flight.departureDetails}
                      </td>
                      <td className="font-extrabold py-5">
                        {flight.flightDuration}
                      </td>
                      <td className="font-extrabold py-5">
                        {flight.arrivalDetails}
                      </td>
                      <td className="font-extrabold py-5">
                        {flight.seatsLeft}
                      </td>
                      <td className="font-extrabold pl-10">{flight.price}</td>
                    </tr>
                    
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className=" w-full h-72 bg-gray-300 mt-40"></div>
      </div>
    </div>
  );
};
