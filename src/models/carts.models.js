import mongoose from "mongoose";

const cartsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
        trim: true,
        alias: "user_id"
    },
    totalPrice: {
        type: Number
    }
});

const Carts = mongoose.model("Carts", cartsSchema);
export default Carts;