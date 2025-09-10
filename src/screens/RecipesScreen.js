import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { getRecipesByCategory, searchRecipes } from '../api/mealsApi';
import RecipeCard from '../components/RecipeCard';

export default function RecipesScreen({ route, navigation }) {
  const { cat } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getRecipesByCategory(cat);
        if (mounted) setRecipes(data || []);
      } catch (e) {
        setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [cat]);

  // simple search: either call the search API when there's text, or filter existing
  useEffect(() => {
    let mounted = true;
    async function doSearch() {
      try {
        if (!search) {
          // re-fetch category (simpler) or keep original
          const data = await getRecipesByCategory(cat);
          if (mounted) setRecipes(data || []);
        } else {
          const data = await searchRecipes(search);
          // if search returns recipes -> show them, else empty
          if (mounted) setRecipes(data || []);
        }
      } catch (e) {
        if (mounted) setError(e.message);
      }
    }
    // debounce simple: delay 400ms
    const id = setTimeout(doSearch, 400);
    return () => { mounted = false; clearTimeout(id); };
  }, [search]);

  const handleOpen = (item) => {
    navigation.navigate('Detail', { idMeal: item.idMeal });
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={styles.center}><Text>Error: {error}</Text></View>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchBox}>
        <TextInput placeholder="Buscar (por nombre)..." value={search} onChangeText={setSearch} style={styles.input} />
        <Text style={styles.hint}>Mostrando {recipes?.length ?? 0} recetas</Text>
      </View>
      <FlatList
        data={recipes}
        keyExtractor={item => item.idMeal}
        renderItem={({ item }) => <RecipeCard item={item} onPress={handleOpen} />}
        ListEmptyComponent={<View style={styles.center}><Text>No hay recetas</Text></View>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  searchBox: { padding: 12 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, elevation: 2 },
  hint: { marginTop: 6, color: '#666', fontSize: 12 }
});
