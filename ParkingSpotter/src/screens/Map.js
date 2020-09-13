import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import socket from "socket.io-client";

import ParkingMarker from "../components/ParkingMarker";
import ParkingModal from "../components/ParkingModal";
import { lots } from "../const";

const ENDPOINT = "http://b3c61720caab.ngrok.io";

export default function Map() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currLot, setCurrLot] = useState(null);
  const [cars, setCars] = useState([[], [], [], [], [], [], [], [], []]);

  useEffect(() => {
    const s = socket(ENDPOINT);
    s.on("frame", data => {
      setCars(data);
    });

    return () => s.disconnect();
  }, []);

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
        {lots.map((lot, ind) => (
          <Marker
            coordinate={lot.coordinate}
            onPress={() => {
              setCurrLot(ind);
              setModalOpen(true);
            }}
            key={ind}
          >
            <ParkingMarker
              percentage={lot.percentage}
              wheelchair={lot.handicap}
              electric={lot.electric}
            />
          </Marker>
        ))}
      </MapView>
      <ParkingModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setCurrLot={setCurrLot}
        lotData={lots[currLot]}
        carData={currLot !== null ? cars[currLot] : null}
      />
    </>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
