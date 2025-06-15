// frontend/src/components/ThemeSelector.jsx

import { Check, Palette, Sparkles } from "lucide-react";
import { useThemeStore, AVAILABLE_THEMES } from "../store/useThemeStore.js";
import ThemePreview from "./ThemePreview.jsx";

const ThemeSelector = () => {
    const { currentTheme, setTheme } = useThemeStore();

    const handleThemeChange = (themeName) => {
        setTheme(themeName);
    };

    const popularThemes = ["light", "dark", "cupcake", "synthwave", "dracula"];
    const colorfulThemes = ["bumblebee", "emerald", "valentine", "halloween", "forest"];
    const professionalThemes = ["corporate", "luxury", "wireframe", "black"];

    const ThemeCard = ({ theme, isSelected }) => (
        <div
            className={`
                relative cursor-pointer rounded-lg border-2 transition-all duration-200 hover:scale-105 theme-card
                ${isSelected
                ? 'border-primary ring-2 ring-primary ring-opacity-30'
                : 'border-base-300 hover:border-primary'
            }
            `}
            onClick={() => handleThemeChange(theme.name)}
        >
            <ThemePreview theme={theme} />

            {/* Selected Indicator */}
            {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check size={14} className="text-primary-content" />
                </div>
            )}
        </div>
    );

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">
                    <Palette size={24} />
                    Color Theme
                </h2>
                <p className="text-base-content/70 mb-6">
                    Choose your preferred color theme for the application
                </p>

                {/* Current Theme */}
                <div className="mb-6 p-4 bg-base-200 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Sparkles size={16} />
                        Current Theme
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        <ThemeCard
                            theme={AVAILABLE_THEMES.find(t => t.name === currentTheme)}
                            isSelected={true}
                        />
                    </div>
                </div>

                {/* Popular Themes */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-3">Popular Themes</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {popularThemes.map((themeName) => {
                            const theme = AVAILABLE_THEMES.find(t => t.name === themeName);
                            return (
                                <ThemeCard
                                    key={theme.name}
                                    theme={theme}
                                    isSelected={currentTheme === theme.name}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Colorful Themes */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-3">Colorful Themes</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {colorfulThemes.map((themeName) => {
                            const theme = AVAILABLE_THEMES.find(t => t.name === themeName);
                            return (
                                <ThemeCard
                                    key={theme.name}
                                    theme={theme}
                                    isSelected={currentTheme === theme.name}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Professional Themes */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-3">Professional Themes</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {professionalThemes.map((themeName) => {
                            const theme = AVAILABLE_THEMES.find(t => t.name === themeName);
                            return (
                                <ThemeCard
                                    key={theme.name}
                                    theme={theme}
                                    isSelected={currentTheme === theme.name}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Quick Theme Switcher */}
                <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Quick Switch</h3>
                    <div className="flex flex-wrap gap-2">
                        {["light", "dark", "cupcake", "synthwave", "dracula", "corporate"].map((themeName) => (
                            <button
                                key={themeName}
                                onClick={() => handleThemeChange(themeName)}
                                className={`btn btn-sm ${
                                    currentTheme === themeName ? 'btn-primary' : 'btn-outline'
                                }`}
                            >
                                {AVAILABLE_THEMES.find(t => t.name === themeName)?.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeSelector;