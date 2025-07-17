"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggleButton() {
  const [isLight, setIsLight] = useState(false); // false = dark, true = light

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const isLightTheme = storedTheme === "light";
    setIsLight(isLightTheme);
    document.body.classList.toggle("light", isLightTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isLight;
    setIsLight(newTheme);
    localStorage.setItem("theme", newTheme ? "light" : "dark");
    document.body.classList.toggle("light", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-1 rounded-full transition-colors hover:bg-foreground text-foreground hover:text-[color:var(--inverted-foreground)]"
      aria-label="Change theme"
    >
      {isLight ? (
        <Sun className="w-7 h-7  " />
      ) : (
        <Moon className="w-7 h-7" />
      )}
    </button>
  );
}
