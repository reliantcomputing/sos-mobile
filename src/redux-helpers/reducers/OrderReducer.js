import {ADD_ORDER, SET_ORDER} from '../Types';

export const OrderReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.payload;
    default:
      break;
  }
};
