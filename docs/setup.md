# Setup Guide

This document explains how to run the Inventory Management System locally.

## Project Structure

```text
inventory-management-system/
  backend/
  frontend/
  docs/
  screenshots/
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

Never commit real `.env` files or production secrets to GitHub.

## Backend Setup

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
uvicorn app.main:app --reload --port 8000
```

Open Swagger UI:

```text
http://127.0.0.1:8000/docs
```

## Frontend Setup

Move into the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the frontend locally:

```bash
npm run dev -- --host 0.0.0.0 --port 5174
```

Open the frontend:

```text
http://localhost:5174
```

## Docker Setup

Run the backend and PostgreSQL database with Docker Compose:

```bash
docker compose up --build
```

Restart containers:

```bash
docker compose down
docker compose up --build
```

## Running Tests

### Backend

```bash
pytest
```

Or inside Docker:

```bash
docker compose exec api pytest
```

### Frontend

```bash
npm run build
```

## Suggested Demo Flow

1. Open the live frontend.
2. Log in with the demo account if available.
3. View the dashboard overview.
4. Add a new inventory item.
5. Edit an existing item.
6. Search for an item by name.
7. Filter items by category.
8. Sort items by price or quantity.
9. Delete a test item.
10. Open Swagger API docs to view backend endpoints.