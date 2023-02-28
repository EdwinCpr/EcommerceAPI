import express from "express";
import { addProductInCart, createCart, deleteProductInCart, getCart } from "../controllers/carts.controllers.js";
import checkAuth from "../middlewares/checkAuth.middlewares.js";

const router = express.Router();
router.route("/carts").post(checkAuth, createCart).get(checkAuth, getCart);
router.post("/carts/add", checkAuth, addProductInCart);
router.post("/carts/delete/:id", checkAuth, deleteProductInCart);

export default router;