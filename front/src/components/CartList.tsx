import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {getCart} from '../api';
import CartItem from './CartItem';
import {queryClient} from '../../App';

const CartList = () => {
  const {
    status,
    error,
    data: cartFruits,
  } = useQuery({queryKey: ['cartFruits'], queryFn: getCart});

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    queryClient.refetchQueries(['cartFruits']);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // eslint-disable-next-line curly
  if (status === 'error') console.log('=>', JSON.stringify(error));

  if (status === 'loading') {
    console.log('<=', 'loading...');

    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // colors for the background of the fruits images
  const generateColors = (length: number) => {
    const colors = ['#f4dfd0', '#c5e1ed', '#d0e7ce', '#f4efba', '#E0CFE8'];
    const uniqueColors: string[] = [];

    for (let i = 0; i < length; i++) {
      const color = colors[i % colors.length];

      if (!uniqueColors.includes(color)) {
        uniqueColors.push(color);
      }
    }

    for (let i = uniqueColors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [uniqueColors[i], uniqueColors[j]] = [uniqueColors[j], uniqueColors[i]];
    }

    return uniqueColors;
  };

  const colors = generateColors(cartFruits.length);

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={cartFruits}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          const backgroundColor = colors[index % colors.length];
          const isLast = index === cartFruits.length - 1;

          return (
            <CartItem
              item={item}
              isLast={isLast}
              backgroundColor={backgroundColor}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});

export default CartList;
