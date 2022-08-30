import logger from './common/logging';
import mongoose from 'mongoose';
import settings from './common/config';
import app from './app';

mongoose.connect(settings.MONGO_CONNECTION_STRING as string);

const db = mongoose.connection;

db.on('error', () => logger.error('MongoDB connection error:')).once(
  'open',
  () => {
    logger.info('Successfully connect to DB');
    app.listen(settings.PORT, () =>
      logger.info(`App is running on http://localhost:${settings.PORT}`)
    );
  }
);
