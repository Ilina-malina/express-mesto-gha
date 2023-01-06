const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  getUsers,
  getMyself,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getMyself);

usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().guid().alphanum(),
  }).unknown(true),
}), getUser);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().email(),
    about: Joi.string(),
  }),
}), updateProfile);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    link: Joi.string(),
  }),
}), updateAvatar);

module.exports = usersRouter;
