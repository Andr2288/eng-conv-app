// backend/src/routes/scenario.route.js

import express from 'express';
import scenarioController from "../controllers/scenario.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Всі роути потребують авторизації
router.use(authMiddleware.protectRoute);

// GET /api/scenarios - отримати всі сценарії
router.get("/", scenarioController.getScenarios);

// GET /api/scenarios/:id - отримати конкретний сценарій
router.get("/:id", scenarioController.getScenario);

// POST /api/scenarios - створити новий сценарій
router.post("/", scenarioController.createScenario);

// PUT /api/scenarios/:id - оновити сценарій
router.put("/:id", scenarioController.updateScenario);

// DELETE /api/scenarios/:id - видалити сценарій
router.delete("/:id", scenarioController.deleteScenario);

export default router;