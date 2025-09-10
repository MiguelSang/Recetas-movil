import { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function RecipeCardInner({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Image source={{ uri: item.strMealThumb }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.strMeal}</Text>
        <Text style={styles.subtitle}>{item.strArea || ''}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 10, marginVertical: 6, marginHorizontal: 12, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  image: { width: 90, height: 90, borderRadius: 8, marginRight: 10 },
  info: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 15, fontWeight: '700' },
  subtitle: { fontSize: 12, color: '#666', marginTop: 4 }
});

export default memo(RecipeCardInner);
