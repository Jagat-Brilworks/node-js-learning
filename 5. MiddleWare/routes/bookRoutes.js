const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');
const validateObjectId = require('../middleware/utils');
const validateBook = require('../middleware/validateBook');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     description: Fetch all books with their associated authors and categories.
 *     responses:
 *       200:
 *         description: A list of books with authors and categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find().populate('author category');
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     description: Fetch a single book by its ID, along with the author and category details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The book details with author and category information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       400:
 *         description: Invalid book ID format
 */
router.get('/:id', async (req, res, next) => {
  try {
    const idValidationError = validateObjectId(req.params.id);
    if (idValidationError) {
      throw idValidationError;
    }
    const book = await Book.findById(req.params.id).populate('author category');
    if (!book) {
      const error = new Error('Book not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     description: Create a new book with validation for the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation error
 */
router.post('/', validateBook, async (req, res, next) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     description: Update an existing book by its ID with validation for the request body.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       400:
 *         description: Invalid ID format
 */
router.put('/:id', validateBook, async (req, res, next) => {
  try {
    const idValidationError = validateObjectId(req.params.id);
    if (idValidationError) {
      throw idValidationError;
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      const error = new Error('Book not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     description: Delete a book by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       400:
 *         description: Invalid ID format
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const idValidationError = validateObjectId(req.params.id);
    if (idValidationError) {
      throw idValidationError;
    }

    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      const error = new Error('Book not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
