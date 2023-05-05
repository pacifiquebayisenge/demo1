import React from 'react';
import {StyleSheet, View} from 'react-native';
import ShopInput from '../components/ShopInput';
import ShopList from '../components/ShopList';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <ShopInput />
      <ShopList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default HomeScreen;
