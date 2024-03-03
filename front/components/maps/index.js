import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const [userLocation, setUserLocation] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:4000');

    const updGeoInterval = setInterval(async () => {
        setUserLocation(updateUserGeo(socket));
    }, 3000)

    return () => {
      clearInterval(updGeoInterval);
      socket.disconnect()
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude ? parseFloat(userLocation.latitude) : "37.33676622",
          longitude: userLocation.longitude ? parseFloat(userLocation.longitude) : "-122.04160728",
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: userLocation.latitude ? parseFloat(userLocation.latitude) : "37.33676622",
            longitude: userLocation.longitude ? parseFloat(userLocation.longitude) : "-122.04160728",
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
