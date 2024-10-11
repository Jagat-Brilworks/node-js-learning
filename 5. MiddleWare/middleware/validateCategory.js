const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().required(),
});

const validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateCategory;
