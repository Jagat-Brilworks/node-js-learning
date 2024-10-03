const express = require('express');
const Joi = require('joi');
const app = express();
const port = 5000;

let books = [
  {
    id: 1,
    name: 'The Silent Forest',
    author: 'John Doe',
    year: 1999,
    genre: 'Fiction',
  },
  {
    id: 2,
    name: 'Winds of Change',
    author: 'Jane Smith',
    year: 2005,
    genre: 'Drama',
  },
  {
    id: 3,
    name: 'The Forgotten Path',
    author: 'Emily Johnson',
    year: 2010,
    genre: 'Thriller',
  },
  {
    id: 4,
    name: 'Echoes of Time',
    author: 'Michael Brown',
    year: 2020,
    genre: 'Sci-Fi',
  },
];

app.use(express.json());

/** Validation schema */
const bookSchema = Joi.object({
  name: Joi.string().max(50).required(),
  author: Joi.string().max(50).required(),
  year: Joi.number()
    .integer()
    .min(1000)
    .max(new Date().getFullYear())
    .required(),
  genre: Joi.string().max(30).optional(),
});

/** Error handling middleware */
const errorHandler = (err, req, res, next) => {
  if (err.isJoi) {
    return res.status(400).json({ error: err.details[0].message });
  }
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
};

/** Route to get all books with pagination and filtering */
app.get('/books', (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;

  let filteredBooks = books;

  // Apply filtering based on author and genre
  if (author)
    filteredBooks = filteredBooks.filter((book) =>
      book.author.toLowerCase().includes(author.toLowerCase()),
    );
  if (genre)
    filteredBooks = filteredBooks.filter((book) =>
      book.genre.toLowerCase().includes(genre.toLowerCase()),
    );

  // Pagination
  const startIndex = (page - 1) * limit;
  const paginatedBooks = filteredBooks.slice(
    startIndex,
    startIndex + Number(limit),
  );

  res.json({
    total: filteredBooks.length,
    page: Number(page),
    limit: Number(limit),
    data: paginatedBooks,
  });
});

/** Route to get a specific book by ID */
app.get('/books/:id', (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

/** Route to create a new book */
app.post('/books', (req, res, next) => {
  const { error, value } = bookSchema.validate(req.body);
  if (error) return next(error);

  const newBook = { id: books.length + 1, ...value };
  books.push(newBook);
  res.status(201).json(newBook);
});

/** Route to update a book by ID */
app.put('/books/:id', (req, res, next) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const { error, value } = bookSchema.validate(req.body);
  if (error) return next(error);

  // Update the book details
  Object.assign(book, value);
  res.json(book);
});

/** Route to delete a book by ID */
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1)
    return res.status(404).json({ error: 'Book not found' });

  books.splice(bookIndex, 1);
  res.status(200).send('Book Deleted Successfully!');
});

/** Wildcard route for undefined paths */
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

/** Custom error handler */
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
