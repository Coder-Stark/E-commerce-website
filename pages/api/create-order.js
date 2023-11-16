import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Order = mongoose.model('Order', {
  email: String,
  orderId: String,
  products: Array,
  address: String,
  amount: Number,
  status: String,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {name, email, orderId, products, address, amount, status } = req.body;

      const newOrder = new Order({
        name,
        email,
        orderId,
        products,
        address,
        amount,
        status,
      });

      const savedOrder = await newOrder.save();

      res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
