'use client';
import { createContext, useState, useContext, useEffect } from 'react';

export type ThemeContext = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<ThemeContext | null>(null);

type Props = {
  children: React.ReactNode;
};

export function DarkModeProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  // 사용자 테마 설정
  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function updateDarkMode(darkMode: boolean) {
  if (darkMode) {
    document.documentElement.dataset.theme = 'dark';
    localStorage.theme = 'dark';
  } else {
    document.documentElement.dataset.theme = 'light';
    localStorage.theme = 'light';
  }
}

export const useDarkMode = () => {
  const theme = useContext(DarkModeContext);
  if (!theme) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return theme;
};
