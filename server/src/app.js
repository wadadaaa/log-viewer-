import express from 'express';
import cors from 'cors';
import logsRouter from './routes/logs.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/logs', logsRouter);

export default app;
