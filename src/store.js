// store.js
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./reducers/authReducer";
import { passengerDetailsReducer } from "./slices/passenger-details-slice";
import { flightDetailsReducer } from "./slices/flight-details-slice";

const rootReducer = combineReducers({
  auth: authReducer,
  passengerFormList: passengerDetailsReducer,
  flightDetails: flightDetailsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
