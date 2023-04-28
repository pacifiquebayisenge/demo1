import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {useMutation} from '@tanstack/react-query';
import {addFruit} from '../api';
import {getFruitImage} from '../shared/fruitImageComponent';

const Card = ({item, isLast, backgroundColor}: any) => {
  const getId = (id: string, amount: number) => {
    mutation.mutate({id, amount});
  };

  const mutation: any = useMutation({
    mutationFn: addFruit,
  });

  return (
    <TouchableOpacity onPress={() => getId(item.id, 5)}>
      <View style={[styles.container, isLast ? styles.lastItem : {}]}>
        {getFruitImage(item.name, backgroundColor)}

        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.logo}>€</Text>
            <Text style={styles.price}>
              {Number.parseFloat(item.price).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.action}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 175,
    margin: 5,
    padding: 15,
    backgroundColor: 'white',
    fontSize: 24,
    shadowColor: '#000',
    shadowOffset: {width: 50, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  lastItem: {
    marginBottom: 80,
  },
  imageContainer: {
    borderRadius: 50,
    backgroundColor: '#f4dfd0',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer2: {
    borderRadius: 50,
    backgroundColor: '#f4dfd0',
    width: 40,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
  content: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  priceContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  logo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#353d64',
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#353d64',
  },
  action: {},
});

export default Card;
