import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { stream } from './common/logging';
import router from './Routes';

import checkAuthentication from './utils/checkAuthentication';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(checkAuthentication);

app.use(
  morgan(
    ':method :status :url :userId size req :req[content-length] res :res[content-length] - :response-time ms',
    {
      stream: stream
    }
  )
);

app.use(router);

export default app;
