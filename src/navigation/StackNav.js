import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesScreen from '../screens/FavoritesScreen';
import HomeScreen from '../screens/HomeScreen';
import RecipeDetail from '../screens/RecipeDetail';
import RecipesScreen from '../screens/RecipesScreen';
import AddRecipeScreen from "../screens/AddRecipeScreen";
import UserRecipesScreen from "../screens/UserRecipesScreen";
import EditRecipeScreen from "../screens/EditRecipeScreen";
const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Categorías' }} />
      <Stack.Screen name="Recipes" component={RecipesScreen} options={({ route }) => ({ title: route.params?.cat || 'Recetas' })}/>
      <Stack.Screen name="Detail" component={RecipeDetail} options={{ title: 'Detalle' }} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
      <Stack.Screen name="AddRecipe" component={AddRecipeScreen} options={{ title: "Nueva Receta" }} />
      <Stack.Screen name="UserRecipes" component={UserRecipesScreen} options={{ title: "Mis Recetas" }} />
      <Stack.Screen name="EditRecipe" component={EditRecipeScreen} options={{ title: "Editar Receta" }} />

    </Stack.Navigator>
  );
}

