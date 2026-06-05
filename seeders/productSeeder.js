import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;
// console.log('MONGO_URI:', MONGO_URI);
// process.exit(0);

const seedProducts = async (count = 100) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Optional: Clear existing products
        await Product.deleteMany({});
        console.log('🧹 Cleared existing products');

        const tags = ['oriental', 'unbranded', 'electronic'];
        const sizes = ['S', 'M', 'L', 'XL'];
        const colors = ['Red', 'Blue', 'White', 'Grey'];

        // Generate fake products
        const products = Array.from({ length: count }).map(() => ({
            name: faker.commerce.productName(),
            image: `/frontend/images/product-${faker.number.int({ min: 1, max: 16 })}.jpg`,
            price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
            description: faker.commerce.productDescription(),
            inStock: faker.datatype.boolean(),
            noOfSales: faker.number.int({ min: 0, max: 1000 }),
            color: faker.helpers.arrayElement(colors),
            tags: tags[Math.floor(Math.random() * tags.length)],
            size: faker.helpers.arrayElement(sizes),
            qty: faker.number.int({ min: 1, max: 100 }),
            totalPrice: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
        }));

        await Product.insertMany(products);
        console.log(`🎉 Successfully inserted ${count} products`);

        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');

        process.exit(1);
    } catch (error) {
        console.error('❌ Error seeding products:', error);

        process.exit(0);
    }
};

// Run the seeder
seedProducts(100);
