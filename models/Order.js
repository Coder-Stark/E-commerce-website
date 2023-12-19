// order.js

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: String,
  amount: Number,
  name: String,
  email: String,
  address: String,
  phone : String,
  city: String,
  state:  String,
  pincode: String,
  products: [{ 
    productId: String,
    quantity: Number
  }],
  status: {
    type: String,
    default: 'Initiated' // You can set a default status if needed
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
