import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { lightThemeColors, darkThemeColors } from '../global/Styles';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? darkThemeColors : lightThemeColors);

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? darkThemeColors : lightThemeColors);
    });

    return () => listener.remove();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === lightThemeColors ? darkThemeColors : lightThemeColors);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
