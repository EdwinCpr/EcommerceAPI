import express from "express";
import { createCategory } from "../controllers/categories.controllers.js";
import checkAuth from "../middlewares/checkAuth.middlewares.js";

const router = express.Router();
router.post("/categories", checkAuth, createCategory);

export default router;