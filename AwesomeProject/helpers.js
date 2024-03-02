import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import * as Location from 'expo-location';


export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return token;
    } else {
      console.log('Token not found');
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
  }
};

export const decodeToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const updateUserGeo = async () => {
  const token = await getToken();
  if (!token) {
    return
  }
  const userId = decodeToken(token).id
  const url = `http://localhost:1337/api/users/${userId}`
  const {coords} = await getCurrentLocation();
  const data = {
    "latitude": coords.latitude,
    "longitude": coords.longitude
  }
  await axios.put(url, data);
}

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return;
  }

  let currentLocation = await Location.getCurrentPositionAsync({});
  return currentLocation;
}