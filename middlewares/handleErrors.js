const handleErrors = ((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).srnd({ message });
  next();
});

module.exports = {
  handleErrors,
};
