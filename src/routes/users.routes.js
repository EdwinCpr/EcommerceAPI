import express from "express";
import { confirmedUser, createUser, getAllUser, login } from "../controllers/users.controllers.js";
import checkAuth from "../middlewares/checkAuth.middlewares.js";

const router = express.Router();
router.route("/users").post(createUser).get(checkAuth, getAllUser);
router.get("/users/confirmed/:token", confirmedUser);
router.post("/users/login", login);

export default router;