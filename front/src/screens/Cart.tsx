import React from 'react';
import {StyleSheet, View} from 'react-native';
import CartList from '../components/CartList';

function CartScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <CartList navigation={navigation} />
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
