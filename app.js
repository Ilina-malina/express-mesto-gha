const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const PORT = 3000;

const app = express();

// app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '63934d0153e0ee39ed984496',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  console.log('Connected to MongoDB!');
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
