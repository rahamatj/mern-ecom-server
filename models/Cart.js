import mongoose from 'mongoose';
import { cartItemSchema } from './CartItem.js';

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // One cart per user
        },
        items: [cartItemSchema],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Cart", cartSchema);