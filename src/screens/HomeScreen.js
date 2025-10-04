import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getCategories } from '../api/mealsApi';
import CategoryCard from '../components/CategoryCard';

export default function HomeScreen({ navigation }) {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getCategories();
        if (mounted) setCats(data);
      } catch (e) {
        setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={styles.center}><Text>Error: {error}</Text></View>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerButtons}>
        {/* Botón de Favoritos */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Favorites')} 
          style={[styles.button, { backgroundColor: '#2b8aef' }]}>
          <Text style={styles.buttonText}>Favoritos</Text>
        </TouchableOpacity>

        {/* Botón para ver recetas creadas */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('UserRecipes')} 
          style={[styles.button, { backgroundColor: '#28a745' }]}>
          <Text style={styles.buttonText}>Mis Recetas</Text>
        </TouchableOpacity>

        {/* Botón para añadir receta nueva */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('AddRecipe')} 
          style={[styles.button, { backgroundColor: '#f39c12' }]}>
          <Text style={styles.buttonText}>+ Añadir</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de categorías de la API */}
      <FlatList
        data={cats}
        keyExtractor={item => item.idCategory}
        renderItem={({ item }) => (
          <CategoryCard 
            item={item} 
            onPress={(cat) => navigation.navigate('Recipes', { cat })} 
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', // 👈 espacio entre botones
    padding: 10 
  },
  button: { 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 8 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  }
});
