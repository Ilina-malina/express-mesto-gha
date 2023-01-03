const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  SUCCESS, CREATED,
} = require('../utils/constants');

const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const getUsers = (req, res, next) => {
  User.find({}).then((users) => {
    res.status(SUCCESS).json(users);
  }).catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.status(SUCCESS).json(user);
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const getMyself = (req, res, next) => {
  User.findOne(req.user)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.status(SUCCESS).json(user);
    }).catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      about,
      avatar,
      password: hash,
    }))
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true, sameSite: true })
        .json(token);
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

const updateProfile = (req, res, next) => {
  if (!req.body.name || !req.body.about) {
    next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
  } else {
    User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    }).orFail(new NotFoundError('Пользователь не найден'))
      .then((user) => {
        res.status(SUCCESS).json(user);
      }).catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(err.message));
        } else {
          next(err);
        }
      });
  }
};

const updateAvatar = (req, res, next) => {
  if (!req.body.avatar) {
    next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
  } else {
    User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    }).orFail(new NotFoundError('Пользователь не найден'))
      .then((user) => {
        res.status(SUCCESS).json(user);
      }).catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(err.message));
        } else {
          next(err);
        }
      });
  }
};

module.exports = {
  getUser,
  getUsers,
  getMyself,
  updateProfile,
  updateAvatar,
  login,
  createUser,
};
