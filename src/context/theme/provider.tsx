import React, { useState, createContext } from 'react';
import ThemeContext from './context';
import { ThemeEnum } from '../../config/enum'
const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(ThemeEnum.dark);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
