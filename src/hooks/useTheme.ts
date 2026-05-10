import { useState, useEffect, useCallback } from 'react';
import type { ThemeMode } from '@/types';

const STORAGE_KEY = 'neuralcost-theme';

/**
 * Theme hook with localStorage persistence.
 * Defaults to dark mode; toggles the `dark`/`light` class on <html>.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    return stored ?? 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
  }, []);

  return { theme, toggleTheme, setTheme, isDark: theme === 'dark' };
}
