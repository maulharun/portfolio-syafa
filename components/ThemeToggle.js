'use client'

import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed left-4 bottom-4 p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
      style={{
        backgroundColor: isDark ? '#374151' : '#f3f4f6',
        color: isDark ? 'white' : '#111827'
      }}
      aria-label="Toggle theme"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;