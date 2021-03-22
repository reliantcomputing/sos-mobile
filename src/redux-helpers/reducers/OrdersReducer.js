import {LOAD_ORDERS, SET_ORDER, UPDATE_ORDER} from '../Types';

export const OrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.payload;
    case SET_ORDER:
      return action.payload;
    case UPDATE_ORDER:
      return action.payload;
    default:
      return state;
  }
};
