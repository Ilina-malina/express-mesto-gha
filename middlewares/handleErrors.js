const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { AccessDeniedError } = require('../errors/AccessDeniedError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const handleErrors = ((err, req, res, next) => {
  if (err instanceof BadRequestError) {
    res.status(400).send({ message: err.message });
  }
  if (err instanceof UnauthorizedError) {
    res.status(401).send({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    res.status(404).send({ message: err.message });
  }
  if (err instanceof AccessDeniedError) {
    res.status(403).send({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: err.message });
  next();
});

module.exports = {
  handleErrors,
};
