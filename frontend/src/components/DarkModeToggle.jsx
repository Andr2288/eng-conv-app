// frontend/src/components/DarkModeToggle.jsx

import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore.js";

const DarkModeToggle = () => {
    const { currentTheme, setTheme } = useThemeStore();

    const isDark = currentTheme === "dark";

    const toggleDarkMode = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="btn btn-ghost btn-circle"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {isDark ? (
                <Sun size={20} className="text-yellow-500" />
            ) : (
                <Moon size={20} className="text-blue-600" />
            )}
        </button>
    );
};

export default DarkModeToggle;