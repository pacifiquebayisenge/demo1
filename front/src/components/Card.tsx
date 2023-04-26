import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Card = ({item, last}: any) => {
  const getId = (id: string) => {
    let e = Number.parseFloat(id);

    console.log('#####', (e + 5).toFixed(2));
  };
  return (
    <TouchableOpacity onPress={() => getId(item.price)}>
      <View style={[styles.container, last ? styles.lastItem : {}]}>
        <View style={styles.image}></View>
        <View style={styles.content}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.price}</Text>
        </View>
        <View style={styles.action}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 15,
    backgroundColor: 'lightblue',
    fontSize: 24,
    shadowColor: '#000',
    shadowOffset: {width: 50, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  lastItem: {
    marginBottom: 80,
  },
  image: {
    borderRadius: 5,
    backgroundColor: 'red',
    width: 50,
    height: 50,
  },
  content: {},
  text: {
    fontSize: 20,
  },
  action: {},
});

export default Card;
