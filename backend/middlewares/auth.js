// const jwt = require('jsonwebtoken');
// const { AuthError } = require('../errors/index-errors');

// // eslint-disable-next-line consistent-return
// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (!token) {
//     return next(new AuthError('Токен остутствует или некорректен'));
//   }

//   let payload;

//   try {
//     payload = jwt.verify(token, 'some-secret-key');
//   } catch (err) {
//     return next(err);
//   }

//   req.user = payload;

//   return next();
// };

// код для авторизации запроса

const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/index-errors');

// const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError('Токен остутствует или некорректен'));
  }

  let payload;
  try {
    // payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new AuthError('Токен не верифицирован, авторизация не пройдена'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
