import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CategoryCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item.strCategory)}>
      <Image source={{ uri: item.strCategoryThumb }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.strCategory}</Text>
        <Text numberOfLines={2} style={styles.desc}>{item.strCategoryDescription}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 10, marginVertical: 6, marginHorizontal: 12, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  image: { width: 90, height: 90, borderRadius: 8, marginRight: 10 },
  info: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '700' },
  desc: { fontSize: 12, color: '#444', marginTop: 4 }
});
