import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar";
import FlightRow from "../flight-row";
import { backendURL } from "../constants";

export const FlightsPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const [origin, setOrigin] = useState("Karachi");
  const [destination, setDestination] = useState("Dubai");
  const [date, setDate] = useState("");
  const [flightResults, setFlightResults] = useState([]);

  const handleSearch = async () => {
    try {
      const formattedDate = convertDateFormat(date); // Convert date format
      const queryParams = new URLSearchParams({
        origin,
        destination,
        date: formattedDate,
      }).toString();
      const response = await axios.post(`${backendURL}flights?${queryParams}`);

      if (response.status === 200) {
        const flightDataArray = response.data.map((flight) => ({
          flight_id: flight.flight_id,
          flight_record_id: flight.flight_record_id,
          dep_time: flight.dep_time,
          arrival_time: flight.arrival_time,
          origin: flight.origin,
          destination: flight.destination,
          base_price: flight.base_price,
          plane_id: flight.plane_id,
          total_passengers: flight.total_passengers,
        }));
        setFlightResults(flightDataArray);
        // console.log("Flight results:", flightDataArray);
      } else {
        console.error("Error searching for flights");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const convertDateFormat = (inputDate) => {
    const parts = inputDate.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
    return inputDate; // Return as is if not in expected format
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        {" "}
      </Navbar>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl mb-4 font-bold pt-14">Search for flights</h1>
        <p
          className=" w-1/2 text-center text-lg font-medium pb-8"
          style={{ width: "45%" }}
        >
          Search for the flight you want by specifying the origin and
          destination, and which day you'd like to fly. Then you can select the
          flight you want and proceed to the booking procedure.
        </p>
        <div className="flex w-3/4 h-24 mt-6 bg-gray-200 items-center px-[2%] justify-between ">
          <input
            type="text"
            // className=" text-center w-1/4 h-1/2 bg-white rounded-xl focus:outline-none focus:border focus:border-blue-500"
            className="text-center w-1/4 h-1/2 bg-white rounded-xl focus:outline-none focus:border focus:border-blue-500 hover:border hover:border-blue-500"
            placeholder="Select Origin"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
            }}
          />
          <input
            type="text"
            className="text-center w-1/4 h-1/2 bg-white rounded-xl focus:outline-none focus:border focus:border-blue-500 hover:border hover:border-blue-500 "
            // className=" text-center w-1/4 h-1/2 bg-white rounded-xl focus:outline-none focus:border focus:border-blue-500"
            placeholder="Select Destination"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
          />
          <input
            type="date"
            className="text-center w-1/5 h-1/2 pr-4 bg-white rounded-xl focus:outline-none focus:border focus:border-blue-500 hover:border hover:border-blue-500"
            // className=" text-center w-1/5 h-1/2 pr-4 bg-white rounded-xl focus:outline-none focus:border focus:border-blue-500"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <button
            type="button"
            // className=" text-center w-1/5 h-1/2 bg-white rounded-xl focus:outline-none focus:border focus:border-blue-500"
            className="text-center w-1/5 h-1/2 bg-white rounded-xl focus:outline-none hover:border hover:border-blue-500 hover:bg-blue-1 transform hover:scale-105 transition duration-50 cursor-pointer"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="flight-results w-3/4 flex flex-col mt-6 bg-gray-200 px-[2%]">
          <table className="flights-table w-full  h-full mt-3  mb-5 border-separate border-spacing-y-3 ">
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
            {flightResults.length > 0 ? (
              <tbody className=" font-medium">
                {flightResults.map((flight) => {
                  const duration = timeDifference(
                    flight.arrival_time,
                    flight.dep_time
                  );
                  console.log("Duration:", duration);
                  // console.log("arrival time:", flight.arrival_time);
                  console.log(timeDifference("22:15:00", "00:30:00")); // Outputs the time difference
                  console.log(flight.arrival_time);

                  return (
                    <tr
                      // className=" text-center bg-white"
                      className="text-center bg-white hover:bg-gray-100 transform hover:scale-105 transition duration-200 rounded-lg cursor-pointer"
                      key={flight.flight_id}
                      title="Click to book this flight"
                    >
                      <td className="py-5 rounded-l-lg">{flight.flight_id}</td>
                      <td className="font-extrabold py-5">
                        {flight.origin} - {flight.dep_time}
                      </td>
                      <td className="font-extrabold py-5">{duration}</td>
                      <td className="font-extrabold py-5">
                        {flight.destination} - {flight.arrival_time}
                      </td>
                      <td className="font-extrabold py-5">
                        {flight.total_passengers}
                      </td>
                      <td className="font-extrabold pl-10 rounded-r-lg">
                        {flight.base_price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <p className="text-lg font-semibold text-gray-700">
                      No flights found
                    </p>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        {/* <p className="m-16 relative group">
          <span>Hover over me</span>
          <span className="absolute -bottom-1 left-1/2 w-0 h-2 bg-blue-400 group-hover:w-1/2 group-hover:h-1 group-hover:transition-all"></span>
          <span className="absolute -bottom-1 right-1/2 w-0 h-2 bg-blue-400 group-hover:w-1/2 group-hover:h-1 group-hover:transition-all"></span>
        </p> */}
        <div className=" w-full h-72 bg-gray-300 mt-40"></div>
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
