import React, {useState} from 'react';
import {Text, TextInput} from 'react-native';
import {View, StyleSheet} from 'react-native';
import {queryClient} from '../../App';
import {useQuery} from '@tanstack/react-query';
import {getFruits} from '../api';

const ShopInut = () => {
  const [inputValue, setInputvalue] = useState('');

  const {
    refetch,
    isSuccess,
    status,
    error,
    data: fruits,
  } = useQuery({
    enabled: false,
    queryKey: ['fruits', inputValue],
    queryFn: () => getFruits(inputValue, ''),
  });

  // eslint-disable-next-line curly
  if (status === 'error') {
    console.log('=>', JSON.stringify(error));
  }

  if (status === 'loading') {
    console.log('<=', 'loading...');
  }

  if (isSuccess) {
    console.log(
      'succes',
      fruits.map((f: any) => f.name),
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="🔍  Search"
        style={styles.input}
        onChangeText={val => {
          setInputvalue(val);

          console.log(fruits);
          refetch();
        }}
      />
      <Text> value : {inputValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default ShopInut;
