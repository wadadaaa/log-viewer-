const API_BASE = '/api';

export async function fetchLogs(filters) {
  const params = new URLSearchParams();

  if (filters.level) params.set('level', filters.level);
  if (filters.search) params.set('search', filters.search);
  if (filters.dateFrom) params.set('dateFrom', filters.dateFrom);
  if (filters.dateTo) params.set('dateTo', filters.dateTo);

  const query = params.toString();
  const url = query ? `${API_BASE}/logs?${query}` : `${API_BASE}/logs`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to load logs');
  }

  return response.json();
}

export async function fetchLogStats() {
  const response = await fetch(`${API_BASE}/logs/stats`);

  if (!response.ok) {
    throw new Error('Failed to load stats');
  }

  return response.json();
}

export async function reloadLogs() {
  const response = await fetch(`${API_BASE}/logs/reload`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to reload logs');
  }

  return response.json();
}
