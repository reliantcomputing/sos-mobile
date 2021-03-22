import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import Constants from './helpers/constants';
import ListCard from './components/ListCard';
import {Header} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import PriceListCard from './components/PriceListCard';
import {PLACING_ORDER} from './redux-helpers/Types';

const axios = require('axios');

export const Basket = () => {
  const basket = useSelector(state => state.basket);
  const orderChannel = useSelector(state => state.channels.orderChannel);
  const [menu, setMenu] = useState([]);
  const [query, setQuery] = useState('');
  const extras = useSelector(state => state.basket.extras);
  const menus = useSelector(state => state.basket.menus);
  const update = useSelector(state => state.basket.update);
  const dispatch = useDispatch();
  const placing = useSelector(state => state.placing);

  const {colors} = useTheme();

  useEffect(() => {
    axios.get(`${Constants.BASE_URL}/api/menus`).then(res => {
      setMenu(res.data.data);
    });
  }, []);

  const renderFood = ({item}) => {
    return <PriceListCard item={item} />;
  };

  return (
    <View style={{flex: 1}}>
      <Header
        centerComponent={{text: 'Basket', style: {color: '#fff'}}}
        backgroundColor="orange"
        containerStyle={{
          backgroundColor: 'orange',
          justifyContent: 'space-around',
        }}
      />
      <View style={{...styles.wrapper}}>
        <Text
          style={{
            alignSelf: 'center',
            marginVertical: 20,
          }}>
          Menu
        </Text>
        <FlatList
          data={menus}
          renderItem={renderFood}
          contentContainerStyle={styles.list}
          keyExtractor={item => item.id.toString()}
        />
        <Text
          style={{
            alignSelf: 'center',
            marginVertical: 20,
          }}>
          Extras
        </Text>
        <FlatList
          data={extras}
          renderItem={renderFood}
          contentContainerStyle={styles.list}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View style={styles.itemContainer}>
        <Button
          style={{borderRadius: 50}}
          onPress={() => {
            dispatch({
              type: PLACING_ORDER,
              payload: true,
            });
            const order = {
              ...basket,
              sit_number: '1',
              order: {rejected_reason: 'Tedd', status: 'PLACED'},
            };
            orderChannel.push(`place:order`, order);
          }}
          title={placing ? 'Placing order...' : 'Place order'}
          color="orange"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerButtonContainer: {
    marginRight: 10,
  },
  itemContainer: {
    marginBottom: 20,
    marginHorizontal: 30,
  },
  wrapper: {
    flex: 1,
    padding: 10,
  },
  topWrapper: {
    flexDirection: 'row',
  },
  textInputWrapper: {
    flex: 4,
  },
  textInput: {
    height: 35,
    borderColor: '#5d5d5d',
    borderWidth: 1,
  },
  buttonWrapper: {
    flex: 1,
  },
  list: {
    marginTop: 20,
  },
});
