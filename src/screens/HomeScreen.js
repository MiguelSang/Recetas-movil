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
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={styles.button}>
          <Text style={{ color: '#fff' }}>Favoritos</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={cats}
        keyExtractor={item => item.idCategory}
        renderItem={({ item }) => <CategoryCard item={item} onPress={(cat) => navigation.navigate('Recipes', { cat })} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerButtons: { flexDirection: 'row', justifyContent: 'flex-end', padding: 10 },
  button: { backgroundColor: '#2b8aef', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 }
});
