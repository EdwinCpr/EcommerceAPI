import mongoose from "mongoose";

const productsInCartSchema = mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts",
        trim: true,
        alias: "cart_id"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
        trim: true,
        alias: "product_id"
    },
    quantity: {
        type: Number
    },
    
});

const productsInCart = mongoose.model("productsInCart", productsInCartSchema);
export default productsInCart;