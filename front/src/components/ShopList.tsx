import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, FlatList} from 'react-native';

function ShopList() {
  const [people, setPeople] = useState([
    {name: 'Mario', key: '1'},
    {name: 'Luigi', key: '2'},
    {name: 'Toad', key: '3'},
    {name: 'Mario 2', key: '4'},
    {name: 'Luigi 2', key: '5'},
    {name: 'Toad 2', key: '6'},
    {name: 'Mario 3', key: '7'},
    {name: 'Luigi 3', key: '8'},
    {name: 'Toad 3', key: '9'},
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={people}
        renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
      />

      {/* <ScrollView>
        {people.map(item => {
          return (
            <View key={item.key}>
              <Text style={styles.item}>{item.name}</Text>
            </View>
          );
        })}
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 100,
  },
  item: {
    marginVertical: 5,
    padding: 15,
    backgroundColor: 'lightblue',
    fontSize: 24,
    shadowColor: '#000',
    shadowOffset: {width: 50, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
  },
});

export default ShopList;
