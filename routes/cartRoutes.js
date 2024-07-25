const express = require('express');
const { getCart, addToCart, removeFromCart, editFromCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/:productId', protect, editFromCart);
router.delete('/:productId', protect, removeFromCart);

module.exports = router;
