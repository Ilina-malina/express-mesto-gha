const Card = require('../models/card');

const {
  SUCCESS,
  CREATED,
} = require('../utils/constants');

const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');

const getCards = (req, res, next) => {
  Card.find({}).populate('owner').then((cards) => {
    res.status(SUCCESS).json(cards);
  }).catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id }).then((card) => {
    res.status(CREATED).json(card);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  });
};

const deleteCard = async (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId).then((card) => {
    if (!card || !req.params.cardId) {
      next(new NotFoundError('Карточка не найдена'));
    }
    res.status(SUCCESS).json({ message: 'Карточка удалена!' });
  }).catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные карточки'));
    } else {
      next(err);
    }
  });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      next(new NotFoundError('Карточка не найдена'));
    }
    res.status(SUCCESS).json({ message: 'Лайк поставлен' });
  }).catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      next(new NotFoundError('Карточка не найдена'));
    }
    res.status(SUCCESS).json({ message: 'Лайк удален' });
  }).catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
