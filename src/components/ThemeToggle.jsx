"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("sportnest-theme") || "light";

    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("sportnest-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="btn btn-circle btn-ghost"
        aria-label="Loading theme"
      >
        <span className="loading loading-spinner loading-xs"></span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleThemeToggle}
      className="btn btn-circle btn-ghost text-lg"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <FiMoon /> : <FiSun />}
    </button>
  );
};

export default ThemeToggle;