import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Пример данных пользователей
const url = 'http://localhost:1337/api/users';
// TODO get users
// example structure [
//   {
//     "id": 1,
//     "username": "miller",
//     "email": "miller@mail.ru",
//     "provider": "local",
//     "confirmed": true,
//     "blocked": false,
//     "createdAt": "2024-03-02T11:48:06.329Z",
//     "updatedAt": "2024-03-02T11:48:06.329Z",
//     "latitude": null,
//     "longitude": null
//   }
// ]
const usersData = [
  { id: 1, name: 'User 1', latitude: 40.7128, longitude: -74.006 },
  { id: 2, name: 'User 2', latitude: 34.0522, longitude: -118.2437 },
  { id: 3, name: 'User 3', latitude: 51.5074, longitude: -0.1278 },
  // Добавьте больше пользователей по мере необходимости
];

const Home = ({ navigation }) => {
  // Состояние для хранения списка пользователей
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Загрузка пользователей при монтировании компонента
    setUsers(usersData);
  }, []);

  // Функция для навигации к карте при выборе пользователя
  const handleUserPress = (user) => {
    navigation.navigate('Map', { user });
  };

  // Рендеринг элемента списка пользователей
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserPress(item)} style={styles.userItem}>
      <Text>{item.name}</Text>
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
