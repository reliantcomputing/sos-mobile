import {ADD_MESSAGE, CREATE_CHAT, CREATE_PENDING_CHAT} from '../Types';

export const ChatReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CHAT:
      console.log('CREATE CHAT IS CALLED: ', action.payload);
      const _payload = action.payload;
      return _payload;
    case CREATE_PENDING_CHAT:
      console.log('CREATE PENDING CHAT IS CALLED: ', action.payload);
      return action.payload;
    case ADD_MESSAGE:
      console.log('CREATE MESSAGE IS CALLED: ', action.payload);
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      console.log('DEFAULT IS CALLED: ', action.payload);
      return state;
  }
};
