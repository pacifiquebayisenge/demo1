import React, {useCallback} from 'react';
import {View, StyleSheet, FlatList, ViewToken} from 'react-native';
import Card from './Card';
import {useQuery} from '@tanstack/react-query';
import {getFruits} from '../api';
import {useSharedValue} from 'react-native-reanimated';
import {LoadingComponent} from '../shared/loadingComponent';
import {ErrorComponent} from '../shared/errorComponent';

const ShopList = () => {
  const {
    isSuccess,
    status,
    error,
    data: fruits,
  } = useQuery({queryKey: ['fruits'], queryFn: getFruits});

  const viewableItems = useSharedValue<ViewToken[]>([]);

  const onViewableItemsChanged = useCallback(
    ({viewableItems: vItems}: any) => {
      viewableItems.value = vItems;
    },
    [viewableItems],
  );

  // colors for the background of the fruits images
  const generateColors = (length: number) => {
    if (!length) return [];
    const colors = ['#f4dfd0', '#c5e1ed', '#d0e7ce', '#f4efba', '#E0CFE8'];
    const uniqueColors: string[] = [];

    for (let i = 0; i < length && uniqueColors.length < colors.length; i++) {
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

  // eslint-disable-next-line curly
  if (status === 'loading') {
    console.log('<=', 'Loading');
    return LoadingComponent();
  }
  // eslint-disable-next-line curly
  if (status === 'error') console.log('=>', JSON.stringify(error));

  if (isSuccess) {
    console.log('=>', 'Fruits Data Recieved');

    return (
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={fruits}
          contentContainerStyle={styles.flatListStyling}
          onViewableItemsChanged={onViewableItemsChanged}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            const colors = generateColors(fruits.length);
            const backgroundColor = colors[index % colors.length];

            return (
              <Card
                cardKey={item.id}
                backgroundColor={backgroundColor}
                item={item}
                viewableItems={viewableItems}
              />
            );
          }}
        />
      </View>
    );
  }

  return ErrorComponent();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  loadingStyle: {width: 300, height: 500},
  flatListStyling: {
    paddingBottom: 80,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ShopList;
