const Joi = require('joi');

const authorSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  biography: Joi.string().required(),
});

const validateAuthor = (req, res, next) => {
  const { error } = authorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateAuthor;
