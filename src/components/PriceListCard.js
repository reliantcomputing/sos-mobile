import React, {useState} from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import {RouteNames} from '../helpers/RouteNames';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';

const PriceListCard = ({item, type}) => {
  const navigation = useNavigation();
  const extras = useSelector(state => state.basket.extras);
  const menus = useSelector(state => state.basket.menus);
  const [price] = useState(
    item.extra ? item.extra.price : item.menu ? item.menu.price : item.price,
  );
  const [title] = useState(
    item.extra ? item.extra.title : item.menu ? item.menu.title : item.title,
  );
  console.log('Item', item);
  console.log('Type', type);
  return (
    <TouchableOpacity
      onPress={() => {
        // console.log(item.image)
        navigation.navigate(RouteNames.MENU_DETAILS, {
          item: item,
          item_type: type,
          title: item.title,
          items: type === 'MENU' ? menus : extras,
        });
      }}>
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={require('../assets/image.jpg')} />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>Qty: {item.qty}</Text>
          <Text style={styles.subtitle}>R{price}</Text>
          <Text style={styles.subtitle}>Cost: R{price * item.qty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  //
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  imageWrapper: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#303540',
  },
  description: {
    fontSize: 16,
    marginRight: 10,
    color: '#303540',
  },
});

export default PriceListCard;
