import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@recetas_favs';

export async function saveFavorites(arr) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(arr));
  } catch (e) {
    console.warn('Error saving favorites', e);
  }
}

export async function getFavorites() {
  try {
    const txt = await AsyncStorage.getItem(KEY);
    return txt ? JSON.parse(txt) : [];
  } catch (e) {
    console.warn('Error getting favorites', e);
    return [];
  }
}
