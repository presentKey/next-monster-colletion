'use client';
import { createContext, useState, useContext, useEffect } from 'react';

export type ContextProp = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<ContextProp | null>(null);

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
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
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
