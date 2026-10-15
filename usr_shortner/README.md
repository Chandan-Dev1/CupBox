# Full-Stack URL Shortener

A beginner-friendly URL shortener built with React, Vite, Tailwind CSS, Node.js, Express, MongoDB and Mongoose.

## Features

- Create short URLs from HTTP/HTTPS URLs
- Copy generated short URL
- Redirect short URL to original URL
- Track click count
- Show last 10 generated links
- MongoDB persistence
- Responsive React UI

## Setup

### Backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and set your MongoDB connection string.

Then:

```bash
npm run dev
```

Backend runs on `http://localhost:3000`.

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend normally runs on `http://localhost:5173`.

## APIs

### Health

GET `/api/health`

Response:

```json
{"status":"ok"}
```

### Create short URL

POST `/api/links`

Body:

```json
{
  "url": "https://example.com/products/item?id=10"
}
```

### Get history

GET `/api/links`

### Redirect

GET `/:code`

Example:

```text
http://localhost:3000/aB12xY
```

## Test cases

1. Valid HTTPS URL
2. Valid HTTP URL
3. Empty URL
4. Invalid URL
5. Unsupported protocol
6. Unknown short code

## Important

Do not commit `.env` or `node_modules` to GitHub.
