import {LOAD_CHANNELS} from '../Types';

export const ChannelReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CHANNELS:
      return action.payload;
    default:
      return state;
  }
};
