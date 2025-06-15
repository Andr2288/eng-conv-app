// frontend/src/pages/SettingsPage.jsx

import { useState } from "react";
import { Settings, User, Palette, Bell, Shield, Download } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import ThemeSelector from "../components/ThemeSelector.jsx";

const SettingsPage = () => {
    const { authUser } = useAuthStore();
    const [activeTab, setActiveTab] = useState("appearance");

    const tabs = [
        { id: "appearance", label: "Appearance", icon: Palette },
        { id: "profile", label: "Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "privacy", label: "Privacy", icon: Shield },
        { id: "data", label: "Data", icon: Download }
    ];

    return (
        <div className="min-h-screen pt-20">
            <div className="container mx-auto p-6 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Settings size={32} />
                        Settings
                    </h1>
                    <p className="text-base-content/70 mt-2">
                        Manage your account settings and preferences
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="w-full lg:w-64">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body p-4">
                                <ul className="menu p-0 space-y-1">
                                    {tabs.map((tab) => {
                                        const Icon = tab.icon;
                                        return (
                                            <li key={tab.id}>
                                                <button
                                                    onClick={() => setActiveTab(tab.id)}
                                                    className={`flex items-center gap-3 w-full text-left ${
                                                        activeTab === tab.id ? 'active' : ''
                                                    }`}
                                                >
                                                    <Icon size={20} />
                                                    {tab.label}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Appearance Tab */}
                        {activeTab === "appearance" && (
                            <div className="space-y-6">
                                <ThemeSelector />

                                {/* Additional Appearance Settings */}
                                <div className="card bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <h2 className="card-title">Display Settings</h2>

                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">Compact Mode</span>
                                                <input type="checkbox" className="toggle toggle-primary" />
                                            </label>
                                        </div>

                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">Animations</span>
                                                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                                            </label>
                                        </div>

                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">High Contrast</span>
                                                <input type="checkbox" className="toggle toggle-primary" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Profile Tab */}
                        {activeTab === "profile" && (
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">Profile Information</h2>

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="avatar">
                                            <div className="w-20 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                                {authUser?.profilePic ? (
                                                    <img src={authUser.profilePic} alt="Profile" />
                                                ) : (
                                                    <span className="text-2xl">
                                                        {authUser?.fullName?.charAt(0)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">{authUser?.fullName}</h3>
                                            <p className="text-base-content/70">{authUser?.email}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Full Name</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered"
                                                defaultValue={authUser?.fullName}
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input
                                                type="email"
                                                className="input input-bordered"
                                                defaultValue={authUser?.email}
                                                disabled
                                            />
                                        </div>

                                        <button className="btn btn-primary">
                                            Update Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === "notifications" && (
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">Notification Preferences</h2>

                                    <div className="space-y-4">
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">Email Notifications</span>
                                                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                                            </label>
                                        </div>

                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">Learning Reminders</span>
                                                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                                            </label>
                                        </div>

                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">New Scenario Alerts</span>
                                                <input type="checkbox" className="toggle toggle-primary" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy Tab */}
                        {activeTab === "privacy" && (
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">Privacy Settings</h2>

                                    <div className="space-y-4">
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">Public Profile</span>
                                                <input type="checkbox" className="toggle toggle-primary" />
                                            </label>
                                        </div>

                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">Share Learning Progress</span>
                                                <input type="checkbox" className="toggle toggle-primary" />
                                            </label>
                                        </div>

                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">Analytics Collection</span>
                                                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Data Tab */}
                        {activeTab === "data" && (
                            <div className="space-y-6">
                                <div className="card bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <h2 className="card-title">Data Management</h2>

                                        <div className="space-y-4">
                                            <button className="btn btn-outline w-full">
                                                <Download size={20} />
                                                Export My Data
                                            </button>

                                            <button className="btn btn-outline w-full">
                                                Download Learning Progress
                                            </button>

                                            <button className="btn btn-outline w-full">
                                                Export Scenarios
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="card bg-error/10 border border-error/20">
                                    <div className="card-body">
                                        <h2 className="card-title text-error">Danger Zone</h2>
                                        <p className="text-error/80">
                                            These actions cannot be undone. Please be careful.
                                        </p>

                                        <div className="space-y-2 mt-4">
                                            <button className="btn btn-outline btn-error w-full">
                                                Clear All Scenarios
                                            </button>

                                            <button className="btn btn-error w-full">
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;