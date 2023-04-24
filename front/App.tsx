/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';
import HomeScreen from './src/screens/Home';
import CartScreen from './src/screens/Cart';

function App(): JSX.Element {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
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
        })}>
        <Tab.Screen
          options={{title: 'Shop'}}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});

export default App;
