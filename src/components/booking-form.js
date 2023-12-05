import React, { useEffect, useState } from "react";
export const BookingForm = ({ index, base_price }) => {


  
  const [passengerDetails, setPassengerDetails] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    passportNumber: "",
    nationality: "",
    gender: "",
    seatClass: "",
    specialNeeds: false,
    extraBaggage: false,
  });
  const [seatPrice, setSeatPrice] = useState(0);

  const handleInputChange = (e) => {
    // console.log("before: ", passengerDetails);
    const { name, value, type, checked } = e.target;

    setPassengerDetails({
      ...passengerDetails,
      [name]: type === "checkbox" ? checked : value,
    });
    // console.log("after:", passengerDetails);
  };

  useEffect(() => {
    setSeatPrice(base_price * 0);

    const extra_charges = 50 * (passengerDetails.extraBaggage ? 1 : 0);

    if (passengerDetails.seatClass === "Economy") {
      setSeatPrice(base_price * 1 + extra_charges);
    } else if (passengerDetails.seatClass === "Business") {
      setSeatPrice(base_price * 1.5 + extra_charges);
    } else if (passengerDetails.seatClass === "First Class") {
      setSeatPrice(base_price * 2 + extra_charges);
    } else if (passengerDetails.seatClass === "none") {
      setSeatPrice(0);
    }
  }, [passengerDetails.seatClass, base_price, passengerDetails.extraBaggage]);

  return (
    <div className="w-full mb-10">
      <form
        // onSubmit={handleSubmit}
        className="bg-gray-200 px-48 py-6 rounded-lg"
      >
        <div className="form-info-top justify-between flex">
          <h2 className="text-3xl mb-4 font-bold">
            Passenger {index + 1} Details
          </h2>
          <div className="flex text-2xl items-center">
            <h2 className=" font-bold">Seat Price: </h2>
            <p className="pl-2 italic font-medium ">
              ${parseFloat(seatPrice.toFixed(2)).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              First Name
            </label>
            <input
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              type="text"
              name="firstName"
              value={passengerDetails.firstName}
              onChange={handleInputChange}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Last Name
            </label>
            <input
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              type="text"
              name="lastName"
              value={passengerDetails.lastName}
              onChange={handleInputChange}
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Date of Birth
            </label>
            <input
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              type="date"
              name="dateOfBirth"
              value={passengerDetails.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Passport Number */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Passport Number
            </label>
            <input
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              type="text"
              name="passportNumber"
              value={passengerDetails.passportNumber}
              onChange={handleInputChange}
            />
          </div>

          {/* Nationality */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Nationality
            </label>
            <input
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              type="text"
              name="nationality"
              value={passengerDetails.nationality}
              onChange={handleInputChange}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Gender
            </label>
            <select
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              name="gender"
              value={passengerDetails.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Rather not say">Rather not say</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Seat Class */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Seat Class
            </label>
            <select
              className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-lg"
              name="seatClass"
              value={passengerDetails.seatClass}
              onChange={handleInputChange}
            >
              <option value="none">Select Seat Class</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First Class">First Class</option>
            </select>
          </div>

          {/* Special Needs */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Special Needs
            </label>
            <input
              type="checkbox"
              name="specialNeeds"
              checked={passengerDetails.specialNeeds}
              onChange={handleInputChange}
            />
          </div>

          {/* Extra Baggage Allowance */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-medium mb-1">
              Extra Baggage Allowance
            </label>
            <input
              type="checkbox"
              name="extraBaggage"
              checked={passengerDetails.extraBaggage}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
