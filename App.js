import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './src/navigation/StackNav';
import { FavoritesProvider } from './src/contexts/FavoritesContext';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 segundos
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.splash}>
        <Text style={styles.title}>🍲 Recetas App</Text>
        <ActivityIndicator size="large" color="#e63946" />
      </View>
    );
  }

  return (
    <FavoritesProvider>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  splash: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 }
});
