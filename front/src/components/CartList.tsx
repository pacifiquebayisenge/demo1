import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ViewToken,
  TouchableOpacity,
} from 'react-native';
import {getCart} from '../api';
import CartItem from './CartItem';
import {queryClient} from '../../App';
import {useSharedValue} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import {LoadingComponent} from '../shared/loadingComponent';
import {ErrorComponent} from '../shared/errorComponent';
import {EmptyComponent} from '../shared/emptyComponent';

const CartList = ({navigation}: any) => {
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
    console.log(cartFruits.length);
    queryClient.refetchQueries(['cartFruits']);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // eslint-disable-next-line curly
  if (status === 'error') {
    console.log('=>', JSON.stringify(error));
    return ErrorComponent();
  }

  if (status === 'loading') {
    console.log('<=', 'loading...');

    return LoadingComponent();
  }

  // colors for the background of the fruits images
  const generateColors = (length: number) => {
    const colors = [
      '#f4dfd0',
      '#c5e1ed',
      '#d0e7ce',
      '#f4efba',
      '#E0CFE8',
      '#d0f4f0',
      '#e3f4d0',
      '#f4d0d0',
    ];
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
        ListEmptyComponent={
          <View style={styles.emptyView}>
            <EmptyComponent />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.textStyle}>Fruit Market</Text>
            </TouchableOpacity>
          </View>
        }
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
  emptyView: {
    alignItems: 'center',
    gap: 25,
  },
  btn: {
    width: 200,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#add8e6',
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CartList;
