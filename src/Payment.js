import React, {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {Input} from 'react-native-elements';
import Constants from './helpers/constants';

export const Payment = () => {
  const order = useSelector(state => state.order);
  const [price, setPrice] = useState(0);
  const orderChannel = useSelector(state => state.channels.orderChannel);

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const navigation = useNavigation();

  const alert = message => {
    Alert.alert(
      'Error',
      message,
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  };

  const update = message =>
    Alert.alert(
      'Success',
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );

  useEffect(() => {
    console.log(order);
    let _price = 0;
    order.extras.forEach(item => {
      console.log('Extra', item);
      _price = _price + item.extra.price * item.qty;
    });
    order.menus.forEach(item => {
      console.log('Menu', item.menu.price);
      _price = _price + item.menu.price * item.qty;
    });
    setPrice(_price);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Input
        autoFocus
        placeholder="CARD NUMBER"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <Input
        placeholder="CARD HOLDER"
        value={cardHolder}
        onChangeText={setCardHolder}
      />
      <Input placeholder="EXPIRY" value={expiry} onChangeText={setExpiry} />
      <Input placeholder="CVC" value={cvc} onChangeText={setCvc} />
      <View style={{marginHorizontal: 30}}>
        <Button
          style={{marginHorizontal: 30}}
          title={`PAY NOW R${price}`}
          onPress={() => {
            if (
              cardNumber == '' ||
              cardHolder == '' ||
              expiry == '' ||
              cvc == ''
            ) {
              alert('Make sure all fields have values');
            } else {
              const payload = {
                rejected: false,
                status: Constants.ORDER_STATUS.PAID,
              };
              orderChannel.push(`pay:order:${order.id}`, payload);
              update('Paid successfully. Thank you for choosing us.');
            }
          }}
        />
      </View>
    </View>
  );
};
