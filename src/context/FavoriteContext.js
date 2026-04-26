import { createContext, useState } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  return (
    <FavoriteContext.Provider value={{ favoriteBooks, setFavoriteBooks }}>
      {children}
    </FavoriteContext.Provider>
  );
};
