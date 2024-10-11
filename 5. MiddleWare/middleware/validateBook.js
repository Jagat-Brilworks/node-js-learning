const Joi = require('joi');

// Define the validation schema for a book
const bookSchema = Joi.object({
  title: Joi.string().min(3).required(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  publicationYear: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
});

// Middleware to validate book data
const validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);

  if (error) {
    // If validation fails, respond with a 400 Bad Request and the error message
    return res.status(400).json({ error: error.details[0].message });
  }

  next(); // If validation passes, continue to the next middleware
};

module.exports = validateBook;
