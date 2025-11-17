import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    noOfSales: {
        type: Number,
        default: 0,
    },
    color: {
        type: String,
    },
    tags: {
        type: [String],
    },
    qty: {
        type: Number,
    },
    size: {
        type: String,
    },
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

export default Product;