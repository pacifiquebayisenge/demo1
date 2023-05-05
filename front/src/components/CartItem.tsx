import React, {useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getFruitById, removeFromCart, updateFruit} from '../api';
import {getFruitImage} from '../shared/fruitImageComponent';
import {queryClient} from '../../App';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

const CartItem = ({
  item,
  backgroundColor,
  viewableItems,
  simultaneousHandlers,
}: any) => {
  let [amount, setAmount] = useState(item.amount);

  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;
  const translateX = useSharedValue(0);
  const cardHeight = useSharedValue(135);
  const cardMargin = useSharedValue(5);
  const cardPadding = useSharedValue(15);
  const cardOpacity = useSharedValue(1);

  const {
    isSuccess,
    status,
    error,
    data: fruit,
  } = useQuery({
    queryKey: ['fruit', item.id],
    queryFn: () => getFruitById(item.id),
  });

  const updateMutation: any = useMutation({
    mutationFn: updateFruit,
  });

  const removeMutation: any = useMutation({
    mutationFn: removeFromCart,
  });

  const updateCartFruit = (fruitId: string) => {
    updateMutation.mutate({fruitId, amount});
  };

  const removeCartFruit = async (fruitId: string) => {
    removeMutation.mutate(fruitId);
  };

  const refetch = async () => {
    await queryClient.refetchQueries(['cartFruits']);
  };

  const displayAnimation = useAnimatedStyle(() => {
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

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      if (event.translationX < 0) translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        cardHeight.value = withTiming(0);
        cardMargin.value = withTiming(0);
        cardPadding.value = withTiming(0);
        cardOpacity.value = withTiming(0, undefined, isFinished => {
          if (isFinished) {
            runOnJS(removeCartFruit)(fruit.id);
            runOnJS(refetch);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const swipeAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const deleteIconAnimation = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    );
    return {opacity};
  });

  const containerAnimation = useAnimatedStyle(() => {
    return {
      height: cardHeight.value,
      margin: cardMargin.value,
      padding: cardPadding.value,
      opacity: cardOpacity.value,
    };
  });
  const cardAnimation = useAnimatedStyle(() => {
    return {
      opacity: cardOpacity.value,
    };
  });

  // eslint-disable-next-line curly
  if (status === 'error') console.log('=>', JSON.stringify(error));

  if (status === 'loading') {
    console.log('<=', 'loading...');
  }

  if (isSuccess) {
    return (
      <GestureHandlerRootView>
        <Animated.View style={cardAnimation}>
          <Animated.View style={[styles.deleteContainer, deleteIconAnimation]}>
            <Icon
              style={styles.deleteIcon}
              name="trash"
              size={30}
              color={'#cb3837'}
            />
          </Animated.View>
          <PanGestureHandler
            simultaneousHandlers={simultaneousHandlers}
            onGestureEvent={panGesture}>
            <Animated.View style={swipeAnimation}>
              <Animated.View
                style={[
                  styles.container,
                  displayAnimation,
                  containerAnimation,
                ]}>
                <View style={styles.left}>
                  {getFruitImage(fruit.name, backgroundColor, false)}

                  <View style={styles.content}>
                    <Text style={styles.title}>{fruit.name}</Text>

                    <View style={styles.priceContainer}>
                      <Text style={styles.logo}>€</Text>
                      <Text style={styles.price}>
                        {(Number.parseFloat(fruit.price) * amount).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.right}>
                  {/* <Icon style={styles.closeIcon} name="close" size={20} color="gray" /> */}

                  <View style={styles.amountAction}>
                    <TouchableOpacity
                      disabled={amount == 1}
                      style={[
                        styles.btn,
                        amount == 1 ? styles.dissabledStyle : {},
                      ]}
                      onPress={() => {
                        if (amount == 1) return;

                        setAmount((amount -= 1));
                        updateCartFruit(fruit.id);
                      }}>
                      <Text style={styles.btnText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.text}>{amount}</Text>

                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        setAmount((amount += 1));
                        updateCartFruit(fruit.id);
                      }}>
                      <Text style={styles.btnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </GestureHandlerRootView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 50, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 7,
    borderRadius: 20,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  imageContainer: {
    borderRadius: 50,
    backgroundColor: '#f4dfd0',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageInnerContainer: {
    borderRadius: 50,
    backgroundColor: '#f4dfd0',
    width: 60,
    height: 60,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  amountAction: {
    marginVertical: 0,
    alignItems: 'center',
    gap: 5,
  },
  text: {fontSize: 18},
  right: {
    gap: 15,
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  priceContainer: {
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

  btn: {
    backgroundColor: 'lightblue',

    borderRadius: 50,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {width: 50, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  dissabledStyle: {
    backgroundColor: 'lightgrey',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '40%',
    right: '10%',
  },
  deleteIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
});

export default CartItem;
