import {combineReducers} from 'redux';
import {OrdersReducer} from './OrdersReducer';
import {UserReducer} from './UserReducer';
import {ChannelReducer} from './ChannelReducer';
import {BasketReducer} from './BasketReducer';
import {UpdateReducer} from './UpdateReducer';
import {PlacingOrderReducer} from './PlacingOrderReducer';

export const reducers = combineReducers({
  orders: OrdersReducer,
  user: UserReducer,
  channels: ChannelReducer,
  basket: BasketReducer,
  update: UpdateReducer,
  placing: PlacingOrderReducer,
});
