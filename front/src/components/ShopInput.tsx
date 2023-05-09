import React, {useState} from 'react';
import {Text, TextInput} from 'react-native';
import {View, StyleSheet} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {getFruits} from '../api';
import ShopList from './ShopList';
import {LoadingComponent} from '../shared/loadingComponent';
import {ErrorComponent} from '../shared/errorComponent';
import Slider from '@react-native-community/slider';

const ShopInut = () => {
  const [inputName, setInputName] = useState('');
  const [inputPrice, setInputPrice] = useState('');

  const {
    refetch,
    status,
    error,
    data: fruits,
  } = useQuery({
    queryKey: ['fruits', inputName],
    queryFn: () => getFruits(inputName, inputPrice),
  });

  const fetchHandler = () => {
    switch (status) {
      case 'loading':
        console.log('<=', 'loading...');
        return LoadingComponent();

      case 'error':
        console.log('=>', JSON.stringify(error));
        return ErrorComponent();

      case 'success':
        console.log(
          'succes',
          fruits.map((f: any) => f.name),
        );

        return <ShopList fruits={fruits} />;

      default:
        return LoadingComponent();
    }
  };

  const sliderHandler = (value: any) => {
    let price = value.toFixed(2);
    setInputPrice(price);
    refetch();
  };

  return (
    <View style={styles.test}>
      <View style={styles.inputcontainer}>
        <TextInput
          placeholder="🔍  Search"
          autoCorrect={false}
          style={styles.input}
          onChangeText={val => {
            setInputName(val);
            refetch();
          }}
        />
        <View style={styles.sliderView}>
          <View style={styles.sliderLabel}>
            <View style={styles.priceContainer}>
              <Text style={styles.logo}>€</Text>
              <Text style={styles.price}>0</Text>
            </View>
            <Text>{inputPrice}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.logo}>€</Text>
              <Text style={styles.price}>10</Text>
            </View>
          </View>

          <Slider
            tapToSeek={false}
            value={10}
            step={0.5}
            minimumValue={0}
            maximumValue={10}
            onValueChange={value => sliderHandler(value)}
          />
        </View>
      </View>
      {fetchHandler()}
    </View>
  );
};

const styles = StyleSheet.create({
  test: {flex: 1, justifyContent: 'center'},
  inputcontainer: {
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,

    padding: 10,
  },
  sliderView: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  sliderLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  priceContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  logo: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#353d64',
  },

  price: {
    fontWeight: 'bold',
    color: '#353d64',
  },
});

export default ShopInut;
