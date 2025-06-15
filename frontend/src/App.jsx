// frontend/src/App.jsx

import {Routes, Route, Navigate} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar.jsx";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ScenariosPage from "./pages/ScenariosPage.jsx";

import {useAuthStore} from "./store/useAuthStore.js";
import {useThemeStore} from "./store/useThemeStore.js";
import {useEffect} from "react";

import {Loader} from "lucide-react";

const App = () => {

    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    const { initTheme } = useThemeStore();

    useEffect(() => {
        checkAuth();
        initTheme();
    }, [checkAuth, initTheme]);

    // Ініціалізувати тему користувача після авторизації
    useEffect(() => {
        if (authUser?.preferences?.theme) {
            initTheme(authUser.preferences.theme);
        }
    }, [authUser, initTheme]);

    console.log({authUser});

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        )
    }

    return (
        <div>
            <Navbar />

            <Routes>
                <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login" /> } />
                <Route path="/signup" element={ !authUser ? <SignUpPage /> : <Navigate to="/" /> } />
                <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/" /> } />
                <Route path="/settings" element={ authUser ? <SettingsPage /> : <Navigate to="/login" /> } />
                <Route path="/profile" element={ authUser ? <ProfilePage /> : <Navigate to="/login" /> } />
                <Route path="/scenarios" element={ authUser ? <ScenariosPage /> : <Navigate to="/login" /> } />
            </Routes>

            <Toaster />
        </div>
    )
}

export default App