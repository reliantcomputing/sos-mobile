import {
  BASKET_ADD_EXTRA,
  BASKET_ADD_MENU,
  BASKET_REMOVE_EXTRA,
  BASKET_REMOVE_MENU,
  RESET_BASKET,
} from '../Types';

export const BasketReducer = (state = {extras: [], menus: []}, action) => {
  switch (action.type) {
    case BASKET_ADD_EXTRA:
      old_extra = state.extras.find(m => m.title === action.payload.title);
      let _extras;
      if (!old_extra) {
        _extras = [...state.extras, action.payload];
      } else {
        _extras = state.extras.map((item, index) => {
          if (item.title === action.payload.title) {
            return action.payload;
          } else {
            return item;
          }
        });
      }
      return {...state, extras: _extras};
    case BASKET_ADD_MENU:
      old_menu = state.menus.find(m => m.title === action.payload.title);
      let _menu;
      if (!old_menu) {
        _menu = [...state.menus, action.payload];
      } else {
        _menu = state.menus.map((item, index) => {
          if (item.title === action.payload.title) {
            return action.payload;
          } else {
            return item;
          }
        });
      }
      return {...state, menus: _menu};
    case BASKET_REMOVE_MENU:
      return {
        ...state,
        menus: state.menus.filter(_m => _menu.id !== action.payload),
      };
    case BASKET_REMOVE_EXTRA:
      return {
        ...state,
        extras: state.extras.filter(_e => _e.id !== action.payload),
      };
    case RESET_BASKET:
      const new_state = {extras: [], menus: []};
      return new_state;
    default:
      return state;
  }
};
