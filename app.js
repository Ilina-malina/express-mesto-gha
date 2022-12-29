const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createUser, login } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { NOT_FOUND, NOT_FOUND_MESSAGE } = require('./utils/constants');
const { handleErrors } = require('./middlewares/handleErrors');
const { auth } = require('./middlewares/auth');

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

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use(handleErrors);

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send(NOT_FOUND_MESSAGE);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
