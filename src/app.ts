import * as env from 'dotenv';
import express from 'express';

env.config();

const app = express();

app.use(express.json());

export default app;
