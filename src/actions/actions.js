// actions.js
import { LOGIN, LOGOUT } from "./actionTypes";

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
