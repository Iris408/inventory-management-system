# Setup Guide

This document explains how to run the Inventory Management System locally.

## Project Structure

```text
inventory-management-system/
  backend/
  frontend/
  docs/
  screenshots/
  docker-compose.yml
```

## Environment Variables

### Frontend

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:8000
```

For production, use the deployed backend URL:

```env
VITE_API_URL=https://inventory-management-system-1wcw.onrender.com
```

### Backend

Create a `.env` file inside the `backend/` folder:

```env
DATABASE_URL=
SECRET_KEY=
ALGORITHM=
ACCESS_TOKEN_EXPIRE_MINUTES=
```

Never commit real `.env` files, passwords, API keys, or production secrets to GitHub.

## Development Workflows

There are two supported ways to run the project.

### Option 1: Frontend Development Without Docker

Use this workflow for quick React and UI development.

Move into the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the frontend:

```text
http://localhost:5173
```

The backend API must be running separately for API requests to work.

### Option 2: Full Application With Docker

Use this workflow to run the frontend, backend API, and PostgreSQL database together.

From the project root, run:

```bash
docker compose up --build
```

Open the services:

| Service | URL |
| --- | --- |
| Frontend | http://localhost:5174 |
| Backend API | http://localhost:8000 |
| Swagger Documentation | http://localhost:8000/docs |

Vite runs on port `5173` inside the frontend container. Docker maps that internal port to `localhost:5174` on the host machine.

This avoids a port conflict with other local projects, such as Bloom, which may already use `localhost:5173`.

## Backend Setup Without Docker

Move into the backend folder:

```bash
cd backend
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Run the FastAPI server:

```bash
uvicorn main:app --reload --port 8000
```

Open Swagger UI:

```text
http://127.0.0.1:8000/docs
```

## Docker Services

Docker Compose starts the following services:

- React and Vite frontend
- FastAPI backend API
- PostgreSQL database

## Restarting the Application

Stop the running containers:

```bash
docker compose down
```

Rebuild and restart the application:

```bash
docker compose up --build
```

## Recreating the Containers

Use this when Docker Compose configuration, Dockerfiles, or dependencies have changed:

```bash
docker compose down
docker compose up --build --force-recreate
```

## Resetting Docker Data

The following command removes the containers and their named volumes:

```bash
docker compose down --volumes
```

Then rebuild:

```bash
docker compose up --build
```

> Warning: removing Docker volumes deletes locally stored PostgreSQL data.

## Running Tests and Checks

### Backend Tests

From the backend folder:

```bash
pytest
```

Or run the tests inside Docker:

```bash
docker compose exec api pytest
```

### Python Syntax Check

From the backend folder:

```bash
python3 -m compileall .
```

Or inside Docker:

```bash
docker compose exec api python -m compileall .
```

### Frontend Build Check

From the frontend folder:

```bash
npm run build
```

Or inside Docker:

```bash
docker compose exec frontend npm run build
```

### Git Whitespace Check

From the project root:

```bash
git diff --check
```

No output means the check passed.

## Demo Account

Use the following account to evaluate the application:

```text
Username: demo_recruiter
Password: InventoryDemo2026!
```

The demo account is intended for portfolio review and uses demonstration data only.

## Suggested Demo Flow

1. Open the live frontend.
2. Log in with the demo account.
3. View the dashboard overview.
4. Add a new inventory item.
5. Edit an existing item.
6. Search for an item by name.
7. Filter items by category.
8. Sort items by price or quantity.
9. Delete a test item.
10. Open Swagger API documentation to review the backend endpoints.

## Stopping the Application

When finished, stop the Docker services:

```bash
docker compose down
```