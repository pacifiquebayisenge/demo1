import React, {useState} from 'react';
import {Text, TextInput} from 'react-native';
import {View, StyleSheet} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {getFruits} from '../api';
import ShopList from './ShopList';
import {LoadingComponent} from '../shared/loadingComponent';
import {ErrorComponent} from '../shared/errorComponent';

const ShopInut = () => {
  const [inputValue, setInputvalue] = useState('');

  const {
    refetch,
    status,
    error,
    data: fruits,
  } = useQuery({
    queryKey: ['fruits', inputValue],
    queryFn: () => getFruits(inputValue, ''),
  });

  const handleTextChange = (newText: string) => {
    setInputvalue(newText);
    refetch();
  };

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

  return (
    <View style={styles.test}>
      <View style={styles.container}>
        <TextInput
          placeholder="🔍  Search"
          autoCorrect={false}
          style={styles.input}
          onChangeText={val => {
            let text = val;
            console.log(text);
            handleTextChange(text);
          }}
        />
        <Text> value : {inputValue}</Text>
      </View>
      {fetchHandler()}
    </View>
  );
};

const styles = StyleSheet.create({
  test: {flex: 1, justifyContent: 'center'},
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
