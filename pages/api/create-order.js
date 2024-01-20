// pages/api/create-order.js

import Order from '@/models/Order'; // Import the Order model created earlier
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { name, email, orderId, products, address, amount, phone, city, state, pincode } = req.body;

      const newOrder = new Order({
        orderId,
        amount,
        name,
        email,
        address,
        phone,
        city,
        state,
        pincode,
        products,
      });

      const savedOrder = await newOrder.save();

      res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    // console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order', message: error.message });
  }
}
