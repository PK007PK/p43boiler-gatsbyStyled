import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./assets/Theme";

export const AppContext = createContext();

const AppProvider = ({ state, children }) => {
  const [isActive, setIsActive] = useState(false);

  const passStateBetweenSites = () => {
    state !== null && setIsActive(state.isActive);
  };

  useEffect(() => passStateBetweenSites(), []);

  const toogleIsActive = () => setIsActive((prevValue) => !prevValue);

  return (
    <AppContext.Provider value={{ isActive, toogleIsActive }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
