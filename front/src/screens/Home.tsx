import React from 'react';
import {StyleSheet, View} from 'react-native';
import ShopInput from '../components/ShopInput';
import ShopList from '../components/ShopList';

function HomeScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <ShopInput style={styles.input} />
      <ShopList style={styles.list} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
  },
  input: {
    flex: 1,
  },
  list: {
    flex: 2,
  },
});

export default HomeScreen;
