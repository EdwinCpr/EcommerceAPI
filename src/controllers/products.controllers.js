import Products from "../models/products.models.js";

const createProduct = async (req, res) => {
    const { role } = req.user;

    if (role !== "Admin") {
        const error = new Error("No tienes permisos de administrador");
        return res.status(400).json({ msg: error.message });
    };

    try {
        await Products.create(req.body);
        res.status(201).json({ msg: "Producto creado exitosamente" });
    } catch (error) {
        console.log(error);
    };
};

const getProducts = async (req, res) => {
    const products = await Products.find().select("_id name description price categoryId available").populate({ path: "categoryId", select: "_id name" });
    try {
        res.json(products);
    } catch (error) {
        console.log(error);
    };
};

export {
    createProduct,
    getProducts
};
