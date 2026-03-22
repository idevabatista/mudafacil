export type DesignTokens = {
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
  };
  sidebar: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    ring: string;
  };
  radius: string;
  typography: {
    fontFamily: { sans: string };
  };
  spacing: Record<string, string>;
};

export const tokens: DesignTokens = {
  colors: {
    background: "#0a0a0a", // Fundo preto/escuro
    foreground: "#FAFAFA", // Texto claro
    card: "#121212", // Card levemente mais claro que o fundo
    cardForeground: "#FAFAFA",
    popover: "#121212",
    popoverForeground: "#FAFAFA",
    primary: "#FF5C00", // Laranja Motz
    primaryForeground: "#FFFFFF",
    secondary: "#1F1F1F", // Preto secundário (botões/badges inativos)
    secondaryForeground: "#FAFAFA",
    muted: "#262626", // Tons desativados
    mutedForeground: "#A3A3A3",
    accent: "#FF5C00", // Laranja nas ações alternativas
    accentForeground: "#FFFFFF",
    destructive: "#EF4444",
    destructiveForeground: "#FAFAF9",
    border: "#262626",
    input: "#262626",
    ring: "#FF5C00", // Foco dos inputs laranja
  },
  sidebar: {
    background: "#0a0a0a",
    foreground: "#FAFAFA",
    primary: "#FF5C00",
    primaryForeground: "#FFFFFF",
    accent: "#1F1F1F",
    accentForeground: "#FFFFFF",
    border: "#262626",
    ring: "#FF5C00",
  },
  radius: "0.5rem",
  typography: {
    fontFamily: { sans: "Inter, sans-serif" }
  },
  spacing: {
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem",
  }
};
