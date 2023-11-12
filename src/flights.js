import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

const Flights = () => {
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
        <div className=" flex w-3/4 h-24 mt-6 bg-gray-300 items-center px-[2%] justify-between">
          <div className="w-[26%] h-[50%] bg-white rounded-xl"></div>
          <div className="w-[26%] h-[50%] bg-white rounded-xl"></div>
          <div className="w-[20%] h-[50%] bg-white rounded-xl"></div>
          <div className="w-[20%] h-[50%] bg-white rounded-xl"></div>
        </div>
        <div className="w-3/4 h-96 mt-6 bg-gray-300 px-[2%]">
          <table className="w-full h-full mt-5">
            <thead>
              <tr className="text-center">
                <th>Flight Code</th>
                <th>Departure Details</th>
                <th>Flight Duration</th>
                <th>Arrival Details</th>
                <th>Seats Left</th>
                <th className="pl-10 ml">Price</th>
              </tr>
            </thead>
            <tbody className=" font-medium">
              <tr className=" text-center">
                <td>EK606</td>
                <td>Pakistan 09:00 AM</td>
                <td>6 hours</td>
                <td>UAE 10:15 AM</td>
                <td>20</td>
                <td className="pl-10">$499</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Flights;
