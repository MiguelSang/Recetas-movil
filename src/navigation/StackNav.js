import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesScreen from '../screens/FavoritesScreen';
import HomeScreen from '../screens/HomeScreen';
import RecipeDetail from '../screens/RecipeDetail';
import RecipesScreen from '../screens/RecipesScreen';

const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Categorías' }} />
      <Stack.Screen name="Recipes" component={RecipesScreen} options={({ route }) => ({ title: route.params?.cat || 'Recetas' })}/>
      <Stack.Screen name="Detail" component={RecipeDetail} options={{ title: 'Detalle' }} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
    </Stack.Navigator>
  );
}
