"use client";
import { useEffect, useState } from "react";

const themes = {
  light: {
    '--bg': '#FAF9F6',
    '--primary-text': '#1E1E1E',
    '--accent': '#D97706',
    '--button-bg': '#D97706',
    '--button-hover': '#B45309',
    '--border': '#E5E7EB',
    '--nav-bg': '#FAF9F6',
    '--nav-link': '#FFFFFF',
    '--nav-link-hover': '#D97706',
  },
  dark: {
    '--bg': '#1C1C1C',
    '--primary-text': '#E5E5E5',
    '--accent': '#FBBF24',
    '--button-bg': '#FBBF24',
    '--button-hover': '#F59E0B',
    '--border': '#374151',
    '--nav-bg': '#1C1C1C',
    '--nav-link': '#E5E5E5',
    '--nav-link-hover': '#FBBF24',
  },
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved && (saved === 'light' || saved === 'dark')) {
      setTheme(saved);
      applyTheme(saved);
    } else {
      setTheme('light');
      applyTheme('light');
    }
  }, []);

  const applyTheme = (mode) => {
    const root = document.documentElement;
    const vars = themes[mode];
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    applyTheme(next);
  };

  return (
    <button onClick={toggleTheme} style={{ marginRight: '1rem' }}>
      {theme === 'light' ? 'Light' : 'Dark'}
    </button>
  );
} 
