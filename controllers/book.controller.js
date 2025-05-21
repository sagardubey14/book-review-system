const Book = require('../models/book.model');
const Review = require('../models/review.model');

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;

    const newBook = new Book({
      title,
      author,
      genre,
      description,
      createdBy: req.user._id
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: 'Error creating book', error: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const query = {};

    if (author) query.author = new RegExp(author, 'i');
    if (genre) query.genre = new RegExp(genre, 'i');

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(query);

    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: books
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const book = await Book.findById(id).populate('createdBy', 'username');
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ bookId: id })
      .populate('userId', 'username')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalReviews = await Review.countDocuments({ bookId: id });

    const avgRatingAgg = await Review.aggregate([
      { $match: { bookId: book._id } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    const avgRating = avgRatingAgg[0]?.avgRating || 0;

    res.status(200).json({
      book,
      avgRating: avgRating.toFixed(2),
      reviews: {
        total: totalReviews,
        page: parseInt(page),
        limit: parseInt(limit),
        data: reviews
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book details', error: err.message });
  }
};
