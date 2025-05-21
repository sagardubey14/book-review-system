const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const authMiddleware = require('../middleware/auth.middleware');


// Protected
router.post('/', authMiddleware, bookController.createBook); 

// Public
router.get('/', bookController.getAllBooks);     
router.get('/:id', bookController.getBookById);

module.exports = router;
