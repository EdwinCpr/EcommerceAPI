import jwt from "jsonwebtoken";

const generateJWT = (id) => {
    return jwt.sign({ id }, "ecommerceEdwin", {
        expiresIn: "365d",
        algorithm: "HS512"
    });
};

export default generateJWT;