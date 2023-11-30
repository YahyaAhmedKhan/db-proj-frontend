// store.js
import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers can be added here
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
