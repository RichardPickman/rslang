import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import router from './Routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(router);

export default app;
