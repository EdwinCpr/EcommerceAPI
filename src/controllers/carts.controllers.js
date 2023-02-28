import Carts from "../models/carts.models.js";
import Products from "../models/products.models.js";
import productsInCart from "../models/productsInCart.models.js";
import Users from "../models/users.models.js";

const createCart = async (req, res) => {
    const newCart = await Carts.create({ userId: req });
    const user = await Users.findById(req);
    user.cartId = newCart._id;
    user.save();
};

const addProductInCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const { cartId } = req.user;
    const id = productId;

    const productInCart = await productsInCart.find({ cartId });
    const product = await Products.findById(id);

    const searchProduct = productInCart.some(product => product.productId.toString() === productId);

    if (searchProduct) {
        const error = new Error("Ya se encuentra este producto en el carrito");
        return res.status(400).json({ msg: error.message });
    };

    if (quantity > product.quantity) {
        const error = new Error(`Quedan disponible solamente ${product.quantity}`);
        return res.status(400).json({ msg: error.message });
    };

    try {
        await productsInCart.create({ cartId, productId, quantity });
        res.status(201).json({ msg: "Agregaste un producto al carrito" });
    } catch (error) {
        console.log(error);
    };
};

const getCart = async (req, res) => {
    const { cartId } = req.user;
    const productInCart = await productsInCart.find({ cartId }).populate({ path: "productId", select: "_id name description price categoryId", populate: { path: "categoryId", select: "_id name" } }).select("_id productId quantity");

    try {
        const id = cartId;
        const cart = await Carts.findById(id).select("totalPrice");
        let total = 0;
        productInCart.forEach(product => {
            let priceU = product.productId.price * product.quantity;
            total = total + priceU;
        });
        cart.totalPrice = total;
        await cart.save()
        res.json({ productInCart, cart });
    } catch (error) {
        console.log(error);
    };
};

const deleteProductInCart = async (req, res) => {
    const { id } = req.params;
    const product = await productsInCart.findByIdAndDelete(id);

    try {
        res.json({ msg: "Has eliminado un producto del carrito" });
    } catch (error) {
        console.log(error);
    };
};

export {
    createCart,
    addProductInCart,
    getCart,
    deleteProductInCart
};