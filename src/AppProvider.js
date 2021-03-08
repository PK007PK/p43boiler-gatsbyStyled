import React, { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./assets/Theme";

const AppContext = createContext();

export function AppProvider({ children }) {
  // const [isActive, setIsActive] = useState(false);
  // const toogleIsActive = () => setIsActive((prevValue) => !prevValue);
  const piotrek = "Łotrek";

  return (
    <AppContext.Provider value={{ piotrek }}>{children}</AppContext.Provider>
  );
}

export default AppContext;
