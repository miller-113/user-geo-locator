import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const MapScreen = ({ route }) => {
  const [userLocation, setUserLocation] = useState(route.params.user);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      loadUserLocation(route.params.user.id);
    }, 3000);

    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  const loadUserLocation = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:1337/api/users/${userId}`);
      setUserLocation(response.data);
    } catch (error) {
      console.error('Error loading user location:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(userLocation.latitude),
          longitude: parseFloat(userLocation.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(userLocation.latitude),
            longitude: parseFloat(userLocation.longitude),
          }}
          title={userLocation.name}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
