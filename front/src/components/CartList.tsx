import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useRef, useState} from 'react';
import {View, Text, StyleSheet, RefreshControl, ViewToken} from 'react-native';
import {getCart} from '../api';
import CartItem from './CartItem';
import {queryClient} from '../../App';
import {useSharedValue} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';

const CartList = () => {
  const {
    status,
    error,
    data: cartFruits,
  } = useQuery({queryKey: ['cartFruits'], queryFn: getCart});

  const flatListRef = useRef(null);

  const viewableItems = useSharedValue<ViewToken[]>([]);

  const onViewableItemsChanged = useCallback(
    ({viewableItems: vItems}: any) => {
      viewableItems.value = vItems;
    },
    [viewableItems],
  );

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
        ref={flatListRef}
        contentContainerStyle={styles.flatListStyling}
        onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          const backgroundColor = colors[index % colors.length];

          return (
            <CartItem
              item={item}
              backgroundColor={backgroundColor}
              viewableItems={viewableItems}
              simultaneousHandlers={flatListRef}
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
  flatListStyling: {
    paddingBottom: 80,
  },
});

export default CartList;
