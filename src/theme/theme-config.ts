export type Theme = "dark" | "light";

export const themeStorageKey = "portfolio-theme";

export const themeColors: Record<Theme, string> = {
  dark: "#080f0c",
  light: "#f3f8f5",
};
