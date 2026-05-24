const LOG_PATTERN =
  /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(\w+)\] (.+)/g;

export function parseLogContent(content) {
  const entries = [];
  const matches = content.matchAll(LOG_PATTERN);

  for (const match of matches) {
    entries.push({
      timestamp: match[1],
      level: match[2],
      message: match[3].trim(),
    });
  }

  return entries;
}
