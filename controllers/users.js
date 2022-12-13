const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);
    if (user === null) {
      return res.status(404).json({ message: 'Пользователь не найден.' });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Переданы некорректные данные при создании пользователя.' });
    }
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { body } = req;
    if (!body.name || !body.about) {
      return res.status(400).send({ message: 'Переданы некорректные данные при обновлении пользователя.' });
    }
    const updatedUser = await User.findByIdAndUpdate(req.user._id, body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(updatedUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { body } = req;
    if (!body.avatar) {
      return res.status(400).send({ message: 'Поле avatar должно быть заполнено' });
    }
    const updatedAvatar = await User.findByIdAndUpdate(req.user._id, body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(updatedAvatar);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
};
