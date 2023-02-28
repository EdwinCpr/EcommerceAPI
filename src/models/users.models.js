import mongoose, { Schema } from "mongoose"

const usersSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        alias: "first_name"
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        alias: "last_name"
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    token: {
        type: String,
        trim: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts",
        alias: "cart_id"
    }
}, {
    timestamps: true
});

const Users = mongoose.model("Users", usersSchema);
export default Users;