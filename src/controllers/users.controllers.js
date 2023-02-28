import Users from "../models/users.models.js";
import bcrypt from "bcrypt";
import generateID from "../helpers/generateID.helpers.js";
import generateJWT from "../helpers/generateJWT.helpers.js";
import { createCart } from "./carts.controllers.js";

const createUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (user) {
        const error = new Error("Este email se encuentra en uso");
        return res.status(400).json({ msg: error.message });
    };

    try {
        const newUser = await Users.create(req.body);
        await createCart(newUser._id);
        const hash = await bcrypt.hash(password, 10);
        newUser.token = generateID();
        newUser.password = hash;
        await newUser.save();
        res.status(201).json({ msg: "Te has registrado exitosamente" });
    } catch (error) {
        console.log(error);
    };
};

const confirmedUser = async (req, res) => {
    const { token } = req.params;
    const user = await Users.findOne({ token });

    if (!user) {
        const error = new Error("Token invalido");
        return res.status(400).json({ msg: error.message });
    };

    try {
        user.token = "";
        user.confirmed = true;
        await user.save();
        res.json({ msg: "Has confirmado tu cuenta, puedes iniciar seccion" });
    } catch (error) {
        console.log(error);
    };
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
        const error = new Error("Credenciales incorrectas");
        return res.status(400).json({ msg: error.message });
    };

    if (!user.confirmed) {
        const error = new Error("Debes confirmar tu cuenta, revisa tu email");
        return res.status(400).json({ msg: error.message });
    };

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
        const error = new Error("Contraseña incorrecta");
        return res.status(400).json({ msg: error.message });
    };

    try {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            confirmed: user.confirmed,
            role: user.role,
            token: generateJWT(user._id)
        });
    } catch (error) {
        console.log(error);
    };
};

const getAllUser = async (req, res) => {
    const { role } = req.user;
    const users = await Users.find().select("_id firstName lastName email confirmed role createdAt updatedAt token");
    if (role !== "Admin") {
        const error = new Error("No tienes permisos de administrador");
        return res.status(400).json({ msg: error.message });
    };

    try {
        res.json(users);
    } catch (error) {
        console.log(error);
    };
};

export {
    createUser,
    confirmedUser,
    login,
    getAllUser
};