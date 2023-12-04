// store.js
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  // booking: bookingReducer,

});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
