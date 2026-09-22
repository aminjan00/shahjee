const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  linkUrl: { type: String, default: '#' }
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);