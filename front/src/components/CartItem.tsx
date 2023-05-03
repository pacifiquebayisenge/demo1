import React, {useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {getFruitById, removeFromCart, updateFruit} from '../api';
import {getFruitImage} from '../shared/fruitImageComponent';
import {queryClient} from '../../App';

const CartItem = ({item, isLast, backgroundColor}: any) => {
  const {
    isSuccess,
    status,
    error,
    data: fruit,
  } = useQuery({
    queryKey: ['fruit', item.id],
    queryFn: () => getFruitById(item.id),
  });

  let [amount, setAmount] = useState(item.amount);

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
  // eslint-disable-next-line curly
  if (status === 'error') console.log('=>', JSON.stringify(error));

  if (status === 'loading') {
    console.log('<=', 'loading...');
  }

  if (isSuccess) {
    return (
      <View style={[styles.container, isLast ? styles.lastItem : {}]}>
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
              style={styles.btn}
              onPress={() => {
                if (amount == 1) {
                  removeCartFruit(fruit.id);
                  refetch();
                  return;
                } else {
                  setAmount((amount -= 1));
                  updateCartFruit(fruit.id);
                }
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.content}>
          <Text style={styles.title}>getFruitImage</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.logo}>€</Text>
            <Text style={styles.price}>2</Text>
          </View>
        </View>
      </View>

      <View style={styles.right}>
        {/* <Icon style={styles.closeIcon} name="close" size={20} color="gray" /> */}

        <View style={styles.amountAction}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setAmount((amount -= 1));
            }}>
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.text}>{amount}</Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setAmount((amount += 1));
            }}>
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 5,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOffset: {width: 50, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 15,
  },
  lastItem: {
    marginBottom: 80,
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
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CartItem;
