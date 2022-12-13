const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate('owner');
    return res.status(200).json(cards);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(201).json(card);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: 'Переданы некорректные данные при создании карточки.' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const id = req.params.cardId;
    if (!id) {
      return res.status(404).json({ message: 'Карточка с указанным id не найдена.' });
    }
    Card.findByIdAndRemove(id);
    return res.status(200).json({ message: 'Карточка удалена!' });
  } catch (err) {
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  );
  res.status(200).json({ message: 'Лайк поставлен' });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  );
  res.status(200).json({ message: 'Лайк удален' });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
