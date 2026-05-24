const LEVELS = ['INFO', 'WARNING', 'ERROR', 'DEBUG'];

export default function LogFilters({
  filters,
  onFilterChange,
  onReset,
  onReload,
  loading,
  hasActiveFilters,
}) {
  return (
    <section className="filters" aria-label="Log filters">
      <div className="filters-grid">
        <label className="filter-field" htmlFor="filter-level">
          <span className="filter-label">Level</span>
          <select
            id="filter-level"
            name="level"
            value={filters.level}
            onChange={(event) => onFilterChange('level', event.target.value)}
          >
            <option value="">All levels</option>
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-field filter-field--search" htmlFor="filter-search">
          <span className="filter-label">Search</span>
          <input
            id="filter-search"
            name="search"
            type="search"
            placeholder="Filter by message…"
            value={filters.search}
            onChange={(event) => onFilterChange('search', event.target.value)}
          />
        </label>

        <label className="filter-field" htmlFor="filter-date-from">
          <span className="filter-label">From</span>
          <input
            id="filter-date-from"
            name="dateFrom"
            type="date"
            value={filters.dateFrom}
            onChange={(event) => onFilterChange('dateFrom', event.target.value)}
          />
        </label>

        <label className="filter-field" htmlFor="filter-date-to">
          <span className="filter-label">To</span>
          <input
            id="filter-date-to"
            name="dateTo"
            type="date"
            value={filters.dateTo}
            onChange={(event) => onFilterChange('dateTo', event.target.value)}
          />
        </label>
      </div>

      <div className="filter-actions">
        {hasActiveFilters && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onReset}
            disabled={loading}
          >
            Clear filters
          </button>
        )}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onReload}
          disabled={loading}
        >
          Reload file
        </button>
      </div>
    </section>
  );
}
