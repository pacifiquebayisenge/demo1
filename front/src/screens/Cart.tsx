import React from 'react';
import {StyleSheet, View} from 'react-native';
import CartList from '../components/CartList';

function CartScreen() {
  return (
    <View style={styles.container}>
      <CartList />
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

export default CartScreen;
