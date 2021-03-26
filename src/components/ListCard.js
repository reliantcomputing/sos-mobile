import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import {RouteNames} from '../helpers/RouteNames';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';

const ListCard = ({item, item_type}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // console.log(item.image)
        navigation.navigate(RouteNames.MENU_DETAILS, {
          item: item,
          item_type: item_type,
          title: item.title,
        });
      }}>
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: item.image}} />
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
