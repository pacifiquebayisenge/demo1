import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home!</Text>
      <Icon name="gear" size={30} color="black" />
      <Icon name="rocket" size={30} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
