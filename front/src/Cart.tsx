import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function CartScreen() {
  return (
    <View style={styles.container}>
      <Text>Cart!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CartScreen;
