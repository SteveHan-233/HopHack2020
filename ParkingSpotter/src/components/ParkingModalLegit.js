import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Modal, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import socket from 'socket.io-client';
import { lot1CarPos } from '../const';

// Used to test random placement of cars
// const genRandCars = () => {
//   const cars = [];
//   for (let i = 0; i < carPos.length; i++) {
//     cars.push(Math.random() >= 0.5);
//   }
//   return cars;
// };

const ENDPOINT = 'http://0b69ff344362.ngrok.io';

export default ({ modalOpen, setModalOpen }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const s = socket(ENDPOINT);
    s.on('frame', (data) => {
      setCars(data);
    });

    return () => s.disconnect();
  }, []);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalOpen}
      style={styles.modal}
    >
      <BlurView tint="light" intensity={100} style={styles.blur}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setModalOpen(false)}
        >
          <Ionicons name="ios-close-circle" size={30} color="#500000" />
        </TouchableOpacity>
        <Image source={require('../../assets/lot1.png')} style={styles.lot} />
        {cars.map((car, ind) => {
          if (car)
            return (
              <Image
                source={require('../../assets/car-top.png')}
                style={{ ...styles.car, ...loot1CarPos[ind] }}
                key={ind}
              />
            );
          else return <></>;
        })}
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginTop: 50,
  },
  blur: {
    marginTop: 280,
    height: '70%',
    borderRadius: 50,
    padding: 25,
  },
  icon: {
    marginLeft: 'auto',
  },
  lot: {
    height: '80%',
    width: '100%',
    resizeMode: 'contain',
    marginTop: 20,
    position: 'relative',
  },
  car: {
    position: 'absolute',
    height: 30,
    width: 60,
  },
});
