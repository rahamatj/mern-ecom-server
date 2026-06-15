import express from 'express';
import { CartItem } from '../models/CartItem.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/checkout', async (req, res) => {

    try {
        let user = new User({
            name: req.body.user.name,
            email: req.body.user.email,
        });

        for (let i = 0; i < req.body.user.cartItems.length; i++) {
            let cartItem = new CartItem({
                productId: "6a22eca8d0db1dd6b376c349",
                quantity: req.body.user.cartItems[i].quantity
            });

            let savedCartItem = await cartItem.save();

            user.cartItems = [...user.cartItems, savedCartItem];

            // console.log(user.cartItems);
        }

        const savedUser = await user.save();

        res.json(
            {
                "message": "Checkout successful!",
                "status": "success",
                "data": savedUser
            }
        );

    } catch (error) {
        res.status(500).json({
            "message": error.message,
        });
    }


});

export default router;