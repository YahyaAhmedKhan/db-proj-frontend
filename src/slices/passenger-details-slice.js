import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    index: 0,
    passengerDetails: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      passportNumber: "",
      nationality: "",
      gender: "",
      seatClass: "",
      specialNeeds: false,
      extraBaggage: false,
    },
    price: 0,
  },
];

const passengerDetailsSlice = createSlice({
  name: "passengerDetails",
  initialState,
  reducers: {
    addSeat: (state, action) => {
      const { index } = action.payload;
      state.push({
        index,
        passengerDetails: {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          passportNumber: "",
          nationality: "",
          gender: "",
          seatClass: "",
          specialNeeds: false,
          extraBaggage: false,
        },
        price: 0,
      });
    },
    updateDetails: (state, action) => {
      const { index, passengerDetails, price } = action.payload;
      state[index] = {
        ...state[index],
        passengerDetails,
        price,
      };
    },
    removeSeat: (state, action) => {
      const { index } = action.payload;
      const removeIndex = state.findIndex((item) => item.index === index);
      if (removeIndex !== -1) {
        state.splice(removeIndex, 1);
      }
    },
  },
});

export const { addSeat, updateDetails, removeSeat } = passengerDetailsSlice.actions;
export const passengerDetailsReducer = passengerDetailsSlice.reducer;
