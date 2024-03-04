import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { updateUserGeo } from '../../helpers';
import io from 'socket.io-client';

const Home = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:4000');

    const updGeoInterval = setInterval(async () => {
        // the same as socket.emit('updateUserGeo', userData); 👇
        updateUserGeo(socket);
    }, 3000)

    socket.on('users', (data) => {
        setUsers(data);
    });

    return () => {
      socket.disconnect()
      clearInterval(updGeoInterval);
    };
  }, []);

  const handleUserPress = (user) => {
    navigation.navigate('Map', { user });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserPress(item)} style={styles.userItem}>
      <Text>{item.username}</Text>
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
