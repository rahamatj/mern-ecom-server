import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    country: String,
    state: String,
    city: String,
    zipCode: String,
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: Number,
        },
    ]
});

export default mongoose.model("User", userSchema);