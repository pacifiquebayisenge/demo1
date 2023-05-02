import React, {useState} from 'react';

import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {getFruitImage} from './fruitImageComponent';
import {Float} from 'react-native/Libraries/Types/CodegenTypes';
import {useMutation} from '@tanstack/react-query';
import {addFruit} from '../api';

const CustomModal = ({visible, fn, fruit, backgroundColor}: any) => {
  let [amount, setAmount] = useState(1);

  const [price, setPrice] = useState<Float>(
    Number.parseFloat(Number.parseFloat(fruit.price).toFixed(2)),
  );

  const addMutation: any = useMutation({
    mutationFn: addFruit,
  });

  const fruitToCart = (fruitId: string) => {
    addMutation.mutate({fruitId, amount});
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.container}>
            {getFruitImage(fruit.name, backgroundColor, true)}

            <View style={styles.content}>
              <Text style={styles.title}>{fruit.name}</Text>

              <View style={styles.priceContainer}>
                <Text style={styles.logo}>€</Text>
                <Text style={styles.price}>{price}</Text>
              </View>

              <View style={styles.amountContainer}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    if (amount === 1) return;

                    setAmount((amount -= 1));
                    setPrice(
                      Number.parseFloat(
                        Number.parseFloat(fruit.price).toFixed(2),
                      ) * amount,
                    );
                  }}>
                  <Text style={styles.btnText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.amount}>{amount}</Text>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setAmount((amount += 1));
                    setPrice(
                      Number.parseFloat(
                        Number.parseFloat(fruit.price).toFixed(2),
                      ) * amount,
                    );
                  }}>
                  <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.modalAction}>
            <TouchableOpacity
              style={[styles.modalBtn, styles.buttonClose]}
              onPress={() => {
                setAmount(1);
                setPrice(
                  Number.parseFloat(Number.parseFloat(fruit.price).toFixed(2)),
                );
                fn();
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalBtn, styles.buttonAdd]}
              onPress={() => {
                fruitToCart(fruit.id);
                setAmount(1);
                setPrice(
                  Number.parseFloat(Number.parseFloat(fruit.price).toFixed(2)),
                );
                fn();
              }}>
              <Text style={styles.textStyle}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0,0.3)',
  },
  modalView: {
    width: '80%',
    height: '60%',
    justifyContent: 'flex-start',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBtn: {
    width: 100,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonAdd: {
    backgroundColor: '#add8e6',
  },
  buttonClose: {
    backgroundColor: '#cc1016',
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  content: {
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  priceContainer: {
    marginVertical: 10,
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

  amountContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
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

  modalAction: {
    marginVertical: 20,
    flexDirection: 'row',
    gap: 30,
  },
});

export default CustomModal;
