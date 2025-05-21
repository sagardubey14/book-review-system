const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middleware/auth.middleware');


// Protected
router.post('/', authMiddleware, bookController.createBook); 
router.post('/:id/reviews', authMiddleware, reviewController.createReview);

// Public
router.get('/', bookController.getAllBooks);     
router.get('/search', bookController.searchBooks);
router.get('/:id', bookController.getBookById);


module.exports = router;
