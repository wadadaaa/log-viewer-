import fs from 'fs';
import Database from 'better-sqlite3';
import { DB_PATH, LOG_FILE_PATH } from '../config.js';
import { parseLogContent } from './logParser.js';

const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    level TEXT NOT NULL,
    message TEXT NOT NULL
  )
`);

export function readLogFile() {
  return fs.readFileSync(LOG_FILE_PATH, 'utf-8');
}

export function loadLogsIntoDatabase() {
  const content = readLogFile();
  const entries = parseLogContent(content);

  const clearLogs = db.prepare('DELETE FROM logs');
  const insertLog = db.prepare(
    'INSERT INTO logs (timestamp, level, message) VALUES (?, ?, ?)'
  );

  const saveAll = db.transaction((items) => {
    clearLogs.run();

    for (const entry of items) {
      insertLog.run(entry.timestamp, entry.level, entry.message);
    }
  });

  saveAll(entries);

  return entries.length;
}

export function getLogs(filters = {}) {
  const conditions = [];
  const params = [];

  if (filters.level) {
    conditions.push('level = ?');
    params.push(filters.level);
  }

  if (filters.search) {
    conditions.push('message LIKE ?');
    params.push(`%${filters.search}%`);
  }

  if (filters.dateFrom) {
    conditions.push('timestamp >= ?');
    params.push(filters.dateFrom);
  }

  if (filters.dateTo) {
    conditions.push('timestamp <= ?');
    params.push(`${filters.dateTo} 23:59:59`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const query = `
    SELECT id, timestamp, level, message
    FROM logs
    ${whereClause}
    ORDER BY timestamp ASC
  `;

  return db.prepare(query).all(...params);
}

export function getLogStats() {
  return db
    .prepare(
      `
      SELECT level, COUNT(*) as count
      FROM logs
      GROUP BY level
      ORDER BY level
    `
    )
    .all();
}
