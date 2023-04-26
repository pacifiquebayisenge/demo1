/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/Home';
import CartScreen from './src/screens/Cart';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): JSX.Element {
  const Tab = createBottomTabNavigator();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName = '';
              if (route.name === 'Home') {
                color = focused ? 'red' : 'black';
                iconName = 'home';
              } else if (route.name === 'Cart') {
                color = focused ? 'red' : 'black';
                iconName = 'shopping-cart';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {...tabBarStyle},
            tabBarItemStyle: {...tabBarItemStyle},
          })}>
          <Tab.Screen
            options={{title: 'Shop'}}
            name="Home"
            component={HomeScreen}
          />
          <Tab.Screen name="Cart" component={CartScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const tabBarStyle = {
  marginHorizontal: 25,
  marginBottom: 20,
  borderRadius: 10,
  position: 'absolute',
  height: 'auto',
  borderColor: 'lightgray',
  borderTopColor: 'lightgray',
  borderWidth: 1,
  borderTopWidth: 1,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 6.27,

  elevation: 10,
};

const tabBarItemStyle = {
  height: 50,
  margin: 5,
  borderRadius: 10,
};

export default App;
