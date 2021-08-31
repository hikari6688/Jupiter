import React, { useState, createContext } from 'react';
import { ThemeEnum } from '../../config/enum';

const ThemeContext = createContext(null);
const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(ThemeEnum.dark);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };
