import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

export const ErrorComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Something went wrong...</Text>
      <Text>Please try again later</Text>
      <View style={styles.imgContainer}>
        <Image
          style={styles.errorStyle}
          source={require('../../assets/img/error.gif')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorStyle: {
    resizeMode: 'contain',
    width: 400,
    height: 300,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 15,
  },
});
