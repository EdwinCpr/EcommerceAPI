import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true,
        trim: true,
        alias: "category_id"
    },
    available: {
        type: Boolean,
        default: true
    }
});

const Products = mongoose.model("Products", productsSchema);
export default Products;