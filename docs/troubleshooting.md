# PartsPilot Troubleshooting

## Overview

This guide covers common development, Docker, database, frontend, backend, and CI problems that may occur while working with PartsPilot.

For installation and environment configuration, see the [Setup Guide](./setup.md).

---

# Quick Diagnostics

Before investigating a specific issue, check the current environment.

## Docker Services

```bash
docker compose ps
```

## Docker Logs

```bash
docker compose logs
```

For a specific service:

```bash
docker compose logs api
```

```bash
docker compose logs frontend
```

```bash
docker compose logs db
```

## Backend Tests

```bash
cd backend
pytest
```

## Frontend Build

```bash
cd frontend
npm run build
```

## Docker Compose Configuration

```bash
docker compose config --quiet
```

## Git Status

```bash
git status
```

---

# PostgreSQL Connection Refused

## Example

A backend startup failure may contain an error similar to:

```text
psycopg2.OperationalError:
connection to server at "localhost" failed:
Connection refused
```

## Likely Cause

When FastAPI runs inside Docker, `localhost` refers to the FastAPI container itself.

It does not refer to the PostgreSQL container.

A configuration such as:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5436/DATABASE
```

may work when the backend runs directly on the host but will not work as the connection between Docker Compose services.

## Docker Configuration

Inside the Docker Compose network, use the PostgreSQL service name and internal PostgreSQL port:

```env
DATABASE_URL=postgresql://USER:PASSWORD@db:5432/DATABASE
```

The connection becomes:

```text
FastAPI container
       │
       ▼
    db:5432
       │
       ▼
PostgreSQL container
```

Check the actual PostgreSQL service name in `docker-compose.yml` before changing the connection string.

---

# Local vs Docker Database Ports

PartsPilot can use different database addresses depending on where FastAPI is running.

## Local Backend

```text
FastAPI
   │
   ▼
localhost:<host PostgreSQL port>
```

Example:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5436/DATABASE
```

## Docker Backend

```text
FastAPI container
       │
       ▼
PostgreSQL service
       │
       ▼
db:5432
```

Example:

```env
DATABASE_URL=postgresql://USER:PASSWORD@db:5432/DATABASE
```

The host-mapped PostgreSQL port is not required for communication between containers on the same Compose network.

---

# PostgreSQL Container Is Healthy but API Fails

A healthy database container does not automatically mean the API is using the correct database configuration.

Check:

```bash
docker compose ps
```

Then inspect the API logs:

```bash
docker compose logs api
```

If PostgreSQL is healthy but FastAPI reports a connection error, verify:

- Database hostname
- Database port
- Database name
- Username
- Password
- `DATABASE_URL`
- Docker Compose service name
- Environment variable overrides

---

# Existing PostgreSQL Data

Docker volumes persist database data between normal container restarts.

If PostgreSQL reports:

```text
PostgreSQL Database directory appears to contain a database;
Skipping initialization
```

this normally means an existing PostgreSQL volume is being reused.

This is expected behaviour when persistent database data already exists.

---

## Reset the Local Database

If the existing database state needs to be removed:

```bash
docker compose down -v
```

Then rebuild:

```bash
docker compose up --build
```

> **Warning:** `docker compose down -v` removes Compose-managed volumes and deletes locally persisted PostgreSQL data.

Do not use it as a routine troubleshooting command when the existing data needs to be retained.

---

# Database Schema Problems

If the application code expects a database structure that differs from the current PostgreSQL schema, verify the migration state.

PartsPilot uses Alembic for database schema changes.

Check that:

- The expected migration exists.
- The correct database is being used.
- The database schema matches the application models.
- An older Docker volume is not retaining an incompatible schema.

Avoid deleting the database immediately. Determine whether the problem should be resolved through a migration first.

---

# Backend Does Not Start

Check the backend logs:

```bash
docker compose logs api
```

Or run FastAPI locally:

```bash
cd backend
uvicorn main:app --reload --port 8000
```

If required:

```bash
python3 -m uvicorn main:app --reload --port 8000
```

Common causes include:

- Missing dependencies
- Incorrect imports
- Missing environment variables
- PostgreSQL connection failure
- Invalid database configuration
- Python syntax errors

Run:

```bash
python3 -m compileall .
```

to check Python source compilation.

---

# Frontend Cannot Reach Backend

If the frontend loads but API-dependent functionality fails, check `VITE_API_URL`.

For a locally running backend:

```env
VITE_API_URL=http://localhost:8000
```

The deployed frontend should use the deployed backend URL instead.

Also verify:

- FastAPI is running.
- The configured API port is correct.
- The frontend environment file is being loaded.
- CORS configuration permits the frontend origin.
- The backend deployment is available.

After changing Vite environment variables, restart the development server.

---

# Frontend Build Fails

Run:

```bash
cd frontend
npm run build
```

Read the first meaningful TypeScript or Vite error before making changes.

Common causes include:

- Missing imports
- Deleted or renamed components
- Incorrect import paths
- TypeScript type errors
- Stale legacy files still included in compilation
- Missing dependencies

