import {PLACING_ORDER} from '../Types';

export const PlacingOrderReducer = (state = false, action) => {
  switch (action.type) {
    case PLACING_ORDER:
      return action.payload;
    default:
      return state;
  }
};
