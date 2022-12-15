const {
  SUCCESS,
  CREATED,
} = require('../utils/constants');

const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');

const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({}).then((users) => {
    res.status(SUCCESS).json(users);
  }).catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId).then((user) => {
    if (!user) {
      next(new NotFoundError('Пользователь не найден'));
    }
    res.status(SUCCESS).json(user);
  }).catch((err) => {
    if (err.name === 'CastError') {
      next(new NotFoundError('Пользователь не найден'));
    } else {
      next(err);
    }
  });
};

const createUser = (req, res, next) => {
  User.create(req.body).then((user) => {
    res.status(CREATED).send(user);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  });
};

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  }).then((user) => {
    if (!user) {
      next(new NotFoundError('Пользователь не найден'));
    }
    if (!req.body.name || !req.body.about) {
      next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
    }
    res.status(SUCCESS).json(user);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  });
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  }).then((user) => {
    if (!user) {
      next(new NotFoundError('Пользователь не найден'));
    }
    if (!req.body.avatar) {
      next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
    }
    res.status(SUCCESS).json(user);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
};
