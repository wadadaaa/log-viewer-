import { Router } from 'express';
import {
  getLogs,
  getLogStats,
  loadLogsIntoDatabase,
} from '../services/logStorage.js';

const router = Router();

router.get('/', (req, res) => {
  const filters = {
    level: req.query.level || '',
    search: req.query.search || '',
    dateFrom: req.query.dateFrom || '',
    dateTo: req.query.dateTo || '',
  };

  const logs = getLogs(filters);
  res.json(logs);
});

router.get('/stats', (_req, res) => {
  const stats = getLogStats();
  res.json(stats);
});

router.post('/reload', (_req, res) => {
  const count = loadLogsIntoDatabase();
  res.json({ message: 'Logs reloaded', count });
});

export default router;
