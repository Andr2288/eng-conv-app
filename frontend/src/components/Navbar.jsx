// frontend/src/components/Navbar.jsx

import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { LogOut, Settings, User, BookOpen, Home } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";
import DarkModeToggle from "./DarkModeToggle.jsx";

const Navbar = () => {
    const { logout, authUser } = useAuthStore();

    return (
        <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-primary-content" />
                            </div>
                            <h1 className="text-lg font-bold">English Chat</h1>
                        </Link>
                    </div>

                    {/* Navigation */}
                    {authUser && (
                        <nav className="hidden md:flex items-center gap-2">
                            <Link to="/" className="btn btn-ghost btn-sm">
                                <Home size={16} />
                                Home
                            </Link>
                            <Link to="/scenarios" className="btn btn-ghost btn-sm">
                                <BookOpen size={16} />
                                Scenarios
                            </Link>
                        </nav>
                    )}

                    {/* User Menu */}
                    <div className="flex items-center gap-2">
                        {/* Theme Controls */}
                        <DarkModeToggle />
                        <ThemeToggle />

                        {authUser ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                                            {authUser.profilePic ? (
                                                <img src={authUser.profilePic} alt="avatar" />
                                            ) : (
                                                <span className="text-xs">
                                                    {authUser.fullName?.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li>
                                        <Link to="/profile">
                                            <User size={16} />
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/settings">
                                            <Settings size={16} />
                                            Settings
                                        </Link>
                                    </li>
                                    <li className="md:hidden">
                                        <Link to="/scenarios">
                                            <BookOpen size={16} />
                                            Scenarios
                                        </Link>
                                    </li>
                                    <div className="divider my-0"></div>
                                    <li>
                                        <button onClick={logout}>
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="btn btn-sm btn-ghost">
                                    Login
                                </Link>
                                <Link to="/signup" className="btn btn-sm btn-primary">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;