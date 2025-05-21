const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.put('/:id', authMiddleware, reviewController.updateReview);

router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;
