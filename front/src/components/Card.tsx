import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Card = ({item}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.flightDetails}>
        <Text style={styles.flightDetailsText}>{item.flightName}</Text>
        <Text style={styles.flightDetailsText}>{item.scheduleDate}</Text>
        <Text style={styles.flightDetailsText}>{item.scheduleTime}</Text>
      </View>

      <View style={styles.row2}>
        <Text>Amsterdam</Text>
        <Text>Destination</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flexDirection: 'column',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  flightDetailsText: {
    fontSize: 10,
    color: 'gray',
    fontWeight: 'bold',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Card;
