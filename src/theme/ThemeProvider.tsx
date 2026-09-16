import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "dark" | "light";

export type ColorPalette =
  | "indigo"
  | "emerald"
  | "lime"
  | "orange"
  | "amber"
  | "crimson"
  | "rose"
  | "magenta"
  | "mint"
  | "titanium";

export interface PaletteInfo {
  id: ColorPalette;
  name: string;
  color: string;
  themeColorDark: string;
  themeColorLight: string;
}

export const palettes: PaletteInfo[] = [
  {
    id: "indigo",
    name: "Electric Indigo",
    color: "#8b5cf6",
    themeColorDark: "#0e0d16",
    themeColorLight: "#f8f7fc",
  },
  {
    id: "emerald",
    name: "Emerald Tech",
    color: "#10b981",
    themeColorDark: "#09140f",
    themeColorLight: "#f4faf7",
  },
  {
    id: "lime",
    name: "Acid Lime",
    color: "#84cc16",
    themeColorDark: "#0c1409",
    themeColorLight: "#f7faf3",
  },
  {
    id: "orange",
    name: "Neon Tangerine",
    color: "#f97316",
    themeColorDark: "#160f09",
    themeColorLight: "#fcf7f3",
  },
  {
    id: "amber",
    name: "Warm Amber",
    color: "#f59e0b",
    themeColorDark: "#151109",
    themeColorLight: "#fcf8f3",
  },
  {
    id: "crimson",
    name: "Crimson Red",
    color: "#ef4444",
    themeColorDark: "#160a0a",
    themeColorLight: "#fdf5f5",
  },
  {
    id: "rose",
    name: "Sunset Rose",
    color: "#fb7185",
    themeColorDark: "#160a0f",
    themeColorLight: "#fdf5f8",
  },
  {
    id: "magenta",
    name: "Cyber Magenta",
    color: "#d946ef",
    themeColorDark: "#150915",
    themeColorLight: "#fcf4fc",
  },
  {
    id: "mint",
    name: "Mint Sage",
    color: "#14b8a6",
    themeColorDark: "#091413",
    themeColorLight: "#f3faf9",
  },
  {
    id: "titanium",
    name: "Titanium Mono",
    color: "#e2e8f0",
    themeColorDark: "#121214",
    themeColorLight: "#f8f8f9",
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
  const [palette, setPaletteState] = useState<ColorPalette>("indigo");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const initialTheme: Theme = savedTheme === "light" ? "light" : "dark";

    const savedPalette = window.localStorage.getItem("portfolio-palette") as ColorPalette | null;
    const initialPalette: ColorPalette =
      savedPalette && palettes.some((p) => p.id === savedPalette) ? savedPalette : "indigo";

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

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
