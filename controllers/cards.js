const Card = require('../models/card');

const {
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_ERROR,
  SUCCESS,
  CREATED,
  INTERNAL_ERROR_MESSAGE,
  BAD_REQUEST_MESSAGE,
} = require('../utils/constants');

const NOT_FOUND_MESSAGE = { message: 'Карточка с указанным id не найдена.' };

const getCards = (req, res, next) => {
  Card.find({}).populate('owner').then((cards) => {
    res.status(SUCCESS).json(cards);
  }).catch(next);
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(CREATED).json(card);
  } catch (e) {
    console.error(e);
    return res.status(BAD_REQUEST).json(BAD_REQUEST_MESSAGE);
  }
};

const deleteCard = async (req, res) => {
  try {
    const id = req.params.cardId;
    if (!id) {
      return res.status(NOT_FOUND).json(NOT_FOUND_MESSAGE);
    }
    Card.findByIdAndRemove(id);
    return res.status(SUCCESS).json({ message: 'Карточка удалена!' });
  } catch (err) {
    return res.status(INTERNAL_ERROR).json(INTERNAL_ERROR_MESSAGE);
  }
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  );
  res.status(SUCCESS).json({ message: 'Лайк поставлен' });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  );
  res.status(SUCCESS).json({ message: 'Лайк удален' });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
