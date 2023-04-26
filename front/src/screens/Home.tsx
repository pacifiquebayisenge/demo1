import React from 'react';
import {StyleSheet, View} from 'react-native';
import ShopInput from '../components/ShopInput';
import ShopList from '../components/ShopList';
import {useQueryClient} from '@tanstack/react-query';

function HomeScreen({navigation}: any) {
  const queryClient = useQueryClient();

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
  },
});

export default HomeScreen;
