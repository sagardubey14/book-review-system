const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating:  { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
