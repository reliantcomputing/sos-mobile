/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import Store from './src/redux-helpers/Store';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './src/MainScreen';
import {RouteNames} from './src/helpers/RouteNames';
import {createStackNavigator} from '@react-navigation/stack';
import {ItemDetails} from './src/ItemDetails';
import {lightTheme} from './src/theme/light';
import {Payment} from './src/Payment';

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={Store}>
      <NavigationContainer theme={lightTheme}>
        <Stack.Navigator initialRouteName={RouteNames.MENU}>
          <Stack.Screen
            name={RouteNames.MENU}
            component={MainScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.MENU_DETAILS}
            component={ItemDetails}
            options={({route}) => ({
              title: route.params.title,
            })}
          />
          <Stack.Screen
            name={RouteNames.PAYMENT}
            component={Payment}
            // options={({route}) => ({
            //   title: route.params.title,
            // })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
