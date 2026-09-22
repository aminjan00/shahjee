const Product = require('../models/Product');

// 1. Get All Products
exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category && category !== 'all') {
      filter.category = category.toLowerCase();
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. Get Single Product By ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Helper Function: URL Transformation for Cloudinary Optimization
const optimizeCloudinaryUrl = (url) => {
  if (typeof url === 'string' && url.includes('cloudinary.com') && !url.includes('f_auto,q_auto')) {
    return url.replace('/upload/', '/upload/f_auto,q_auto,w_1200,c_limit/');
  }
  return url;
};

// 3. Create Product
exports.createProduct = async (req, res) => {
  try {
    let productData = { ...req.body };

    if (productData.mainImg) {
      productData.mainImg = optimizeCloudinaryUrl(productData.mainImg);
    }
    if (productData.mainImage) {
      productData.mainImage = optimizeCloudinaryUrl(productData.mainImage);
    }

    if (Array.isArray(productData.angles)) {
      productData.angles = productData.angles.map(optimizeCloudinaryUrl);
    }
    if (Array.isArray(productData.images)) {
      productData.images = productData.images.map(optimizeCloudinaryUrl);
    }

    const product = await Product.create(productData);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 4. Update Product
exports.updateProduct = async (req, res) => {
  try {
    let productData = { ...req.body };

    if (productData.mainImg) {
      productData.mainImg = optimizeCloudinaryUrl(productData.mainImg);
    }
    if (productData.mainImage) {
      productData.mainImage = optimizeCloudinaryUrl(productData.mainImage);
    }

    if (Array.isArray(productData.angles)) {
      productData.angles = productData.angles.map(optimizeCloudinaryUrl);
    }
    if (Array.isArray(productData.images)) {
      productData.images = productData.images.map(optimizeCloudinaryUrl);
    }

    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 5. Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};