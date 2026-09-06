import { useEffect, useState } from "react";

export function useTheme() {
  const [theme] = useState<"light">("light");

  useEffect(() => {
    try {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } catch (_) {}
  }, []);

  const toggleTheme = () => {
    // Only light mode is active across the application
  };

  return { theme: "light" as const, toggleTheme };
}

