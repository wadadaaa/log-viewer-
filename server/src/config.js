import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PORT = process.env.PORT || 3001;

export const LOG_FILE_PATH =
  process.env.LOG_FILE_PATH ||
  path.join(__dirname, '..', 'data', 'log.txt');

export const DB_PATH =
  process.env.DB_PATH ||
  path.join(__dirname, '..', 'data', 'logs.db');
