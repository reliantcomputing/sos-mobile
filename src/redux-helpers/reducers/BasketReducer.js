import {
  BASKET_ADD_EXTRA,
  BASKET_ADD_MENU,
  BASKET_REMOVE_EXTRA,
  BASKET_REMOVE_MENU,
} from '../Types';

export const BasketReducer = (state = {extras: [], menus: []}, action) => {
  switch (action.type) {
    case BASKET_ADD_EXTRA:
      _extras = [...state.extras, action.payload];
      console.log(_extras);
      return {...state, extras: _extras};
    case BASKET_ADD_MENU:
      _menu = [...state.menus, action.payload];
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
    default:
      return state;
  }
};
