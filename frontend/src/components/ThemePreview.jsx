// frontend/src/components/ThemePreview.jsx

import { MessageCircle, User, Bot } from "lucide-react";

const ThemePreview = ({ theme }) => {
    return (
        <div
            className="border rounded-lg p-4 space-y-3 bg-base-100"
            data-theme={theme.name}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base-content">{theme.label}</h3>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded bg-primary"></div>
                    <div className="w-3 h-3 rounded bg-secondary"></div>
                    <div className="w-3 h-3 rounded bg-accent"></div>
                </div>
            </div>

            {/* Mock Chat */}
            <div className="space-y-2">
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-6 rounded-full bg-primary text-primary-content flex items-center justify-center">
                            <Bot size={12} />
                        </div>
                    </div>
                    <div className="chat-bubble chat-bubble-primary text-xs">
                        Hi! How are you today?
                    </div>
                </div>

                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-6 rounded-full bg-secondary text-secondary-content flex items-center justify-center">
                            <User size={12} />
                        </div>
                    </div>
                    <div className="chat-bubble chat-bubble-secondary text-xs">
                        I'm great, thanks!
                    </div>
                </div>
            </div>

            {/* Mock UI Elements */}
            <div className="space-y-2">
                <div className="flex gap-2">
                    <button className="btn btn-primary btn-xs">Primary</button>
                    <button className="btn btn-secondary btn-xs">Secondary</button>
                </div>

                <div className="w-full bg-base-200 rounded h-2"></div>
                <div className="w-2/3 bg-base-300 rounded h-2"></div>
            </div>
        </div>
    );
};

export default ThemePreview;