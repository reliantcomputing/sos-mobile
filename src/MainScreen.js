import React, {Fragment, useEffect} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Alert} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteNames} from './helpers/RouteNames';
import {Chats} from './Chats';
import {Extras} from './Extras';
import {Menu} from './Menu';
import {Basket} from './Basket';
import {joinChannels} from './redux-helpers/actions/ChannelAction';

import {useDispatch, useSelector} from 'react-redux';
import {UPDATES} from './redux-helpers/Types';
import Constants from './helpers/constants';

const Tab = createBottomTabNavigator();

const axios = require('axios');

const MainScreen = () => {
  const basket = useSelector(state => state.basket);
  const order = useSelector(state => state.order);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const update = useSelector(state => state.update);

  const alert = message => {
    Alert.alert(
      'Info',
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

  useEffect(() => {
    dispatch(joinChannels());
  }, []);

  useEffect(() => {
    if (update === Constants.UPDATE.ORDER_REJECTED) {
      alert('Your has been rejected');
      dispatch({
        type: UPDATES,
        payload: '',
      });
    } else if (update === Constants.UPDATE.ORDER_APPROVED) {
      alert('Your has been approved.');
      dispatch({
        type: UPDATES,
        payload: '',
      });
    } else if (update === Constants.UPDATE.ORDER_PLACED) {
      alert('Your has been placed successfully.');
      dispatch({
        type: UPDATES,
        payload: '',
      });
    } else if (update === Constants.UPDATE.ORDER_PAID) {
      alert('Your has been paid successfully.');
      dispatch({
        type: UPDATES,
        payload: '',
      });
    }
  }, [update]);

  return (
    <Fragment>
      <Tab.Navigator
        initialRouteName={RouteNames.MENU}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === RouteNames.MENU) {
              iconName = 'home-outline';
            } else if (route.name === RouteNames.CHATS) {
              iconName = 'mail-outline';
            } else if (route.name === RouteNames.EXTRAS) {
              iconName = 'notifications-outline';
            } else if (route.name === RouteNames.BASKET) {
              iconName = 'cart-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          labelStyle: {fontSize: 12},
          showIcon: true,
        }}>
        <Tab.Screen name={RouteNames.MENU} component={Menu} />

        <Tab.Screen name={RouteNames.EXTRAS} component={Extras} />
        <Tab.Screen
          name={RouteNames.BASKET}
          component={Basket}
          options={{
            tabBarBadge: basket.extras.length + basket.menus.length,
          }}
        />
        <Tab.Screen
          name={RouteNames.CHATS}
          component={Chats}
          options={{
            tabBarBadge: 0,
          }}
        />
      </Tab.Navigator>
    </Fragment>
  );
};

export default MainScreen;
