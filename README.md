# Log Viewer

Full-stack app for reading, parsing, storing, and filtering log files.

## Architecture

```
log-viewer-app/
├── server/          # Node.js + Express API
│   ├── data/        # log.txt and SQLite database
│   └── src/
│       ├── config.js
│       ├── app.js
│       ├── index.js
│       ├── routes/
│       └── services/
└── client/          # React frontend
    └── src/
        ├── api.js
        ├── App.jsx
        └── components/
```

## Stack

- **Client** — React + Vite
- **Server** — Node.js + Express
- **Database** — SQLite (`better-sqlite3`)
- **Log source** — local file (`server/data/log.txt`)

The backend separates HTTP routes from file parsing and database access in a dedicated services layer. The frontend talks to the API only through `client/src/api.js`.

## Run locally

### Backend

```bash
cd server
npm install
npm run dev
```

Server starts on `http://localhost:3001`.

### Frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

## API

- `GET /api/logs` — list logs
  - query params: `level`, `search`, `dateFrom`, `dateTo`
- `GET /api/logs/stats` — count by level
- `POST /api/logs/reload` — re-read `server/data/log.txt`

## Log format

Each line:

```txt
2023-07-04 10:15:23 [INFO] User logged in: john.doe@example.com
```

Parsed fields:
- timestamp
- level
- message
