import jwt from "jsonwebtoken";
import Users from "../models/users.models.js";

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "ecommerceEdwin");
            req.user = await Users.findById(decoded.id).select("_id firstName lastName email password confirmed role token cartId");
            return next();
        } catch (error) {
            return res.status(400).json({ msg: "Token invalido" });
        };
    };

    if (!token) {
        const error = new Error("No tienes token");
        res.status(400).json({ msg: error.message });
    };

    next();
};

export default checkAuth;