import {ADD_MESSAGE, CREATE_CHAT, CREATE_PENDING_CHAT} from '../Types';

export const ChatReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CHAT:
      console.log(action.payload);
      return action.payload;
    case CREATE_PENDING_CHAT:
      console.log(action.payload);
      return action.payload;
    case ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.push(action.payload),
      };
    default:
      return state;
  }
};
