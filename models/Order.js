// order.js

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: String,
  amount: Number,
  name: String,
  email: String,
  address: String,
  phone : String,
  city: String,
  state:  String,
  pincode: String,
  products: Array,
  status: {
    type: String,
    default: 'Initiated' // You can set a default status if needed
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
