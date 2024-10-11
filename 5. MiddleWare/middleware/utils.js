const { default: mongoose } = require('mongoose');

const validateObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid ID');
    error.status = 400; // Bad request
    throw error;
  }
};

module.exports = validateObjectId;
