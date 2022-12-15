const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const INTERNAL_ERROR = 500;
const SUCCESS = 200;
const CREATED = 201;

const INTERNAL_ERROR_MESSAGE = { message: 'Произошла ошибка' };
const BAD_REQUEST_MESSAGE = { message: 'Переданы некорректные данные.' };
const NOT_FOUND_MESSAGE = { message: 'Страница не найдена' };

module.exports = {
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_ERROR,
  SUCCESS,
  CREATED,
  INTERNAL_ERROR_MESSAGE,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
};
