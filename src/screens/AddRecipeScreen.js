import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native";
import { addUserRecipe } from "../utils/firestore";

export default function AddRecipeScreen({ navigation }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSave = async () => {
    if (!name || !ingredients || !instructions) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    const recipe = {
      strMeal: name,
      strIngredients: ingredients.split(",").map(i => i.trim()), // lista separada por comas
      strInstructions: instructions,
      createdAt: new Date().toISOString(),
    };

    try {
      console.log("Intentando guardar receta:", recipe); // 👀 debug
      const id = await addUserRecipe(recipe);
      console.log("Receta guardada con ID:", id); // 👀 debug
      Alert.alert("Éxito", "Receta guardada en Firebase ✅");
      navigation.navigate("UserRecipes"); // 👈 te lleva directo al listado
    } catch (err) {
      console.error("Error al guardar receta:", err);
      Alert.alert("Error", "No se pudo guardar la receta ❌");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre de la receta</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ej: Arepas rellenas"
      />

      <Text style={styles.label}>Ingredientes (separados por comas)</Text>
      <TextInput
        style={styles.input}
        value={ingredients}
        onChangeText={setIngredients}
        multiline
        placeholder="Ej: Harina, Queso, Sal"
      />

      <Text style={styles.label}>Instrucciones</Text>
      <TextInput
        style={[styles.input, { height: 120 }]}
        value={instructions}
        onChangeText={setInstructions}
        multiline
        placeholder="Escribe paso a paso la preparación"
      />

      <Button title="Guardar Receta" onPress={handleSave} />
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
});
