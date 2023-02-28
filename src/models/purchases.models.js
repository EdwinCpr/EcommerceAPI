import mongoose from "mongoose";

const purchasesSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
        trim: true,
        alias: "product_id"
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts",
        required: true,
        trim: true,
        alias: "cart_id"
    },
    totalPrice: {
        type: Number
    }
}, {
    timestamps: true
});

const Purchases = mongoose.model("Purchases", purchasesSchema);
export default Purchases;