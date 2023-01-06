const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Error({ statusCode: 401, message: 'Необходима авторизация' }));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch {
    next(new Error({ statusCode: 401, message: 'Необходима авторизация' }));
  }

  req.user = payload;

  next();
};

module.exports = {
  auth,
};
