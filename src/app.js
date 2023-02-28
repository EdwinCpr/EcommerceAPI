import express from "express";
import connectDB from "./config/db.config.js";
import cartsRoutes from "./routes/carts.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import productsRoutes from "./routes/products.routes.js";
import usersRoutes from "./routes/users.routes.js";

connectDB();
const app = express();
app.use(express.json());

app.use("/api/v1", usersRoutes);
app.use("/api/v1", cartsRoutes);
app.use("/api/v1", categoriesRoutes);
app.use("/api/v1", productsRoutes);

export default app;