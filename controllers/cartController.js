const User = require('../models/User');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.product');
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const product = await Product.findById(productId);

        const cartItem = user.cart.find(item => item.product.toString() === productId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }

        await user.save();
        await user.populate('cart.product'); // Ensure the cart is populated with product details
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.editFromCart = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body; // Get the quantity from the request body
    try {
        const user = await User.findById(req.user.id);
        const cartItem = user.cart.find(item => item.product.toString() === productId);

        if (cartItem) {
            cartItem.quantity += quantity; // Add the quantity
            if (cartItem.quantity <= 0) {
                user.cart = user.cart.filter(item => item.product.toString() !== productId);
            }
        }

        await user.save();
        await user.populate('cart.product'); // Ensure the cart is populated with product details
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;
    try {
        const user = await User.findById(req.user.id);
        user.cart = user.cart.filter(item => item.product.toString() !== productId);

        await user.save();
        await user.populate('cart.product'); // Ensure the cart is populated with product details
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
