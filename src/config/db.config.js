import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect("mongodb+srv://root:goku@ecommerce.fcavai8.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    };
};

export default connectDB;