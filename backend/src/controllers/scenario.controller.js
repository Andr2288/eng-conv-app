// backend/src/controllers/scenario.controller.js

import Scenario from "../models/scenario.model.js";

// Отримати всі сценарії користувача
const getScenarios = async (req, res) => {
    try {
        const scenarios = await Scenario.find({ userId: req.user._id });
        return res.status(200).json(scenarios);
    } catch (error) {
        console.log("Error in getScenarios", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Отримати конкретний сценарій
const getScenario = async (req, res) => {
    try {
        const { id } = req.params;
        const scenario = await Scenario.findOne({
            _id: id,
            userId: req.user._id
        });

        if (!scenario) {
            return res.status(404).json({ message: "Scenario not found" });
        }

        return res.status(200).json(scenario);
    } catch (error) {
        console.log("Error in getScenario", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Створити новий сценарій
const createScenario = async (req, res) => {
    try {
        const { name, description, questions } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                message: "Name and description are required"
            });
        }

        const newScenario = new Scenario({
            name,
            description,
            questions: questions || [],
            userId: req.user._id
        });

        await newScenario.save();
        return res.status(201).json(newScenario);
    } catch (error) {
        console.log("Error in createScenario", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Оновити сценарій
const updateScenario = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, questions } = req.body;

        const scenario = await Scenario.findOne({
            _id: id,
            userId: req.user._id
        });

        if (!scenario) {
            return res.status(404).json({ message: "Scenario not found" });
        }

        scenario.name = name || scenario.name;
        scenario.description = description || scenario.description;
        scenario.questions = questions || scenario.questions;

        await scenario.save();
        return res.status(200).json(scenario);
    } catch (error) {
        console.log("Error in updateScenario", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Видалити сценарій
const deleteScenario = async (req, res) => {
    try {
        const { id } = req.params;

        const scenario = await Scenario.findOneAndDelete({
            _id: id,
            userId: req.user._id
        });

        if (!scenario) {
            return res.status(404).json({ message: "Scenario not found" });
        }

        return res.status(200).json({ message: "Scenario deleted successfully" });
    } catch (error) {
        console.log("Error in deleteScenario", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default {
    getScenarios,
    getScenario,
    createScenario,
    updateScenario,
    deleteScenario
};