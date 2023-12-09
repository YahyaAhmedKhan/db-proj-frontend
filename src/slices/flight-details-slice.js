import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flight_id: null,
  flight_record_id: null,
  dep_time: null,
  arrival_time: null,
  origin: null,
  destination: null,
  base_price: null,
  plane_id: null,
  seats_left: null,
  date: null,
};

const flightDetailsSlice = createSlice({
  name: "flightDetails",
  initialState,
  reducers: {
    setFlightDetails: (state = initialState, action) => {
      state.flight_id = action.payload.flight_id;
      state.flight_record_id = action.payload.flight_record_id;
      state.dep_time = action.payload.dep_time;
      state.arrival_time = action.payload.arrival_time;
      state.origin = action.payload.origin;
      state.destination = action.payload.destination;
      state.base_price = action.payload.base_price;
      state.plane_id = action.payload.plane_id;
      state.seats_left = action.payload.seats_left;
      state.date = action.payload.date;
    },
    resetFlightDetails: (state = initialState, action) => {
      state.flight_id = null;
      state.flight_record_id = null;
      state.dep_time = null;
      state.arrival_time = null;
      state.origin = null;
      state.destination = null;
      state.base_price = null;
      state.plane_id = null;
      state.seats_left = null;
      state.date = null;
    },
  },
});

export const { setFlightDetails, resetFlightDetails } = flightDetailsSlice.actions;
export const flightDetailsReducer = flightDetailsSlice.reducer;
