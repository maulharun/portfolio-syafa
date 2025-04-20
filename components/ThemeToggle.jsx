'use client'

import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded shadow"
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
    </button>
  );
}
