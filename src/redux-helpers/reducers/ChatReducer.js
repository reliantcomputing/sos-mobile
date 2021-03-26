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
      return state.map((_item, index) => {
        if (_item.id !== action.payload.chatId) {
          // This isn't the _item we care about - keep it as-is
          return _item;
        }
        return {
          ..._item,
          ..._item.messages.push(action.payload),
        };
      });
    default:
      return state;
  }
};
