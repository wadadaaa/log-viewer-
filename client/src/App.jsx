import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchLogs, fetchLogStats, reloadLogs } from './api.js';
import LogFilters from './components/LogFilters.jsx';
import LogTable from './components/LogTable.jsx';
import { useDebouncedValue } from './hooks/useDebouncedValue.js';

const EMPTY_FILTERS = {
  level: '',
  search: '',
  dateFrom: '',
  dateTo: '',
};

const STAT_CLASS = {
  INFO: 'stat-info',
  WARNING: 'stat-warning',
  ERROR: 'stat-error',
  DEBUG: 'stat-debug',
};

function hasActiveFilters(filters) {
  return Object.values(filters).some(Boolean);
}

export default function App() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const debouncedSearch = useDebouncedValue(filters.search, 300);

  const queryFilters = useMemo(
    () => ({
      level: filters.level,
      search: debouncedSearch,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
    }),
    [filters.level, filters.dateFrom, filters.dateTo, debouncedSearch]
  );

  const loadData = useCallback(async (currentFilters) => {
    setLoading(true);
    setError('');

    try {
      const [logsData, statsData] = await Promise.all([
        fetchLogs(currentFilters),
        fetchLogStats(),
      ]);

      setLogs(logsData);
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(queryFilters);
  }, [queryFilters, loadData]);

  const isSearchPending = filters.search !== debouncedSearch;

  function handleFilterChange(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function handleReset() {
    setFilters(EMPTY_FILTERS);
  }

  async function handleReload() {
    await reloadLogs();
    await loadData(queryFilters);
  }

  function handleStatClick(level) {
    setFilters((prev) => ({
      ...prev,
      level: prev.level === level ? '' : level,
    }));
  }

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <h1>Log Viewer</h1>
          <p className="subtitle">
            View and filter entries from <code>server/data/log.txt</code>
          </p>
        </div>
        <div className="header-status" aria-live="polite">
          {loading || isSearchPending ? (
            <span className="status-pill status-pill--loading">Updating…</span>
          ) : (
            <span className="status-pill">
              {logs.length} {logs.length === 1 ? 'entry' : 'entries'}
            </span>
          )}
        </div>
      </header>

      <section className="stats" aria-label="Log level statistics">
        {stats.map((item) => (
          <button
            key={item.level}
            type="button"
            className={`stat-card ${STAT_CLASS[item.level] || ''} ${
              filters.level === item.level ? 'stat-card--active' : ''
            }`}
            onClick={() => handleStatClick(item.level)}
            title={`Filter by ${item.level}`}
          >
            <span className="stat-level">{item.level}</span>
            <span className="stat-count">{item.count}</span>
          </button>
        ))}
      </section>

      <LogFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        onReload={handleReload}
        loading={loading}
        hasActiveFilters={hasActiveFilters(filters)}
      />

      {error && <p className="error-banner">{error}</p>}

      <LogTable logs={logs} />
    </main>
  );
}
