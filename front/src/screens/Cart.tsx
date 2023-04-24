import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

function CartScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <Text>Cart!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
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
