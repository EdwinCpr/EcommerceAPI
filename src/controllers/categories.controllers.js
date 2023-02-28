import Categories from "../models/categories.models.js";

const createCategory = async (req, res) => {
    const { role } = req.user;
    const { name } = req.body;
    const category = await Categories.findOne({ name });

    if (role !== "Admin") {
        const error = new Error("No tienes permisos de administrador");
        return res.status(400).json({ msg: error.message });
    };

    if (category) {
        const error = new Error("Esta categoria ya se encuentra registrada");
        return res.status(400).json({ msg: error.message });
    };

    try {
        await Categories.create(req.body);
        res.status(201).json({ msg: "Categoria creada exitosamente" });
    } catch (error) {
        console.log(error);
    };
};

export {
    createCategory
};