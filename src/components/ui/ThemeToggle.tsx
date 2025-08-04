'use client';

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(false);

  // Leer el tema almacenado o el aplicado en el body
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    // Si hay tema en localStorage, úsalo. Si no, usa el actual en <body>
    const isDarkTheme =
      storedTheme === "dark" ||
      (!storedTheme && document.body.classList.contains("dark"));

    setIsDark(isDarkTheme);
    document.body.classList.toggle("dark", isDarkTheme);
  }, []);

  // Cambiar tema
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.body.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Change theme"
      className="p-1 cursor-pointer rounded-full transition-colors duration-300 hover:bg-foreground text-foreground hover:text-[color:var(--inverted-foreground)] group"
    >
      {isDark ? (
        <Moon className="w-6 h-6 transition-transform duration-300 rotate-0 group-hover:rotate-14" />
      ) : (
        <Sun className="w-6 h-6 transition-transform duration-300 rotate-0 group-hover:-rotate-14" />
      )}
    </button>
  );
}

