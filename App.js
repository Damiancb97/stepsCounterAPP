import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import iconSteps from './assets/iconSteps.png'; 
import iconKm from './assets/iconKm.png'; 
import iconKcal from './assets/iconKcal.png'; 

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Tus estadísticas diarias!</Text>
      <Image source={iconSteps} style={{
        width: 100,
        height: 100,
        resizeMode: 'center'
      }} />
      <Text>Pasos: </Text>
      <Image source={iconKm} style={{
        width: 100,
        height: 100,
        resizeMode: 'center'
      }} />
      <Text>Kms: </Text>
      <Image source={iconKcal} style={{
        width: 100,
        height: 100,
        resizeMode: 'center'
      }} />
      <Text>Kcal:: </Text>
      <StatusBar style="auto" />
      <Button title='Pulsa aquí para acceder a tus estadísticas globales'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
