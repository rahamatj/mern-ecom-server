import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {

    try {
        let user = new User({
            name: req.body.user.name,
            email: req.body.user.email,
            country: req.body.user.country,
            state: req.body.user.state,
            city: req.body.user.city,
            address: req.body.user.address,
            zipCode: req.body.user.zipCode,
            cart: req.body.user.cart.map(
                product => {
                    return {
                        name: product.name,
                        productId: product.productId,
                        quantity: product.quantity,
                    }
                }
            ),
            total: req.body.user.total
        });

        const savedUser = await user.save();

    } catch (error) {
        res.status(500).json({
            "message": error.message,
        });
    }


});

export default router;