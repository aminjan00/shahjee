const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Global CORS Configuration
const corsOptions = {
  origin: '*', // Vercel, Railway, aur Localhost sab ke liye open hai
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Pre-flight requests ko allow karne ke liye

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/banners', require('./routes/bannerRoutes'));

app.get('/', (req, res) => {
  res.send('Shah Jee Laptops API Backend Running Successfully!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
