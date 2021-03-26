import {combineReducers} from 'redux';
import {OrdersReducer} from './OrdersReducer';
import {UserReducer} from './UserReducer';
import {ChannelReducer} from './ChannelReducer';
import {BasketReducer} from './BasketReducer';
import {UpdateReducer} from './UpdateReducer';
import {PlacingOrderReducer} from './PlacingOrderReducer';
import {ChatReducer} from './ChatReducer';

export const reducers = combineReducers({
  order: OrdersReducer,
  user: UserReducer,
  channels: ChannelReducer,
  basket: BasketReducer,
  update: UpdateReducer,
  placing: PlacingOrderReducer,
  chat: ChatReducer,
});
