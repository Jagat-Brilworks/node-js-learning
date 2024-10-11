/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: API for managing authors
 */

const express = require('express');
const Author = require('../models/authorModel');
const validateObjectId = require('../middleware/utils');
const validateAuthor = require('../middleware/validateAuthor');
const router = express.Router();

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', validateAuthor, async (req, res, next) => {
  try {
    const author = new Author(req.body);
    const savedAuthor = await author.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: A list of all authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 */
router.get('/', async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get a specific author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author
 *     responses:
 *       200:
 *         description: Author details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 */
router.get('/:id', async (req, res, next) => {
  try {
    const idValidationError = validateObjectId(req.params.id);
    if (idValidationError) {
      throw idValidationError;
    }
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(author);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       404:
 *         description: Author not found
 */
router.put('/:id', validateAuthor, async (req, res, next) => {
  try {
    const idValidationError = validateObjectId(req.params.id);
    if (idValidationError) {
      throw idValidationError;
    }
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(updatedAuthor);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const idValidationError = validateObjectId(req.params.id);
    if (idValidationError) {
      throw idValidationError;
    }
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json({ message: 'Author deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
