// frontend/src/components/ThemeToggle.jsx

import { useState } from "react";
import { Palette, ChevronDown } from "lucide-react";
import { useThemeStore, AVAILABLE_THEMES } from "../store/useThemeStore.js";

const ThemeToggle = () => {
    const { currentTheme, setTheme } = useThemeStore();
    const [isOpen, setIsOpen] = useState(false);

    const popularThemes = ["light", "dark", "cupcake", "synthwave", "dracula"];

    const currentThemeData = AVAILABLE_THEMES.find(t => t.name === currentTheme);

    const handleThemeChange = (themeName) => {
        setTheme(themeName);
        setIsOpen(false);
    };

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Palette size={20} />
            </div>

            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-80 p-2 shadow-xl border border-base-300"
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                <li className="menu-title">
                    <span className="flex items-center gap-2">
                        <Palette size={16} />
                        Choose Theme
                    </span>
                </li>

                {/* Current Theme */}
                <li className="mb-2">
                    <div className="flex items-center gap-3 p-2 bg-base-200 rounded-lg">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: currentThemeData?.primary }}
                        ></div>
                        <span className="font-medium">Current: {currentThemeData?.label}</span>
                    </div>
                </li>

                <div className="divider my-1"></div>

                {/* Popular Themes */}
                <li className="menu-title">
                    <span>Popular</span>
                </li>
                {popularThemes.map((themeName) => {
                    const theme = AVAILABLE_THEMES.find(t => t.name === themeName);
                    return (
                        <li key={themeName}>
                            <button
                                onClick={() => handleThemeChange(themeName)}
                                className={`flex items-center gap-3 ${
                                    currentTheme === themeName ? 'active' : ''
                                }`}
                                data-theme={themeName}
                            >
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 rounded bg-primary"></div>
                                    <div className="w-3 h-3 rounded bg-secondary"></div>
                                    <div className="w-3 h-3 rounded bg-accent"></div>
                                </div>
                                <span>{theme?.label}</span>
                                {currentTheme === themeName && (
                                    <span className="ml-auto text-primary">✓</span>
                                )}
                            </button>
                        </li>
                    );
                })}

                <div className="divider my-1"></div>

                {/* All Themes */}
                <li className="menu-title">
                    <span>All Themes</span>
                </li>
                <li>
                    <details>
                        <summary className="flex items-center gap-2">
                            <span>View All ({AVAILABLE_THEMES.length})</span>
                            <ChevronDown size={16} />
                        </summary>
                        <ul className="max-h-48 overflow-y-auto">
                            {AVAILABLE_THEMES.map((theme) => (
                                <li key={theme.name}>
                                    <button
                                        onClick={() => handleThemeChange(theme.name)}
                                        className={`flex items-center gap-3 text-sm ${
                                            currentTheme === theme.name ? 'active' : ''
                                        }`}
                                        data-theme={theme.name}
                                    >
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: theme.primary }}
                                        ></div>
                                        <span>{theme.label}</span>
                                        {currentTheme === theme.name && (
                                            <span className="ml-auto text-primary">✓</span>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    );
};

export default ThemeToggle;