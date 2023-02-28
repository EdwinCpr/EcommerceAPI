import express from "express";
import { createProduct, getProducts } from "../controllers/products.controllers.js";
import checkAuth from "../middlewares/checkAuth.middlewares.js";

const router = express.Router();
router.route("/products").post(checkAuth, createProduct).get(getProducts);

export default router;