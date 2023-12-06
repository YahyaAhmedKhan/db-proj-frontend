import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../slices/passenger-details-slice";
import Select from "react-select";

export const BookingForm = ({ index, base_price }) => {
  const dispatch = useDispatch();

  const passengerDetails = useSelector(
    (state) => state.passengerFormList[index].passengerDetails
  );

  useEffect(() => {
    console.log("passengerDetails at start:", passengerDetails);
  }, [passengerDetails]);

  const seatPrice = useSelector(
    (state) => state.passengerFormList[index].price
  );
  const countryOptions = [
    { label: "United States", value: "United States" },
    { label: "Canada", value: "Canada" },
    { label: "United Kingdom", value: "United Kingdom" },
    // Add more countries to the list
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedPassengerDetails = { ...passengerDetails };

    if (type === "checkbox") {
      updatedPassengerDetails[name] = checked;
    } else {
      updatedPassengerDetails[name] = value;
    }

    console.log("passengerDetails before dispatch:", passengerDetails);

    console.log("updatedPassengerDetails:", updatedPassengerDetails);

    console.log("index:", index);

    const updatePrice = calculateSeatPrice(updatedPassengerDetails, base_price);

    dispatch(
      updateDetails({
        index,
        passengerDetails: updatedPassengerDetails,
        price: updatePrice,
      })
    );
    console.log("passengerDetails after dispatch:", passengerDetails);
  };

  function calculateSeatPrice(passengerDetails, base_price) {
    const extra_charges = 50 * (passengerDetails.extraBaggage ? 1 : 0);

    if (passengerDetails.seatClass === "economy") {
      return base_price * 1 + extra_charges;
    } else if (passengerDetails.seatClass === "business") {
      return base_price * 1.5 + extra_charges;
    } else if (passengerDetails.seatClass === "first Class") {
      return base_price * 2 + extra_charges;
    } else if (passengerDetails.seatClass === "none") {
      return 0;
    }

    return 0; // Default to 0 if seatClass is not recognized
  }
  return (
    <div className="w-full mb-10">
      <form
        // onSubmit={handleSubmit}
        className="px-48 py-6 bg-gray-200 rounded-lg"
      >
        <div className="flex justify-between form-info-top">
          <h2 className="mb-4 text-3xl font-bold">
            Passenger {index + 1} Details
          </h2>
          <div className="flex items-center text-2xl">
            <h2 className="font-bold ">Seat Price: </h2>
            <p className="pl-2 italic font-medium ">
              ${parseFloat(seatPrice.toFixed(2)).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              className="px-3 py-2 leading-tight text-gray-700 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              name="firstName"
              value={passengerDetails.firstName}
              onChange={handleInputChange}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              className="px-3 py-2 leading-tight text-gray-700 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              name="lastName"
              value={passengerDetails.lastName}
              onChange={handleInputChange}
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
              Date of Birth
            </label>
            <input
              className="px-3 py-2 leading-tight text-gray-700 rounded-lg focus:outline-none focus:shadow-outline"
              type="date"
              name="dateOfBirth"
              value={passengerDetails.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
          {/* Passport Number */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
              Passport Number
            </label>
            <input
              className="px-3 py-2 leading-tight text-gray-700 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              name="passportNumber"
              value={passengerDetails.passportNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
              Nationality
            </label>
            <Select
              options={countryOptions}
              isSearchable
              placeholder="Select Nationality"
              name="nationality"
              value={countryOptions.find(
                (option) => option.value === passengerDetails.nationality
              )}
              onChange={(selectedOption) =>
                handleInputChange({
                  target: {
                    name: "nationality",
                    value: selectedOption?.value || "",
                  },
                })
              }
              styles={{
                control: (provided) => ({
                  ...provided,
                  border: "1px solid #e2e8f0", // Add border to match other fields
                  borderRadius: "0.375rem", // Add border-radius to match other fields
                  boxShadow: "none", // Remove box-shadow
                  "&:hover": {
                    borderColor: "#cbd5e1", // Change hover border color to gray
                  },
                }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: "0.375rem", // Add border-radius to the dropdown
                }),
                option: (provided, state) => ({
                  ...provided,
                  color: state.isSelected ? "black" : "inherit", // Make selected text black
                }),
              }}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
              Gender
            </label>
            <select
              className="px-3 py-2 leading-tight text-gray-700 rounded-lg focus:outline-none focus:shadow-outline"
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

        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
          {/* Seat Class */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
              Seat Class
            </label>
            <select
              className="px-3 py-2 leading-tight text-gray-700 rounded-lg focus:outline-none focus:shadow-outline"
              name="seatClass"
              value={passengerDetails.seatClass}
              onChange={handleInputChange}
            >
              <option value="none">Select Seat Class</option>
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first class">First Class</option>
            </select>
          </div>

          {/* Special Needs */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">
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
            <label className="mb-1 text-sm font-medium text-gray-600">
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
