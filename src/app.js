const path = require('path');
const cors = require('cors');
const YAML = require('yamljs');
require('express-async-errors');
require('express-async-errors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const { NOT_FOUND } = require('http-status-codes');

const winston = require('./common/logging');
const errorHandler = require('./Errors/errorHandler');
const userRouter = require('./Routes/Users');
const wordRouter = require('./Routes/Words');
const userTokenRouter = require('./Routes/Token');
const { userIdValidator } = require('./utils/validation/validator');
const settingRouter = require('./Routes/Settings');
const signinRouter = require('./Routes/SignIn');
const userWordsRouter = require('./Routes/UserWord');
const statisticRouter = require('./Routes/Statistics');
const aggregatedWordsRouter = require('./Routes/AggregatedWords');
const checkAuthentication = require('./utils/checkAuthentication');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/files', express.static(path.join(__dirname, '../files')));

app.use(checkAuthentication);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(
  morgan(
    ':method :status :url :userId size req :req[content-length] res :res[content-length] - :response-time ms',
    {
      stream: winston.stream
    }
  )
);

app.use('/words', wordRouter);

app.use('/signin', signinRouter);

app.use('/users', userRouter);

userRouter.use('/:id/tokens', userIdValidator, userTokenRouter);

userRouter.use('/:id/words', userIdValidator, userWordsRouter);

userRouter.use('/:id/aggregatedWords', userIdValidator, aggregatedWordsRouter);

userRouter.use('/:id/statistics', userIdValidator, statisticRouter);

userRouter.use('/:id/settings', userIdValidator, settingRouter);

app.use((req, res, next) => next(createError(NOT_FOUND)));

app.use(errorHandler);

module.exports = app;
