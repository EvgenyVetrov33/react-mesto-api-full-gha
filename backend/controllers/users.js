require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET = 'some-secret-key' } = process.env;

const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require('../errors/index-errors');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return res.send({ user });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User
    .findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Переданы некорректные данные при создании пользователя -- ${err.name}`));
      } else {
        next(err);
      }
    });
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(`Переданы некорректные данные при создании пользователя -- ${err.name}`));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User
    .findByIdAndUpdate(
      { _id: req.user._id },
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(`Переданы некорректные данные при обновлении профиля -- ${err.name}`));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(`Переданы некорректные данные при обновлении профиля -- ${err.name}`));
      } else {
        next(err);
      }
    });
};

// dedededeeddssssssssssssssssssssssssssssssssssssssss

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const userSchema = require('../models/user');
// const {
//   BadRequestError,
//   ConflictError,
//   NotFoundError,
// } = require('../errors/index-errors');

// const { NODE_ENV, JWT_SECRET } = process.env;

// module.exports.getAllUsers = (req, res, next) => {
//   userSchema
//     .find({})
//     .then((users) => res.send(users))
//     .catch(next);
// };

// module.exports.getUserById = (req, res, next) => {
//   const { userId } = req.params;

//   userSchema
//     .findById(userId)
//     .then((user) => {
//       if (!user) {
//         throw new NotFoundError('Пользователь не найден');
//       }
//       res.send({ data: user });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return next(new BadRequestError('Передан некорретный Id'));
//       }
//       return next(err);
//     });
// };

// module.exports.getCurrentUser = (req, res, next) => {
//   userSchema.findById(req.user._id)
//     .then((user) => {
//       if (!user) {
//         throw new NotFoundError('Пользователь не найден');
//       }
//       res.status(200)
//         .send(user);
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(BadRequestError('Переданы некорректные данные'));
//       } else if (err.message === 'NotFound') {
//         next(new NotFoundError('Пользователь не найден'));
//       } else {
//         next(err);
//       }
//     });
// };

// module.exports.updateProfile = (req, res, next) => {
//   const {
//     name,
//     about,
//   } = req.body;

//   userSchema
//     .findByIdAndUpdate(
//       req.user._id,
//       {
//         name,
//         about,
//       },
//       {
//         new: true,
//         runValidators: true,
//       },
//     )
//     .then((user) => {
//       if (!user) {
//         throw new NotFoundError('Пользователь не найден');
//       }
//       res.status(200)
//         .send(user);
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError' || err.name === 'CastError') {
//         next(BadRequestError('Переданы некорректные данные'));
//       } else {
//         next(err);
//       }
//     });
// };

// module.exports.updateAvatar = (req, res, next) => {
//   const { avatar } = req.body;

//   userSchema
//     .findByIdAndUpdate(
//       req.user._id,
//       { avatar },
//       {
//         new: true,
//         runValidators: true,
//       },
//     )
//     .then((user) => res.status(200)
//       .send(user))
//     .catch((err) => {
//       if (err.name === 'CastError' || err.name === 'ValidationError') {
//         next(new BadRequestError('Переданы некорректные данные'));
//       } else {
//         next(err);
//       }
//     });
// };

// module.exports.createUser = (req, res, next) => {
//   const {
//     name,
//     about,
//     avatar,
//     email,
//     password,
//   } = req.body;
//   bcrypt.hash(password, 10)
//     .then((hash) => {
//       userSchema
//         .create({
//           name,
//           about,
//           avatar,
//           email,
//           password: hash,
//         })
//         .then(() => res.status(201)
//           .send(
//             {
//               data: {
//                 name,
//                 about,
//                 avatar,
//                 email,
//               },
//             },
//           ))
//         .catch((err) => {
//           if (err.code === 11000) {
//             return next(new ConflictError('Пользователь с таким email уже существует'));
//           }
//           if (err.name === 'ValidationError') {
//             return next(new BadRequestError('Некорректные данные'));
//           }
//           return next(err);
//         });
//     })
//     .catch(next);
// };

// module.exports.login = (req, res, next) => {
//   const {
//     email,
//     password,
//   } = req.body;

//   return userSchema
//     .findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ?
// JWT_SECRET : 'dev-secret', {
//         expiresIn: '7d',
//       });
//       res.send({ token });
//     })
//     .catch(next);
// };
