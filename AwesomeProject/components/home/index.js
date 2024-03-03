import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { updateUserGeo } from '../../helpers';
import io from 'socket.io-client';


const Home = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:4000');

    socket.on('users', (data) => {
        setUsers(data);
    });
    // // socket.emit('updateUserGeo', userData); 👇
    updateUserGeo(socket);


    return () => {
      socket.disconnect()
    };
  }, []);



  const handleUserPress = (user) => {
    navigation.navigate('Map', { user });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserPress(item)} style={styles.userItem}>
      <Text>{JSON.stringify(item)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Users</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});

export default Home;
