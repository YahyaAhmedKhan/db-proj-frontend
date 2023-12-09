// authReducer.js
import { LOGIN, LOGOUT } from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  accountId: null,
  balance: null,
  email: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        accountId: action.payload.accountId,
        balance: action.payload.balance,
        email: action.payload.email,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        accountId: null,
        balance: null,
        email: null,
      };

    default:
      return state;
  }
};
