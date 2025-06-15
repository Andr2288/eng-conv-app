// backend/src/models/scenario.model.js

import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    nextQuestionId: {
        type: Number,
        default: null
    }
});

const questionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    answers: [answerSchema]
});

const scenarioSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        questions: [questionSchema],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Scenario = mongoose.model("Scenario", scenarioSchema);
export default Scenario;