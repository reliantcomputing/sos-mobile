import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import Constants from './helpers/constants';
import ListCard from './components/ListCard';
import {Header} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useTheme} from '@react-navigation/native';
import PriceListCard from './components/PriceListCard';
import {PLACING_ORDER} from './redux-helpers/Types';
import {Badge} from 'react-native-elements';
import {RouteNames} from './helpers/RouteNames';

export const Basket = () => {
  const basket = useSelector(state => state.basket);
  const orderChannel = useSelector(state => state.channels.orderChannel);
  const update = useSelector(state => state.basket.update);
  const dispatch = useDispatch();
  const placing = useSelector(state => state.placing);
  const order = useSelector(state => state.order);
  const navigation = useNavigation();

  const {colors} = useTheme();

  const renderMenu = ({item}, type = 'MENU') => {
    return <PriceListCard item={item} type={type} />;
  };
  const renderExtra = ({item}, type = 'EXTRA') => {
    return <PriceListCard item={item} type={type} />;
  };

  return (
    <View style={{flex: 1}}>
      <Header
        centerComponent={{
          text: order.id
            ? `Order Summary #${order.id}`
            : `Basket(${basket.extras.length + basket.menus.length})`,
          style: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
        }}
        backgroundColor="orange"
        containerStyle={{
          backgroundColor: 'orange',
          justifyContent: 'space-around',
        }}
      />
      <View style={{...styles.wrapper}}>
        {order.menus?.length > 0 || basket.menus?.length > 0 ? (
          <View>
            <Text
              style={{
                alignSelf: 'center',
                marginVertical: 20,
              }}>
              Menu
            </Text>
            <FlatList
              data={!!order.id ? order.menus : basket.menus}
              renderItem={renderMenu}
              contentContainerStyle={styles.list}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        ) : null}

        {order.extras?.length > 0 || basket.extras?.length > 0 ? (
          <View>
            <Text
              style={{
                alignSelf: 'center',
                marginVertical: 20,
              }}>
              Extras
            </Text>
            <FlatList
              data={!!order.id ? order.extras : basket.extras}
              renderItem={renderExtra}
              contentContainerStyle={styles.list}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        ) : null}
      </View>
      {!!!order.id && (
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
                order: {status: 'PLACED'},
              };
              orderChannel.push(`place:order`, order);
            }}
            title={placing ? 'Placing order...' : 'Place order'}
            color="orange"
          />
        </View>
      )}
      {order.status === Constants.ORDER_STATUS.REJECTED && (
        <View>
          <Badge status="error" value={Constants.ORDER_STATUS.REJECTED} />
        </View>
      )}

      {order.status === Constants.ORDER_STATUS.PLACED && (
        <View>
          <Badge status="warning" value={Constants.ORDER_STATUS.PLACED} />
        </View>
      )}

      {order.status === Constants.ORDER_STATUS.APPROVED && (
        <View style={styles.itemContainer}>
          <Button
            style={{borderRadius: 50}}
            onPress={() => {
              const payload = {
                rejected: false,
                status: Constants.ORDER_STATUS.PAID,
              };
              console.log(payload);
              orderChannel.push(`pay:order:${order.id}`, payload);
              // navigation.navigate(RouteNames.PAYMENT);
            }}
            title={'Pay'}
            color="orange"
          />
        </View>
      )}
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
