// store.js
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./reducers/authReducer";
import { passengerDetailsReducer } from "./slices/passenger-details-slice";

const rootReducer = combineReducers({
  auth: authReducer,
  passengerDetails: passengerDetailsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
