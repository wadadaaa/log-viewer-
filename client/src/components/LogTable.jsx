const LEVEL_CLASS = {
  INFO: 'level-info',
  WARNING: 'level-warning',
  ERROR: 'level-error',
  DEBUG: 'level-debug',
};

export default function LogTable({ logs }) {
  if (logs.length === 0) {
    return (
      <div className="empty-state">
        <p>No log entries match the current filters.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Level</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="cell-timestamp">
                <time dateTime={log.timestamp.replace(' ', 'T')}>
                  {log.timestamp}
                </time>
              </td>
              <td className="cell-level">
                <span className={`badge ${LEVEL_CLASS[log.level] || ''}`}>
                  {log.level}
                </span>
              </td>
              <td className="cell-message">{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
