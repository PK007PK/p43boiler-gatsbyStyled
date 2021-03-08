import React, { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./assets/Theme";

const AppContext = createContext();

export function AppProvider({ children }) {
  // const [isActive, setIsActive] = useState(false);
  // const toogleIsActive = () => setIsActive((prevValue) => !prevValue);
  const piotrek = "Łotrek";

  return (
    <AppContext.Provider value={{ piotrek }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
}

export default AppContext;

// const [isActive, setIsActive] = useState(false);

// const passStateBetweenSites = () => {
//   state !== null && setIsActive(state.isActive);
// };

// useEffect(() => passStateBetweenSites(), []);

// const toogleIsActive = () => setIsActive((prevValue) => !prevValue);

// return (
//   <AppContext.Provider value={{ isActive, toogleIsActive }}>
//     <ThemeProvider theme={theme}>{children}</ThemeProvider>
//   </AppContext.Provider>
// );
// };

// export default AppProvider;
