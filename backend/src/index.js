// backend/src/index.js

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import scenarioRoutes from "./routes/scenario.route.js";
import database from "./lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));

app.use("/api/auth", authRoutes);
app.use("/api/scenarios", scenarioRoutes);

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
    database.connectDB();
});