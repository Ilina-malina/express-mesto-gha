const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { NOT_FOUND, NOT_FOUND_MESSAGE } = require('./utils/constants');
const { handleErrors } = require('./middlewares/handleErrors');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(limiter);

app.use(helmet());
app.disable('x-powered-by');

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '639974931b26c30fa3bf09b5',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(handleErrors);

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send(NOT_FOUND_MESSAGE);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
