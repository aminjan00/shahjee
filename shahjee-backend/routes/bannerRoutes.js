const express = require('express');
const router = express.Router();
const { getBanners, createBanner, deleteBanner } = require('../controllers/bannerController');

router.route('/').get(getBanners).post(createBanner);
router.route('/:id').delete(deleteBanner);

module.exports = router;