import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PageCard from './components/PageCard';
import Constants from './helpers/constants';
import {BASKET_ADD_EXTRA, BASKET_ADD_MENU} from './redux-helpers/Types';
import {Header, Button} from 'react-native-elements';

export const MenuDetails = ({route}) => {
  const basket = useSelector(state => state.basket);
  const menu = route.params.item;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const orderChannel = useSelector(state => state.channels.orderChannel);
  console.log(useSelector(state => state.channels));

  const basketButton = <Button />;

  const qtyChanged = value => {
    const nextValue = Number(value);
    setQty(nextValue);
  };

  const addToCart = (_item, qty) => {
    const item = {..._item, qty: qty};
    dispatch({
      type: BASKET_ADD_EXTRA,
      payload: item,
    });

    const order = {
      ...basket,
      sit_number: '1',
      order: {rejected_reason: 'Tedd', status: 'PLACED'},
    };
    orderChannel.push(`place:order`, order);
  };

  return (
    <ScrollView>
      <PageCard
        item={menu}
        qty={qty}
        qtyChanged={qtyChanged}
        addToCart={addToCart}
      />
    </ScrollView>
  );
};
