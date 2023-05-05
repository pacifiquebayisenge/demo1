import React from 'react';

import {View, Image, StyleSheet} from 'react-native';

export const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.loadingStyle}
        source={require('../../assets/img/Loading2.gif')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingStyle: {width: 300, height: 500},
});
