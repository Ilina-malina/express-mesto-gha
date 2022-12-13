const usersRouter = require('express').Router();
const {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:userId', getUser);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
