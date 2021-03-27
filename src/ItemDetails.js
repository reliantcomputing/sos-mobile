import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PageCard from './components/PageCard';
import Constants from './helpers/constants';
import {
  BASKET_ADD_EXTRA,
  BASKET_ADD_MENU,
  SET_ORDER,
} from './redux-helpers/Types';
import {Header, Button} from 'react-native-elements';

export const ItemDetails = ({route}) => {
  const menu = route.params.item;
  const item_type = route.params.item_type;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const extras = useSelector(state => state.basket.extras);
  const menus = useSelector(state => state.basket.menus);
  const order = useSelector(state => state.order);

  const basketButton = <Button />;

  const qtyChanged = value => {
    const nextValue = Number(value);
    setQty(nextValue);
  };

  const addToCart = (_item, qty) => {
    const item = {..._item, qty: qty};

    if (item_type === 'MENU') {
      dispatch({
        type: BASKET_ADD_MENU,
        payload: item,
      });
    } else {
      dispatch({
        type: BASKET_ADD_EXTRA,
        payload: item,
      });
    }
    if (order.id) {
      if (order.rejected) {
        dispatch({
          type: SET_ORDER,
          payload: {},
        });
      }
    }
  };

  return (
    <ScrollView>
      <PageCard
        item={menu}
        qty={qty}
        items={item_type === 'MENU' ? menus : extras}
        qtyChanged={qtyChanged}
        addToCart={addToCart}
      />
    </ScrollView>
  );
};