For example, an old component may still contain:

```text
Cannot find module './components/...'
```

even if that component is no longer part of the active application.

Determine whether the referenced code is still required before recreating a deleted dependency.

If the file is obsolete, removing the legacy file may be more appropriate than restoring unused code.

---

# Docker Build Is Very Slow

If Docker spends a long time transferring the frontend build context, inspect the frontend `.dockerignore`.

Large directories such as:

```text
node_modules/
dist/
.git/
```

should generally not be sent to the Docker daemon when they are unnecessary for the image build.

Also inspect the reported build-context size.

An unexpectedly large context can significantly increase build time.

---

# Docker Changes Are Not Appearing

Containers may still be using an older image.

Rebuild:

```bash
docker compose down
docker compose up --build
```

For a forced recreation:

```bash
docker compose down
docker compose up --build --force-recreate
```

If necessary, inspect the current containers:

```bash
docker compose ps
```

---

# Port Already in Use

PartsPilot deliberately uses host ports that can differ from the application's internal container ports.

Current development examples include:

```text
Frontend: localhost:5174
Docker API: localhost:8001
```

If Docker reports that a port is already allocated, identify the process or container currently using it.

Check running containers:

```bash
docker ps
```

Stop unused PartsPilot containers with:

```bash
docker compose down
```

Do not change ports unnecessarily if the conflict is caused by an old container that should no longer be running.

---

# Backend Tests Fail

Run the tests locally:

```bash
cd backend
pytest -v
```

Focus on the first failing test or collection error.

Common causes include:

- Import errors
- Missing dependencies
- Environment configuration
- Database setup
- Changed endpoint behaviour
- Changed response schemas
- Test assumptions that no longer match the application

Test collection failures should be fixed before debugging individual assertions because the tests have not yet started executing.

---

# Pytest Collects No Tests

If pytest reports:

```text
collected 0 items
```

verify that test files follow pytest naming conventions.

For example:

```text
tests/
└── test_items.py
```

Test functions should also normally begin with:

```python
def test_example():
    ...
```

An empty test file can exist without providing any tests, but CI may treat a run with zero collected tests as a failure.

---

# GitHub Actions Fails but Local Checks Pass

CI and the local environment may differ.

Check:

- Python version
- Node version
- Installed dependencies
- Environment variables
- File path casing
- Operating system differences
- Working directory
- Database/service configuration

Start with the exact command that failed in GitHub Actions and reproduce it locally where possible.

Do not change unrelated application code until the failing CI step is understood.

---

# Docker CI Fails

First determine whether the failure occurs during:

```text
Dockerfile parsing
        ↓
Dependency installation
        ↓
Application build
        ↓
Image creation
```

Run locally:

```bash
docker compose build
```

Also validate Compose:

```bash
docker compose config --quiet
```

Inspect the first meaningful build error rather than only the final Docker failure message.

---

# Authentication Problems

If login succeeds but authenticated requests fail, verify:

- An access token was returned.
- The frontend stored the expected token.
- Requests include the `Authorization` header.
- The header uses the `Bearer` scheme.
- The token has not expired.
- The backend is using the expected authentication configuration.

Authenticated requests should resemble:

```text
Authorization: Bearer <access_token>
```

Swagger can also be used to test protected API behaviour independently of the frontend.

---

# Swagger Works but Frontend Does Not

If API operations work through Swagger but fail through React, the backend itself may not be the source of the problem.

Check:

```text
React
  │
  ├── VITE_API_URL
  ├── request path
  ├── authentication token
  ├── request body
  └── CORS
       │
       ▼
    FastAPI
```

Use the browser developer tools to inspect:

- Request URL
- HTTP method
- Request headers
- Response status
- Response body

This helps separate frontend request problems from backend API problems.

---

# Useful Diagnostic Workflow

When an error occurs:

```text
Observe failure
      │
      ▼
Read exact error
      │
      ▼
Identify affected layer
      │
      ├── Frontend
      ├── Backend
      ├── Database
      ├── Docker
      └── CI
      │
      ▼
Run smallest relevant check
      │
      ▼
Reproduce locally
      │
      ▼
Identify root cause
      │
      ▼
Apply smallest relevant fix
      │
      ▼
Run validation again
```

Avoid rebuilding or resetting the entire application unless the evidence indicates that it is necessary.

---

# Useful Commands

```bash
# Application state
docker compose ps

# All logs
docker compose logs

# API logs
docker compose logs api

# Database logs
docker compose logs db

# Frontend logs
docker compose logs frontend

# Validate Compose
docker compose config --quiet

# Backend tests
cd backend && pytest

# Frontend build
cd frontend && npm run build

# Check Python source
cd backend && python3 -m compileall .

# Check Git whitespace
git diff --check

# Stop application
docker compose down

# Rebuild application
docker compose up --build
```

---

## Related Documentation

- [Setup Guide](./setup.md)
- [Architecture](./architecture.md)
- [API Reference](./api-reference.md)
- [Testing](./testing.md)
- [Project Details](./project-details.md)
- [Roadmap](./roadmap.md)