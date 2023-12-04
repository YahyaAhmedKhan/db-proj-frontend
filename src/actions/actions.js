// actions.js
import { ADD_SEAT, LOGIN, LOGOUT, REMOVE_SEAT, UPDATE_PRICE } from './actionTypes';

export const loginUser = (userData) => {
  return {
    type: LOGIN,
    payload: userData
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT
  };
};

export const updatePrice = ({index, price}) => {
  return {
    type: UPDATE_PRICE,
    payload: {index, price}
  };
}

export const addSeat = ({index, price}) => {
  return {
    type: ADD_SEAT,
    payload: {index, price}
  };
}

export const removeSeat = ({index, price}) => {
  return {
    type: REMOVE_SEAT,
    payload: {index, price}
  };
}