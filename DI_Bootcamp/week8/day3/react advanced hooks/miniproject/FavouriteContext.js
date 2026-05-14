import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Load favorites from localStorage on start
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weatherFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (city) => {
    // Prevent duplicates
    if (!favorites.some((fav) => fav.name === city.name)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (cityName) => {
    setFavorites(favorites.filter((fav) => fav.name !== cityName));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};