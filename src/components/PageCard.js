import React from 'react';
import {View, Text, Image, Button, Dimensions, StyleSheet} from 'react-native';

import {SimpleStepper} from 'react-native-simple-stepper';
import {useDispatch, useSelector} from 'react-redux';
import {PLACING_ORDER} from '../redux-helpers/Types';
const screenWidth = Dimensions.get('window').width;

const PageCard = ({item, qty, qtyChanged, addToCart, items}) => {
  const {id, image, price} = item;
  return (
    <View style={styles.wrapper}>
      <Image style={styles.image} source={{uri: Image.image}} />

      <View style={styles.smallItemContainer}>
        <Text style={styles.mainText}>{item.title}</Text>
      </View>

      <View style={styles.smallItemContainer}>
        <Text style={styles.subText}>{item.description}</Text>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.priceText}>R{price}</Text>
      </View>

      <View style={styles.smallItemContainer}>
        <Text style={styles.labelText}>How many?</Text>
      </View>

      <View style={styles.itemContainer}>
        <SimpleStepper
          valueChanged={value => qtyChanged(value)}
          initialValue={1}
          minimumValue={1}
          maximumValue={10}
          showText={true}
          containerStyle={styles.stepperContainer}
          incrementImageStyle={styles.stepperButton}
          decrementImageStyle={styles.stepperButton}
          textStyle={styles.stepperText}
        />
      </View>

      <View style={styles.itemContainer}>
        <Button
          onPress={() => {
            addToCart(item, qty);
          }}
          title={
            items.find(_item => _item.id === item.id)
              ? 'Update Menu'
              : 'Add to Basket'
          }
          color="orange"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: screenWidth - 20,
    height: 200,
    marginBottom: 5,
  },
  stepperContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    borderColor: '#ccc',
  },
  itemContainer: {
    marginBottom: 20,
  },
  smallItemContainer: {
    marginBottom: 5,
  },
  mainText: {
    fontSize: 20,
  },
  subText: {
    fontSize: 14,
    marginHorizontal: 40,
    color: '#3a3a3a',
  },
  priceText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 18,
    color: '#303540',
  },
  stepperButton: {
    height: 20,
    width: 20,
  },
  stepperText: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PageCard;
