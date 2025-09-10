import { createContext, useEffect, useState } from 'react';
import * as storage from '../utils/storage';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      const saved = await storage.getFavorites();
      if (saved) setFavorites(saved);
    })();
  }, []);

  useEffect(() => {
    storage.saveFavorites(favorites);
  }, [favorites]);

  const addFavorite = (recipe) => {
    setFavorites((prev) => {
      if (prev.some(r => r.idMeal === recipe.idMeal)) return prev;
      return [recipe, ...prev];
    });
  };

  const removeFavorite = (idMeal) => {
    setFavorites((prev) => prev.filter(r => r.idMeal !== idMeal));
  };

  const isFavorite = (idMeal) => favorites.some(r => r.idMeal === idMeal);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
