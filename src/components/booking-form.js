import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../slices/passenger-details-slice";
import Select from "react-select";

// InputField Component
const InputField = ({ label, type, name, value, onChange }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-600">{label}</label>
    <input className="px-3 py-2 leading-tight text-gray-700 rounded-lg focus:outline-none focus:shadow-outline" type={type} name={name} value={value} onChange={onChange} />
  </div>
);

// SelectField Component
const SelectField = ({ label, name, options, value, onChange }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-600">{label}</label>
    <Select
      options={options}
      isSearchable
      placeholder={label}
      name={name}
      value={options.find((option) => option.value === value)}
      onChange={(selectedOption) =>
        onChange({
          target: {
            name,
            value: selectedOption?.value || "",
          },
        })
      }
    />
  </div>
);
// CheckboxField Component
const CheckboxField = ({ label, name, checked, onChange }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-600">{label}</label>
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={(e) => onChange(e)}
      className="w-6 h-6" // Use Tailwind CSS classes to adjust the size
    />
  </div>
);

// PriceDisplay Component
const PriceDisplay = ({ seatPrice }) => (
  <div className="flex items-center text-2xl">
    <h2 className="font-bold ">Seat Price: </h2>
    <p className="pl-2 italic font-medium ">${parseFloat(seatPrice.toFixed(2)).toFixed(2)}</p>
  </div>
);

// BookingForm Component
export const BookingForm = ({ index, base_price }) => {
  const dispatch = useDispatch();
  const passengerDetails = useSelector((state) => state.passengerFormList[index].passengerDetails);
  const seatPrice = useSelector((state) => state.passengerFormList[index].price);

  useEffect(() => {
    console.log("passengerDetails at start:", passengerDetails);
  }, [passengerDetails]);

  const countryOptions = [
    { label: "United States", value: "United States" },
    { label: "Canada", value: "Canada" },
    { label: "United Kingdom", value: "United Kingdom" },
    // Add more countries to the list
  ];

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    const updatedPassengerDetails = { ...passengerDetails, [name]: inputValue };
    dispatchUpdate(updatedPassengerDetails);
  };

  const dispatchUpdate = (updatedPassengerDetails) => {
    const updatePrice = calculateSeatPrice(updatedPassengerDetails, base_price);
    dispatch(
      updateDetails({
        index,
        passengerDetails: updatedPassengerDetails,
        price: updatePrice,
      })
    );
  };

  function calculateSeatPrice(passengerDetails, base_price) {
    const extra_charges = 50 * (passengerDetails.extraBaggage ? 1 : 0);
    const seatClassMultiplier = {
      economy: 1,
      business: 1.5,
      "first class": 2,
    };
    return base_price * (seatClassMultiplier[passengerDetails.seatClass] || 0) + extra_charges;
  }

  return (
    <div className="w-full mb-10">
      <form className="px-48 py-6 bg-gray-200 rounded-lg">
        <div className="flex justify-between form-info-top">
          <h2 className="mb-4 text-3xl font-bold">Passenger {index + 1} Details</h2>
          <PriceDisplay seatPrice={seatPrice} />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
          <InputField label="First Name" type="text" name="firstName" value={passengerDetails.firstName} onChange={handleInputChange} />
          <InputField label="Last Name" type="text" name="lastName" value={passengerDetails.lastName} onChange={handleInputChange} />
          <InputField label="Date of Birth" type="date" name="dateOfBirth" value={passengerDetails.dateOfBirth} onChange={handleInputChange} />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
          <InputField label="Passport Number" type="text" name="passportNumber" value={passengerDetails.passportNumber} onChange={handleInputChange} />
          <SelectField label="Nationality" name="nationality" options={countryOptions} value={passengerDetails.nationality} onChange={handleInputChange} />
          <SelectField
            label="Gender"
            name="gender"
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Other", value: "Other" },
              { label: "Rather not say", value: "Rather not say" },
            ]}
            value={passengerDetails.gender}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
          <SelectField
            label="Seat Class"
            name="seatClass"
            options={[
              { label: "Economy", value: "economy" },
              { label: "Business", value: "business" },
              { label: "First Class", value: "first class" },
            ]}
            value={passengerDetails.seatClass}
            onChange={handleInputChange}
          />
          <CheckboxField label="Special Needs" name="specialNeeds" checked={passengerDetails.specialNeeds} onChange={handleInputChange} />
          <CheckboxField label="Extra Baggage Allowance" name="extraBaggage" checked={passengerDetails.extraBaggage} onChange={handleInputChange} />
        </div>
      </form>
    </div>
  );
};
