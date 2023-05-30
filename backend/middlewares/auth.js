// const jwt = require('jsonwebtoken');
// const { AuthError } = require('../errors/index-errors');

// const { NODE_ENV, JWT_SECRET } = process.env;

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   let payload;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     throw new AuthError('Необходима авторизация');
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

const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/index-errors');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET = 'secret-key', JWT_DEV = 'dev-key' } = process.env;
  const token = req.cookies.jwt;
  const secretKey = NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV;

  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload; // записываем пейлоуд в объект запроса
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  next(); // пропускаем запрос дальше
};
