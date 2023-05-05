import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {getFruitImage} from '../shared/fruitImageComponent';
import CustomModal from '../shared/modal';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

const Card = ({item, backgroundColor, viewableItems}: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((obj: any) => obj.isViewable)
        .find((viewableItem: any) => viewableItem.item.id === item.id),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.3),
        },
      ],
    };
  });

  return (
    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
      <Animated.View style={[styles.container, rStyle]}>
        {getFruitImage(item.name, backgroundColor, false)}

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

        <CustomModal
          visible={modalVisible}
          fruit={item}
          backgroundColor={backgroundColor}
          fn={() => setModalVisible(!modalVisible)}
        />
      </Animated.View>
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
    elevation: 7,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
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
