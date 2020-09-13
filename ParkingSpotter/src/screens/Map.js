import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import ParkingMarker from "../components/ParkingMarker";
import ParkingModal from "../components/ParkingModal";
import { lots } from "../const";

export default function Map() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 39.3303325,
          longitude: -76.62163,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007
        }}
        showsUserLocation
      >
        {lots.map(lot => (
          <Marker
            coordinate={lot.coordinate}
            onPress={() => setModalOpen(true)}
          >
            <ParkingMarker percentage={60} />
          </Marker>
        ))}
      </MapView>
      <ParkingModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
