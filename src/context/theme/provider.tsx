import React, { useState, createContext } from 'react';
import ThemeContext from './context';
enum ThemeEnum {
  light = 'light',
  dark = 'dark',
}
const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(ThemeEnum.dark);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
