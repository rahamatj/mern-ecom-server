import mongoose from 'mongoose';
import { cartItemSchema } from './CartItem.js';

const cartSchema = new mongoose.Schema(
    {
        items: [cartItemSchema],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Cart", cartSchema);