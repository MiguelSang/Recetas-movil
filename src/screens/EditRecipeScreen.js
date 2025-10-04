import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native";
import { updateUserRecipe, removeUserRecipe } from "../utils/firestore";

export default function EditRecipeScreen({ route, navigation }) {
  const { recipe } = route.params; // 👈 recibimos receta desde UserRecipes

  const [name, setName] = useState(recipe.strMeal || "");
  const [ingredients, setIngredients] = useState(
    Array.isArray(recipe.strIngredients)
      ? recipe.strIngredients.join(", ")
      : recipe.strIngredients || ""
  );
  const [instructions, setInstructions] = useState(recipe.strInstructions || "");

  const handleUpdate = async () => {
    if (!name || !ingredients || !instructions) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    const updatedRecipe = {
      strMeal: name,
      strIngredients: ingredients.split(",").map((i) => i.trim()),
      strInstructions: instructions,
      updatedAt: new Date().toISOString(),
    };

    try {
      await updateUserRecipe(recipe.id, updatedRecipe);
      Alert.alert("Éxito", "Receta actualizada ✅");
      navigation.goBack();
    } catch (err) {
      console.error("Error al actualizar receta:", err);
      Alert.alert("Error", "No se pudo actualizar la receta ❌");
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Eliminar Receta",
      "¿Seguro que quieres eliminar esta receta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await removeUserRecipe(recipe.id);
              Alert.alert("Receta eliminada ✅");
              navigation.goBack();
            } catch (err) {
              console.error("Error al eliminar receta:", err);
              Alert.alert("Error", "No se pudo eliminar la receta ❌");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre de la receta</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Ingredientes (separados por comas)</Text>
      <TextInput
        style={styles.input}
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />

      <Text style={styles.label}>Instrucciones</Text>
      <TextInput
        style={[styles.input, { height: 120 }]}
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      <View style={styles.buttons}>
        <Button title="Actualizar Receta" onPress={handleUpdate} />
        <Button title="Eliminar Receta" color="red" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: "bold", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 12,
    borderRadius: 5,
  },
  buttons: {
    marginTop: 20,
    gap: 10,
  },
});
