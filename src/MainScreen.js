import React, {Fragment, useEffect} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteNames} from './helpers/RouteNames';
import {Chats} from './Chats';
import {Extras} from './Extras';
import {Menu} from './Menu';
import {Basket} from './Basket';
import {joinChannels} from './redux-helpers/actions/ChannelAction';

import {useDispatch, useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const axios = require('axios');

const MainScreen = () => {
  const basket = useSelector(state => state.basket);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(joinChannels());
  }, []);

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
              iconName = 'notifications-outline';
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
