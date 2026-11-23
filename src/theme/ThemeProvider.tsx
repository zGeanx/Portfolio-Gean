import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { themeColors, themeStorageKey, type Theme } from "./theme-config";

export type { Theme };

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColors[theme]);
  requestAnimationFrame(() =>
    requestAnimationFrame(() => root.classList.remove("theme-switching")),
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("light") ? "light" : "dark");

    const systemLight = window.matchMedia("(prefers-color-scheme: light)");
    const followSystem = () => {
      if (window.localStorage.getItem(themeStorageKey)) return;
      const nextTheme: Theme = systemLight.matches ? "light" : "dark";
      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    systemLight.addEventListener("change", followSystem);
    return () => systemLight.removeEventListener("change", followSystem);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem(themeStorageKey, nextTheme);
    setTheme(nextTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
