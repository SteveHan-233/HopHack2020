import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import Map from './src/screens/Map';
import Signin from './src/screens/Signin';

console.disableYellowBox = true;

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#500000',
      }}
    >
      <StatusBar style="light" />
      {authenticated ? <Map /> : <Signin setAuthenticated={setAuthenticated} />}
    </SafeAreaView>
  );
}
