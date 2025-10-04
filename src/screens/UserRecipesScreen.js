import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getUserRecipes, removeUserRecipe } from "../utils/firestore";

export default function UserRecipesScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRecipes = async () => {
    try {
      console.log("Cargando recetas de usuario...");
      const data = await getUserRecipes();
      console.log("Recetas obtenidas:", data);
      setRecipes(data);
    } catch (err) {
      console.error("Error cargando recetas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleDelete = async (id) => {
    Alert.alert(
      "Eliminar Receta",
      "¿Seguro que deseas eliminar esta receta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await removeUserRecipe(id);
            loadRecipes(); // recargar lista
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando recetas...</Text>
      </View>
    );
  }

  if (recipes.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No has creado recetas todavía 🍳</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.navigate("EditRecipe", { recipe: item })}
          >
            <Text style={styles.title}>{item.strMeal}</Text>
            <Text style={styles.sub}>
              Ingredientes:{" "}
              {Array.isArray(item.strIngredients)
                ? item.strIngredients.join(", ")
                : item.strIngredients}
            </Text>
            <Text>{item.strInstructions}</Text>
          </TouchableOpacity>

          {/* Botón eliminar */}
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.deleteText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  sub: { fontSize: 14, color: "#555", marginBottom: 6 },
  deleteBtn: {
    marginLeft: 10,
    padding: 6,
    backgroundColor: "#e74c3c",
    borderRadius: 6,
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
});
