// authReducer.js
import { LOGIN, LOGOUT } from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  user: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
      };
    default:
      return state;
  }
};
