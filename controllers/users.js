const {
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_ERROR,
  SUCCESS,
  CREATED,
  INTERNAL_ERROR_MESSAGE,
  BAD_REQUEST_MESSAGE,
} = require('../responseCodes/responseCodes');

const USER_NOT_FOUND_MESSAGE = { message: 'Пользователь не найден.' };

const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(SUCCESS).json(users);
  } catch (err) {
    console.error(err);
    return res.status(INTERNAL_ERROR).json(INTERNAL_ERROR_MESSAGE);
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);
    if (user === null) {
      return res.status(NOT_FOUND).json(USER_NOT_FOUND_MESSAGE);
    }
    return res.status(SUCCESS).json(user);
  } catch (err) {
    console.error(err);
    return res.status(INTERNAL_ERROR).json(INTERNAL_ERROR_MESSAGE);
  }
};

const createUser = async (req, res) => {
  try {
    if (!req.body || !req.body.name || !req.body.about) {
      return res.status(BAD_REQUEST).json(BAD_REQUEST_MESSAGE);
    }
    const user = await User.create(req.body);
    return res.status(CREATED).json(user);
  } catch (e) {
    console.error(e);
    return res.status(INTERNAL_ERROR).json(INTERNAL_ERROR_MESSAGE);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { body } = req;
    if (!body.name || !body.about) {
      return res.status(BAD_REQUEST).send(BAD_REQUEST_MESSAGE);
    }
    const updatedUser = await User.findByIdAndUpdate(req.user._id, body, {
      new: true,
      runValidators: true,
    });
    return res.status(SUCCESS).json(updatedUser);
  } catch (e) {
    console.error(e);
    return res.status(INTERNAL_ERROR).json(INTERNAL_ERROR_MESSAGE);
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { body } = req;
    if (!body.avatar) {
      return res.status(BAD_REQUEST).send(BAD_REQUEST_MESSAGE);
    }
    const updatedAvatar = await User.findByIdAndUpdate(req.user._id, body, {
      new: true,
      runValidators: true,
    });
    return res.status(SUCCESS).json(updatedAvatar);
  } catch (e) {
    console.error(e);
    return res.status(INTERNAL_ERROR).json(INTERNAL_ERROR_MESSAGE);
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
};
