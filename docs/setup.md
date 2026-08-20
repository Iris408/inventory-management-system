# PartsPilot Setup Guide

## Overview

This guide explains how to run PartsPilot locally using either a standard development environment or Docker Compose.

PartsPilot consists of:

- React and TypeScript frontend
- FastAPI backend
- PostgreSQL database

Two primary development workflows are supported:

1. Run the frontend and backend locally.
2. Run the complete application with Docker Compose.

---

## Prerequisites

For local development:

- Git
- Python 3
- pip
- Node.js
- npm
- PostgreSQL

For containerised development:

- Docker
- Docker Compose

---

## Clone the Repository

```bash
git clone https://github.com/Iris408/partspilot.git
cd partspilot
```

---

# Environment Configuration

PartsPilot uses environment variables for frontend configuration, database connections, and authentication.

Real `.env` files, passwords, database credentials, API keys, and production secrets must not be committed to Git.

---

## Frontend Environment

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:8000
```

This configuration is used when the FastAPI backend is running locally on port `8000`.

For the deployed frontend, please use the deployed backend URL:

```env
VITE_API_URL=https://inventory-management-system-1wcw.onrender.com
```

---

## Backend Environment

Create a `.env` file inside `backend/`.

The backend requires configuration similar to:

```env
DATABASE_URL=
SECRET_KEY=
ALGORITHM=
ACCESS_TOKEN_EXPIRE_MINUTES=
```

Authentication secrets and database credentials should be configured for the environment in which PartsPilot is running.

---

# Local Development

## Backend

Move into the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python3 -m venv .venv
```

Activate it on macOS/Linux:

```bash
source .venv/bin/activate
```

Install the dependencies:

```bash
python3 -m pip install --upgrade pip
pip install -r requirements.txt
```

> Depending on the local Python installation, commands may use either `python` or `python3`.

---

## Local PostgreSQL Connection

When FastAPI is running directly on the host machine, the database connection should use the host-accessible PostgreSQL address and port.

Example:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5436/DATABASE
```

The exact port depends on the local PostgreSQL configuration.

The important distinction is that `localhost` refers to the host machine when the backend itself is also running on the host.

---

## Run FastAPI

From `backend/`:

```bash
uvicorn main:app --reload --port 8000
```

If required:

```bash
python3 -m uvicorn main:app --reload --port 8000
```

The local API is available at:

| Service | URL |
| --- | --- |
| API | `http://localhost:8000` |
| Swagger | `http://localhost:8000/docs` |

---

## Frontend

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

The frontend development server is available at:

```text
http://localhost:5174
```

The FastAPI backend must also be running for API-dependent functionality to work.

---

# Docker Compose

Docker Compose provides the easiest way to run the complete PartsPilot development environment.

The Compose environment starts:

- React / Vite frontend
- FastAPI API
- PostgreSQL database

From the project root:

```bash
docker compose up --build
```

To run the services in the background:

```bash
docker compose up --build -d
```

---

## Docker Services

When running through Docker Compose:

| Service | Host URL |
| --- | --- |
| Frontend | `http://localhost:5174` |
| Backend API | `http://localhost:8001` |
| Swagger | `http://localhost:8001/docs` |

The frontend runs on port `5173` inside its container and is mapped to port `5174` on the host.

The FastAPI service runs on its internal container port and is exposed through port `8001` on the host.

---

# PostgreSQL and Docker Networking

Database configuration differs between local and Docker execution.

This distinction is important.

## Local Backend

When FastAPI runs directly on the host:

```text
FastAPI
   │
   ▼
localhost:<PostgreSQL host port>
```

A local connection may therefore resemble:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5436/DATABASE
```

---

## Docker Backend

When FastAPI runs inside Docker Compose, `localhost` refers to the FastAPI container itself.

It does **not** refer to the PostgreSQL container.

The backend must instead connect using the PostgreSQL Compose service name:

```text
FastAPI container
       │
       ▼
    db:5432
       │
       ▼
PostgreSQL container
```

A Docker database connection therefore resembles:

```env
DATABASE_URL=postgresql://USER:PASSWORD@db:5432/DATABASE
```

PostgreSQL uses its internal container port `5432` for communication between Compose services.

Host port mappings are only required when accessing PostgreSQL from outside the Docker network.

---

# Verify the Docker Environment

Check the current service state:

```bash
docker compose ps
```

All required application services should be running and healthy.

Check the API:

```bash
curl http://localhost:8001/
```

Open Swagger:

```text
http://localhost:8001/docs
```

---

# Restarting PartsPilot

Stop the environment:

```bash
docker compose down
```

Rebuild and restart:

```bash
docker compose up --build
```

---

## Force Recreate

When Dockerfiles, Compose configuration, dependencies, or environment configuration have changed:

```bash
docker compose down
docker compose up --build --force-recreate
```

---

# Resetting PostgreSQL Data

Docker volumes persist PostgreSQL data between normal container restarts.

To remove the containers and their associated Compose-managed volumes:

```bash
docker compose down --volumes
```

Then rebuild:

```bash
docker compose up --build
```

> **Warning:** removing the PostgreSQL volume deletes locally persisted database data. Back up any data that needs to be retained before resetting the volume.

---

# Development Checks

Before committing changes, run the checks relevant to the area being modified.

## Backend Tests

```bash
cd backend
pytest
```

## Python Validation

```bash
python3 -m compileall .
```

## Frontend Production Build

```bash
cd frontend
npm run build
```

## Docker Compose Validation

From the project root:

```bash
docker compose config --quiet
```

## Git Whitespace Check

```bash
git diff --check
```

If there is no output from `git diff --check` this means that the check passed.

For the complete testing and CI workflow, please see [Testing](./testing.md).

---

# Stopping PartsPilot

Stop the Docker environment:

```bash
docker compose down
```

This preserves the PostgreSQL volume.

To also remove persistent Compose volumes:

```bash
docker compose down -v
```

Use the volume removal command carefully when working with local data.

---

# Troubleshooting

Common setup problems include:

- Incorrect PostgreSQL host or port
- Using `localhost` from inside a Docker container
- Missing environment variables
- Existing Docker volumes containing older database state
- Port conflicts with other development projects
- Frontend API URL pointing to the wrong backend port

See [Troubleshooting](./troubleshooting.md) for detailed diagnostic steps.

---

## Related Documentation

- [Project Details](./project-details.md)
- [Architecture](./architecture.md)
- [API Reference](./api-reference.md)
- [Testing](./testing.md)
- [Roadmap](./roadmap.md)
- [Troubleshooting](./troubleshooting.md)