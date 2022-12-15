const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');

const handleErrors = ((err, req, res, next) => {
  if (err instanceof BadRequestError) {
    res.status(400).send({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    res.status(404).send({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: err.message });
  next();
});

module.exports = {
  handleErrors,
};
