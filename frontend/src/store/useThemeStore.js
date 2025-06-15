// frontend/src/store/useThemeStore.js

import { create } from "zustand";

// Доступні теми DaisyUI
export const AVAILABLE_THEMES = [
    { name: "light", label: "Light", primary: "#570df8" },
    { name: "dark", label: "Dark", primary: "#661ae6" },
    { name: "cupcake", label: "Cupcake", primary: "#65c3c8" },
    { name: "bumblebee", label: "Bumblebee", primary: "#e9b308" },
    { name: "emerald", label: "Emerald", primary: "#66cc8a" },
    { name: "corporate", label: "Corporate", primary: "#4b6bfb" },
    { name: "synthwave", label: "Synthwave", primary: "#e779c1" },
    { name: "retro", label: "Retro", primary: "#ef9995" },
    { name: "cyberpunk", label: "Cyberpunk", primary: "#ff7598" },
    { name: "valentine", label: "Valentine", primary: "#e96885" },
    { name: "halloween", label: "Halloween", primary: "#f28c18" },
    { name: "garden", label: "Garden", primary: "#5c7f67" },
    { name: "forest", label: "Forest", primary: "#1eb854" },
    { name: "aqua", label: "Aqua", primary: "#09ecf3" },
    { name: "lofi", label: "Lo-Fi", primary: "#0d0d0d" },
    { name: "pastel", label: "Pastel", primary: "#d1c1d7" },
    { name: "fantasy", label: "Fantasy", primary: "#6e0b75" },
    { name: "wireframe", label: "Wireframe", primary: "#b8b8b8" },
    { name: "black", label: "Black", primary: "#343232" },
    { name: "luxury", label: "Luxury", primary: "#ffffff" },
    { name: "dracula", label: "Dracula", primary: "#ff79c6" }
];

export const useThemeStore = create((set, get) => ({
    currentTheme: "light",

    // Ініціалізація теми з localStorage або налаштувань користувача
    initTheme: (userTheme = null) => {
        let savedTheme = userTheme || localStorage.getItem("theme") || "light";

        // Перевірити, чи тема існує в доступних темах
        const themeExists = AVAILABLE_THEMES.some(theme => theme.name === savedTheme);
        if (!themeExists) {
            savedTheme = "light";
        }

        document.documentElement.setAttribute("data-theme", savedTheme);
        localStorage.setItem("theme", savedTheme);
        set({ currentTheme: savedTheme });
    },

    // Зміна теми з оновленням на сервері
    setTheme: async (theme, updateServer = true) => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        set({ currentTheme: theme });

        // Оновити налаштування на сервері, якщо користувач авторизований
        if (updateServer) {
            try {
                // Імпортуємо useAuthStore динамічно, щоб уникнути циклічних залежностей
                const { useAuthStore } = await import("./useAuthStore.js");
                const { authUser, updatePreferences } = useAuthStore.getState();

                if (authUser) {
                    await updatePreferences({
                        theme: theme
                    });
                }
            } catch (error) {
                console.error("Failed to sync theme with server:", error);
            }
        }
    },

    // Отримати поточну тему
    getCurrentTheme: () => {
        return get().currentTheme;
    },

    // Отримати дані про поточну тему
    getCurrentThemeData: () => {
        const currentTheme = get().currentTheme;
        return AVAILABLE_THEMES.find(theme => theme.name === currentTheme) || AVAILABLE_THEMES[0];
    }
}));