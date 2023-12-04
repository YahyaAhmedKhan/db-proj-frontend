import { ADD_SEAT, REMOVE_SEAT, UPDATE_PRICE } from "../actions/actionTypes";

const initialState = {
  seats: [],
};

const bookingReducer = (state = initialState, action) => {
  const { index, price } = action.payload;
  const newSeats = [...state.seats];

  switch (action.type) {
    case UPDATE_PRICE:
      newSeats[index] = price;
      return {
        ...state,
        seats: newSeats,
      };
    case ADD_SEAT:
      newSeats.push({ index, price });
      return {
        ...state,
        seats: newSeats,
      };
    case REMOVE_SEAT:
      newSeats.filter((seat) => seat.index !== index);
      return {
        ...state,
        seats: newSeats,
      };
    default:
      return state;
  }
};
module.exports = bookingReducer;
