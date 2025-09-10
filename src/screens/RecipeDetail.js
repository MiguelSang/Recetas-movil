import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getRecipeDetail } from '../api/mealsApi';
import { FavoritesContext } from '../contexts/FavoritesContext';

function parseIngredients(recipe) {
  // TheMealDB uses strIngredient1..20 and strMeasure1..20
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingr = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingr && ingr.trim()) {
      list.push(`${measure ? measure + ' ' : ''}${ingr}`.trim());
    }
  }
  return list;
}

export default function RecipeDetail({ route }) {
  const { idMeal } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getRecipeDetail(idMeal);
        if (mounted) setRecipe(data);
      } catch (e) {
        console.warn(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [idMeal]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!recipe) return <View style={styles.center}><Text>No se encontró la receta</Text></View>;

  const ingredients = parseIngredients(recipe);

  const toggleFav = () => {
    if (isFavorite(recipe.idMeal)) removeFavorite(recipe.idMeal);
    else addFavorite({ idMeal: recipe.idMeal, strMeal: recipe.strMeal, strMealThumb: recipe.strMealThumb });
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `${recipe.strMeal}\n\n${recipe.strInstructions?.substring(0, 200)}...\n\nVer más en TheMealDB`,
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <View style={styles.row}>
        <Text style={styles.title}>{recipe.strMeal}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={toggleFav} style={styles.iconBtn}>
            <Ionicons name={isFavorite(recipe.idMeal) ? 'heart' : 'heart-outline'} size={24} color="#e63946" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} style={styles.iconBtn}>
            <Ionicons name="share-social-outline" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredientes</Text>
        {ingredients.map((ing, idx) => <Text key={idx} style={styles.li}>• {ing}</Text>)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instrucciones</Text>
        <Text style={styles.paragraph}>{recipe.strInstructions}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 240 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
  title: { fontSize: 20, fontWeight: '700', flex: 1 },
  actions: { flexDirection: 'row', marginLeft: 8 },
  iconBtn: { padding: 6, marginLeft: 8 },
  section: { paddingHorizontal: 12, paddingVertical: 8 },
  sectionTitle: { fontWeight: '700', marginBottom: 6 },
  li: { marginBottom: 4 },
  paragraph: { lineHeight: 20, textAlign: 'justify' }
});
