import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "dark" | "light";

export type ColorPalette = "mint";

export interface PaletteInfo {
  id: ColorPalette;
  name: string;
  color: string;
  themeColorDark: string;
  themeColorLight: string;
}

export const palettes: PaletteInfo[] = [
  {
    id: "mint",
    name: "Mint Sage",
    color: "#14b8a6",
    themeColorDark: "#091413",
    themeColorLight: "#f3faf9",
  },
];

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  palette: ColorPalette;
  setPalette: (palette: ColorPalette) => void;
  palettes: PaletteInfo[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeAndPalette(theme: Theme, palette: ColorPalette) {
  const isLight = theme === "light";
  document.documentElement.classList.toggle("light", isLight);
  document.documentElement.style.colorScheme = theme;
  document.documentElement.setAttribute("data-palette", palette);

  const pal = palettes.find((p) => p.id === palette) ?? palettes[0];
  const metaColor = isLight ? pal.themeColorLight : pal.themeColorDark;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", metaColor);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [palette, setPaletteState] = useState<ColorPalette>("mint");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const initialTheme: Theme = savedTheme === "light" ? "light" : "dark";

    const savedPalette = window.localStorage.getItem("portfolio-palette") as ColorPalette | null;
    const initialPalette: ColorPalette =
      savedPalette && palettes.some((p) => p.id === savedPalette) ? savedPalette : "mint";

    setTheme(initialTheme);
    setPaletteState(initialPalette);
    applyThemeAndPalette(initialTheme, initialPalette);
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
      applyThemeAndPalette(nextTheme, palette);
      window.localStorage.setItem("portfolio-theme", nextTheme);
      return nextTheme;
    });
  };

  const setPalette = (nextPalette: ColorPalette) => {
    setPaletteState(nextPalette);
    applyThemeAndPalette(theme, nextPalette);
    window.localStorage.setItem("portfolio-palette", nextPalette);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, palette, setPalette, palettes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
