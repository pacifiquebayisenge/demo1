import React, {useState} from 'react';
import {Text, TextInput} from 'react-native';
import {View, StyleSheet} from 'react-native';
import {getFruitsBy} from '../api';
import {useQuery} from '@tanstack/react-query';
import {queryClient} from '../../App';

const ShopInut = () => {
  const {
    isSuccess,
    status,
    error,
    data: fruits,
  } = useQuery({
    queryKey: ['fruitsBy'],
    queryFn: () => {
      return getFruitsBy(inputValue, '100');
    },
    enabled: false,
  });

  const [inputValue, setInputvalue] = useState('');

  if (status === 'loading') {
    console.log('<==', 'Loading');
  }
  // eslint-disable-next-line curly
  if (status === 'error') console.log('=>', JSON.stringify(error));

  if (isSuccess) {
    console.log('=>', 'Fruits Data Recieved');
    console.log('=>', fruits);
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="🔍  Search"
        style={styles.input}
        onChangeText={val => {
          setInputvalue(val);
          queryClient.refetchQueries(['fruitsBy']);
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
