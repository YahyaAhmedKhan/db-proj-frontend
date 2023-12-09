import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../navbar";
import { backendURL } from "../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetFlightDetails, setFlightDetails } from "../slices/flight-details-slice";
import { formatDate, formatTimeToAMPM, timeDifference } from "../helper/helper-functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export const FlightsPage = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [flightResults, setFlightResults] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFlightDetails({}));
  }, []);

  const handleFlightClick = (flightId) => {
    // find flight object from array using flightId
    const flight = flightResults.find((flight) => flight.flight_id === flightId);
    const { flight_record_id, dep_time, arrival_time, origin, destination, base_price, plane_id, seats_left, flight_id } = flight;

    // set flight details in redux store
    const formattedDate = formatDate(date);

    dispatch(setFlightDetails({ flight_record_id, dep_time, arrival_time, origin, destination, base_price, plane_id, seats_left, flight_id, date: formattedDate }));

    navigate(`/booking/${flightId}/${formattedDate}`);
  };

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
          seats_left: flight.seats_left,
        }));
        setFlightResults(flightDataArray);

        console.log("Flight results:", flightDataArray[0]);
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
      <Navbar> </Navbar>
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-4 text-5xl font-bold pt-14">Search for flights</h1>
        <p className="w-1/2 pb-8 text-lg font-medium text-center " style={{ width: "45%" }}>
          Search for the flight you want by specifying the origin and destination, and which day you'd like to fly. Then you can select the flight you want and proceed to the booking procedure.
        </p>
        <div className="flex w-3/4 h-24 mt-6 bg-gray-200 items-center px-[2%] justify-between rounded-xl">
          <input
            type="text"
            className="w-1/4 text-center bg-white h-1/2 rounded-xl focus:outline-none focus:border focus:border-blue-500 hover:border hover:border-blue-500"
            placeholder="Select Origin"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
            }}
          />
          <input
            type="text"
            className="w-1/4 text-center bg-white h-1/2 rounded-xl focus:outline-none focus:border focus:border-blue-500 hover:border hover:border-blue-500 "
            placeholder="Select Destination"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
          />
          <input
            type="date"
            className="w-1/5 pr-4 text-center bg-white h-1/2 rounded-xl focus:outline-none focus:border focus:border-blue-500 hover:border hover:border-blue-500"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <button type="button" className="w-1/5 text-center transition transform bg-white cursor-pointer h-1/2 rounded-xl focus:outline-none hover:border hover:border-blue-500 hover:bg-blue-1 hover:scale-105 duration-50" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="flight-results w-3/4 flex flex-col mt-6 bg-gray-200 px-[2%] rounded-xl">
          <table className="w-full h-full mt-3 mb-5 border-separate flights-table border-spacing-y-3 ">
            <thead>
              <tr className="text-center underline">
                <th className="pb-3 font-medium">Flight Code</th>
                <th className="pb-3 font-medium">Departure Details</th>
                <th className="pb-3 font-medium">Flight Duration</th>
                <th className="pb-3 font-medium">Arrival Details</th>
                <th className="pb-3 font-medium">Seats Left</th>
                <th className="relative flex justify-center pb-3 pl-10 font-medium group">
                  <div>Price</div>
                  <FontAwesomeIcon className="pt-1 ml-1" icon={faCircleInfo} style={{ color: "#000000" }} />
                  <div className="absolute opacity-0 left-0 ml-[150px] w-[140px] mb-[30px] px-2 py-1 text-sm text-white bg-black rounded-lg  transform translate-x-[-20px] transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 -bottom-8">
                    This is the base price per seat
                  </div>
                </th>
              </tr>
            </thead>
            {flightResults.length > 0 ? (
              <tbody className="font-medium ">
                {flightResults.map((flight) => {
                  const duration = timeDifference(flight.arrival_time, flight.dep_time);
                  console.log("Duration:", duration);
                  console.log(timeDifference("22:15:00", "00:30:00")); // Outputs the time difference
                  console.log(flight.arrival_time);

                  return (
                    <tr
                      className="text-center transition duration-200 transform bg-white rounded-lg cursor-pointer flightRow hover:bg-gray-100 hover:scale-105 hover:shadow-xl"
                      key={flight.flight_id}
                      title="Click to book this flight"
                      onClick={() => handleFlightClick(flight.flight_id)}
                    >
                      <td className="py-5 rounded-l-lg">{flight.flight_id}</td>
                      <td className="py-5 font-extrabold">
                        {flight.origin} - {formatTimeToAMPM(flight.dep_time)}
                      </td>
                      <td className="py-5 font-extrabold">{duration}</td>
                      <td className="py-5 font-extrabold">
                        {flight.destination} - {formatTimeToAMPM(flight.arrival_time)}
                      </td>
                      <td className="py-5 font-extrabold">{flight.seats_left}</td>
                      <td className="pl-10 font-extrabold rounded-r-lg">${flight.base_price}</td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6" className="py-5 text-center">
                    <p className="text-lg font-semibold text-gray-700">No flights found</p>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        <div className="w-full mt-40 bg-gray-300 h-72"></div>
      </div>
    </div>
  );
};
