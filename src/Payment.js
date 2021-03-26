import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import CreditCardForm, {Button} from 'rn-credit-card';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

export const Payment = () => {
  const order = useSelector(state => state.order);
  const [price, setPrice] = useState(0);
  const navigation = useNavigation();
  const orderChannel = useSelector(state => state.channels.orderChannel);
  const formMethods = useForm({
    // to trigger the validation on the blur event
    mode: 'onBlur',
    defaultValues: {
      holderName: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
    },
  });
  const {handleSubmit, formState} = formMethods;

  function onSubmit(model) {
    console.log('Button clicked');
    const payload = {
      rejected: false,
      status: Constants.ORDER_STATUS.PAID,
    };
    orderChannel.push(`pay:order:${order.id}`, payload);
    // Alert.alert('Success: ' + JSON.stringify(model, null, 2));
    // navigation.goBack();
  }

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
    <FormProvider {...formMethods}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.avoider}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <CreditCardForm
            LottieView={LottieView}
            horizontalStart
            overrides={{
              labelText: {
                marginTop: 16,
              },
            }}
          />
        </KeyboardAvoidingView>
        {formState.isValid && (
          <Button
            style={styles.button}
            title={`${'CONFIRM PAYMENT'} R${price}`}
            onPress={handleSubmit(onSubmit)}
          />
        )}
      </SafeAreaView>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    margin: 36,
    marginTop: 0,
    backgroundColor: 'orange',
  },
});
