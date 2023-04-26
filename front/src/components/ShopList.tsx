import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Card from './Card';
import {useQuery} from '@tanstack/react-query';
import {getFruits} from '../api';

function ShopList() {
  const {
    status,
    error,
    data: fruits,
  } = useQuery({queryKey: ['fruits'], queryFn: getFruits});

  if (status === 'loading') console.log('<=', 'loading...');
  if (status === 'error') console.log('=>', JSON.stringify(error));

  // lastFruit = fruits[fruits.legnth - 1];
  let a = [];
  a = fruits;
  console.log(a[0]);

  return (
    <View style={styles.container}>
      <FlatList
        data={fruits}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <Card cardKey={item.id} last={false} item={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});

export default ShopList;
