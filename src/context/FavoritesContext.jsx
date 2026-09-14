import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("addis-eats-favorites")
      ) || [];
    } catch {
      return [];
    }
  });

  function toggleFavorite(dish) {
    setFavorites((current) => {
      const exists = current.some((item) => item.id === dish.id);

      const updated = exists
        ? current.filter((item) => item.id !== dish.id)
        : [...current, dish];

      localStorage.setItem(
        "addis-eats-favorites",
        JSON.stringify(updated)
      );

      return updated;
    });
  }

  function isFavorite(id) {
    return favorites.some((item) => item.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}