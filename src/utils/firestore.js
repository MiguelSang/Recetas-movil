import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

// ================== FAVORITOS ================== //
const favsCol = collection(db, "favoritos");

// Guardar favorito
export async function saveFavorite(recipe) {
  try {
    const docRef = await addDoc(favsCol, recipe);
    console.log("Favorito guardado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar favorito:", error);
    throw error;
  }
}

// Obtener favoritos
export async function getFavorites() {
  const snapshot = await getDocs(favsCol);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Eliminar favorito
export async function removeFavorite(id) {
  try {
    await deleteDoc(doc(db, "favoritos", id));
    console.log("Favorito eliminado:", id);
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    throw error;
  }
}

// ================== RECETAS DE USUARIO ================== //
const userRecipesCol = collection(db, "recetas");

// Guardar receta de usuario
export async function addUserRecipe(recipe) {
  try {
    console.log("Intentando guardar receta:", recipe);
    const docRef = await addDoc(userRecipesCol, recipe);
    console.log("Receta guardada con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar receta:", error);
    throw error;
  }
}

// Obtener recetas de usuario
export async function getUserRecipes() {
  try {
    const snapshot = await getDocs(userRecipesCol);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error al obtener recetas:", error);
    throw error;
  }
}

// Editar receta existente
export async function updateUserRecipe(id, updatedData) {
  try {
    const ref = doc(db, "recetas", id);
    await updateDoc(ref, updatedData);
    console.log("Receta actualizada:", id);
  } catch (error) {
    console.error("Error al actualizar receta:", error);
    throw error;
  }
}
