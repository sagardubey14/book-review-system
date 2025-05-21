const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const reviewRoutes = require('./routes/review.routes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

connectDB();
const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
