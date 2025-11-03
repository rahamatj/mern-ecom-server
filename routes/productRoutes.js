import express from 'express';
import Product from "../models/Product.js";
import {faker} from "@faker-js/faker";

const router = express.Router();

router.get('/', (req, res) => {
    res.send("products");
})

router.get(`/paginate`, async (req, res) => {

    let page = 1;
    let limit = 16;

    if (req.query.page) {
        page = Number(req.query.page);
    }

    if (req.query.limit) {
        limit = Number(req.query.limit);
    }

    const skip = (page - 1) * limit

    let products = []

    try {
        products = await Product.find().skip(skip).limit(limit);

        // products = await Product.find()
    } catch (e) {
        console.error(e)
    }

    return res.status(200).json(products);
});

router.get(`/search`, async (req, res) => {

    const search = req.query.search;

    if (search) {
        const products = await Product.find({
            name: { $regex: search, $options: "i" }
        });

        return res.status(200).json(products);
    } else {
        return res.status(404).json({msg: "Product not Found"});
    }
});

router.get(`/sort`, async (req, res) => {
    const sortBy= req.query.sortBy;

    let products = [];

    if (sortBy) {
        switch (sortBy) {
            case "popularityAsc":
                products = await Product.find().sort({ noOfSales: 1 });
                break;
            case "newnessAsc":
                products = await Product.find().sort({ createdAt: -1 });
                break;
            case "priceAsc":
                products = await Product.find().sort({ price: 1 });
                break;
            case "priceDesc":
                products = await Product.find().sort({ price: -1 });
                break;
        }
    }

    res.status(200).json(products);
})

router.get('/price', async (req, res) => {
    const lowerBound = req.query.lowerBound;
    const upperBound = req.query.upperBound;

    let products = [];

    if (lowerBound && upperBound) {
        products = await Product.find({
            price: { $gte: lowerBound, $lte: upperBound }
        })

        if (upperBound === -1) {
            products = await Product.find({
                price: { $gte: lowerBound }
            })
        }
    }

    res.status(200).json(products);
})

router.get('/color', async (req, res) => {
    const color = req.query.color;

    let products = [];

    if (color) {
        products = await Product.find({
            color: color,
        });

        return res.status(200).json(products);
    } else {
        return res.status(404).json({msg: "Product not Found"});
    }
})

router.get('/tag', async (req, res) => {
    const tag = req.query.tag;

    let products = [];

    if (tag) {
        products = await Product.find({
            tags: tag,
        });

        return res.status(200).json(products);
    } else {
        return res.status(404).json({msg: "Product not Found"});
    }
})

export default router;