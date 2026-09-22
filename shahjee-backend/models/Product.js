const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  mainImg: { type: String, required: true },
  angles: [{ type: String }],
  desc: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);