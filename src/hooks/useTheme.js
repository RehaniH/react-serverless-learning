import { useEffect, useState } from "react";

const THEME_STORAGE_NAME = "theme";
export default () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const localStorageTheme = window.localStorage.getItem(THEME_STORAGE_NAME);
    setTheme(localStorageTheme || "light");
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      window.localStorage.setItem(THEME_STORAGE_NAME, "dark");
    } else {
      setTheme("light");
      window.localStorage.setItem(THEME_STORAGE_NAME, "light");
    }
  };

  return [theme, toggleTheme];
};
