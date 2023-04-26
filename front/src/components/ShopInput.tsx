import React, {useState} from 'react';
import {Text, TextInput} from 'react-native';
import {View, StyleSheet} from 'react-native';

function ShopInut() {
  const [inputValue, setInputvalue] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="🔍  Search"
        style={styles.input}
        onChangeText={val => setInputvalue(val)}
      />
      <Text> value : {inputValue}</Text>
    </View>
  );
}

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
