const allowedCors = [
  'https://moe-mesto.nomoredomains.club',
  'http://moe-mesto.nomoredomains.club',
  'http://localhost:3000',
  'https://localhost:3000',
  'localhost:3000',
];

// const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const corsFunction = (req, res, next) => {
  const { origin } = req.headers;
  // const { method } = req;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
    // if (method === 'OPTIONS') {
    //   const requestHeaders = req.headers['access-control-request-headers'];
    //   res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    //   res.header('Access-Control-Allow-Headers', requestHeaders);
    // }
  }

  next();
};

module.exports = {
  corsFunction,
};
