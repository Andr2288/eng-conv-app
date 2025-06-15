// /src/models/user.model.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: ""
        },
        preferences: {
            theme: {
                type: String,
                default: "light"
            },
            language: {
                type: String,
                default: "en"
            },
            notifications: {
                email: {
                    type: Boolean,
                    default: true
                },
                reminders: {
                    type: Boolean,
                    default: true
                },
                newScenarios: {
                    type: Boolean,
                    default: false
                }
            },
            display: {
                compactMode: {
                    type: Boolean,
                    default: false
                },
                animations: {
                    type: Boolean,
                    default: true
                },
                highContrast: {
                    type: Boolean,
                    default: false
                }
            }
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
export default User;