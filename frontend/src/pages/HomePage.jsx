// frontend/src/pages/HomePage.jsx

import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { BookOpen, Play, Edit, Users } from "lucide-react";

const HomePage = () => {
    const { authUser } = useAuthStore();

    return (
        <div className="min-h-screen pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4">
                        Welcome to English Chat, {authUser?.fullName?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-xl text-base-content/70 mb-8">
                        Practice English conversation with interactive scenarios
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/scenarios" className="btn btn-primary btn-lg">
                            <BookOpen size={20} />
                            View Scenarios
                        </Link>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <Play className="w-8 h-8 text-primary-content" />
                            </div>
                            <h2 className="card-title justify-center">Practice Conversations</h2>
                            <p>Engage in interactive English conversations with different scenarios</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center">
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                                <Edit className="w-8 h-8 text-secondary-content" />
                            </div>
                            <h2 className="card-title justify-center">Create Scenarios</h2>
                            <p>Build your own conversation scenarios and customize the experience</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center">
                            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-accent-content" />
                            </div>
                            <h2 className="card-title justify-center">Improve Skills</h2>
                            <p>Enhance your English speaking and conversation abilities</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link to="/scenarios" className="btn btn-outline">
                            <BookOpen size={16} />
                            Browse All Scenarios
                        </Link>
                        <Link to="/profile" className="btn btn-outline">
                            <Users size={16} />
                            View Profile
                        </Link>
                    </div>
                </div>

                {/* Getting Started */}
                <div className="mt-16 bg-base-200 rounded-box p-8">
                    <h2 className="text-2xl font-bold mb-4 text-center">Getting Started</h2>
                    <div className="steps steps-vertical lg:steps-horizontal w-full">
                        <div className="step step-primary">
                            <div className="text-left">
                                <div className="font-semibold">Explore Scenarios</div>
                                <div className="text-sm opacity-70">Browse available conversation scenarios</div>
                            </div>
                        </div>
                        <div className="step step-primary">
                            <div className="text-left">
                                <div className="font-semibold">Start Practicing</div>
                                <div className="text-sm opacity-70">Choose responses and practice conversations</div>
                            </div>
                        </div>
                        <div className="step">
                            <div className="text-left">
                                <div className="font-semibold">Create Your Own</div>
                                <div className="text-sm opacity-70">Design custom scenarios for practice</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;