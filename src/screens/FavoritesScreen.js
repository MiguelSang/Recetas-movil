import { useContext } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { FavoritesContext } from '../contexts/FavoritesContext';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useContext(FavoritesContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.idMeal}
        renderItem={({ item }) => <RecipeCard item={item} onPress={(it) => navigation.navigate('Detail', { idMeal: it.idMeal })} />}
        ListEmptyComponent={<View style={styles.center}><Text>No tienes favoritos aún</Text></View>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }
});
