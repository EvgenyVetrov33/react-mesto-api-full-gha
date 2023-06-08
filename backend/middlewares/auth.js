// const jwt = require('jsonwebtoken');
// const { AuthError } = require('../errors/index-errors');

// const { NODE_ENV, JWT_SECRET = 'some-secret-key' } = process.env;

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   let payload;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return next(new AuthError('Необходима авторизация'));
//   }

//   const token = authorization.replace('Bearer ', '');
//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
//   } catch (err) {
//     return next(new AuthError('Необходима авторизация'));
//   }

//   req.user = payload;
//   return next();
// };
const { NODE_ENV, JWT_SECRET = 'some-secret-key' } = process.env;
const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/index-errors');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies;

  if (!token) {
    throw new AuthError('Требуется авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return next(err);
  }

  req.user = payload;

  return next();
};
