import cors from 'cors';
import * as env from 'dotenv';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan';
import errorMiddleware from './middlewares/errorMiddleware';
import routes from './routes';

env.config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

app.get('/', (_req, res) =>
  res.send(`Servidor ativo 🟢 - Rodando na porta ${process.env.API_PORT}!`)
);

export default app;
