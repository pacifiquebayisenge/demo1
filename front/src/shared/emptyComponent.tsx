import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

export const EmptyComponent = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.emptyImgStyle}
        source={require('../../assets/img/empty.gif')}
      />
      <Text style={styles.textStyle}>
        Oops , looks like there is nothing here...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 25,
    alignItems: 'center',
    paddingTop: 55,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyImgStyle: {width: 300, height: 400},
});
