import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ParkingMarker from '../components/ParkingMarker';
import ParkingModal from '../components/ParkingModal';

export default function Map() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 30.622307,
          longitude: -96.34327,
          latitudeDelta: 0.019,
          longitudeDelta: 0.019,
        }}
        showsUserLocation
      >
        {/* 30.6099° N, 96.3404° W */}
        <Marker
          coordinate={{ latitude: 30.622504, longitude: -96.342386 }}
          onPress={() => setModalOpen(true)}
        >
          <ParkingMarker percentage={20} />
        </Marker>
        <Marker
          coordinate={{ latitude: 30.6094, longitude: -96.341 }}
          onPress={() => setModalOpen(true)}
        >
          <ParkingMarker percentage={30} />
        </Marker>
      </MapView>
      <ParkingModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
