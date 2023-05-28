require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorsHandler = require('./errors/errorsHandler');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const mycors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();
// app.use(mycors);
app.use(cors());

app.use(requestLogger); // подключаем логгер запросов
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1/mestodb ', {
  useNewUrlParser: true,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
