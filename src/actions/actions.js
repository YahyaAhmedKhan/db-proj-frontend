// actions.js
import { ADD_SEAT, LOGIN, LOGOUT, REMOVE_SEAT, SET_FLIGHT_DETAILS, UPDATE_DETAILS, RESET_FLIGHT_DETAILS } from "./actionTypes";

export const loginUser = (userData) => {
  return {
    type: LOGIN,
    payload: userData,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};

// export const updateDetails = ({ index, passengerDetails, price }) => {
//   return {
//     type: UPDATE_DETAILS,
//     payload: { index, passengerDetails, price },
//   };
// };

// export const addSeat = ({ index }) => {
//   return {
//     type: ADD_SEAT,
//     payload: { index },
//   };
// };

// export const removeSeat = ({ index }) => {
//   return {
//     type: REMOVE_SEAT,
//     payload: { index },
//   };
// };

// export const setFlightDetails = ({ flight_record_id, dep_time, arrival_time, origin, destination, base_price, plane_id, seats_left }) => {
//   return {
//     type: SET_FLIGHT_DETAILS,
//     payload: { flight_record_id, dep_time, arrival_time, origin, destination, base_price, plane_id, seats_left },
//   };
// };
