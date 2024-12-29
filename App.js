import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

import iconSteps from './assets/iconSteps.png'; 
import iconKm from './assets/iconKm.png'; 
import iconKcal from './assets/iconKcal.png'; 

export default function App() {
  const [steps, setSteps] = useState(0); // Estado para los pasos
  const [subscription, setSubscription] = useState(null); // Para gestionar el acelerómetro

  const STEP_THRESHOLD = 1.2; // Umbral para detectar un paso
  let previousMagnitude = 0; // Magnitud previa del movimiento

  const handleAccelerometerData = (data) => {
    const { x, y, z } = data;
    const magnitude = Math.sqrt(x * x + y * y + z * z); // Calcula la magnitud del movimiento

    if (magnitude - previousMagnitude > STEP_THRESHOLD) {
      // Si supera el umbral, cuenta un paso
      setSteps((prevSteps) => prevSteps + 1);

    }

    previousMagnitude = magnitude; // Actualiza la magnitud previa
  };

  // Suscribir al acelerómetro
  const subscribe = () => {
    setSubscription(
      Accelerometer.addListener(handleAccelerometerData)
    );
    Accelerometer.setUpdateInterval(100); // Actualización cada 100 ms
  };

  // Cancelar suscripción al acelerómetro
  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe(); // Activar acelerómetro al montar el componente
    return unsubscribe; // Detenerlo al desmontar
  }, []);

  return (
    <View style={styles.container}>
      <Text>Tus estadísticas diarias!</Text>
      <Image source={iconSteps} style={{
        width: 100,
        height: 100,
        resizeMode: 'center'
      }} />
      <Text>Pasos: {steps} </Text>
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
      <Text>Kcal: </Text>
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
