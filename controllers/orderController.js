const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;
  try {
    const order = new Order({
      user: req.user.id,
      orderItems,
      totalPrice,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
