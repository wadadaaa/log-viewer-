import app from './app.js';
import { PORT } from './config.js';
import { loadLogsIntoDatabase } from './services/logStorage.js';

const count = loadLogsIntoDatabase();
console.log(`Loaded ${count} log entries into database`);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
