import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import {RouteNames} from '../helpers/RouteNames';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';

const ListCard = ({item, item_type}) => {
  const navigation = useNavigation();
  const extras = useSelector(state => state.basket.extras);
  const menus = useSelector(state => state.basket.menus);
  return (
    <TouchableOpacity
      onPress={() => {
        // console.log(item.image)
        navigation.navigate(RouteNames.MENU_DETAILS, {
          item: item,
          item_type: item_type,
          title: item.title,
          items: item_type === 'MENU' ? menus : extras,
        });
      }}>
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={require('../assets/image.jpg')} />
        </View>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.subtitle}>R{item.price}</Text>
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

export default ListCard;
