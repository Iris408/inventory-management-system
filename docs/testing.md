# PartsPilot Testing

## Overview

PartsPilot uses automated tests, build validation, and GitHub Actions CI to help detect regressions across the backend, frontend, and containerised application.

The current testing strategy focuses on establishing reliable validation of core behaviour before expanding into broader integration and frontend test coverage.

---

## Current Testing Status

PartsPilot currently includes:

- Backend tests with `pytest`
- FastAPI endpoint testing
- Frontend TypeScript production build validation
- Docker build validation
- GitHub Actions CI
- Local Python validation
- Docker Compose configuration validation

Automated test coverage is still being expanded as the project moves toward maintenance.

---

# Backend Testing

Backend tests are located in:

```text
backend/tests/
```

The test suite uses:

```text
pytest
```

Tests should focus on behaviour that could cause application regressions, including:

- API endpoints
- Inventory operations
- Authentication
- Validation
- Analytics
- Database-dependent behaviour

---

## Run Backend Tests

From the project root:

```bash
cd backend
pytest
```

A successful run should complete without failed tests.

For more detailed output:

```bash
pytest -v
```

---

## Run Tests Inside Docker

When the API container is running:

```bash
docker compose exec api pytest
```

This allows the backend test suite to be executed within the containerised environment.

---

# API Testing

FastAPI provides interactive Swagger/OpenAPI documentation that can also be used for manual API verification.

### Local

```text
http://localhost:8000/docs
```

### Docker

```text
http://localhost:8001/docs
```

Swagger is useful for manually checking:

- Authentication
- Request schemas
- Inventory endpoints
- Query parameters
- Analytics endpoints
- Validation responses
- HTTP status codes

Swagger testing complements the automated test suite but does not replace automated tests.

---

# Frontend Validation

The frontend currently uses production build validation as its primary automated check.

From `frontend/`:

```bash
npm run build
```

This verifies that the React and TypeScript application can successfully produce a production build.

The build process helps identify problems including:

- TypeScript errors
- Missing modules
- Invalid imports
- Build-time configuration problems

Frontend component and interaction testing remains future work.

---

# Python Validation

Python source files can be checked for compilation errors using:

```bash
cd backend
python3 -m compileall .
```

Depending on the local Python installation:

```bash
python -m compileall .
```

The same check can be run inside Docker:

```bash
docker compose exec api python -m compileall .
```

---

# Docker Validation

## Compose Configuration

Before starting the environment, Docker Compose configuration can be validated with:

```bash
docker compose config --quiet
```

No output indicates that the Compose configuration is valid.

---

## Build Validation

The complete application can be rebuilt with:

```bash
docker compose build
```

Or started with a fresh build:

```bash
docker compose up --build
```

This helps detect:

- Invalid Dockerfiles
- Missing files
- Dependency installation failures
- Frontend build problems
- Backend image build problems

---

## Runtime Verification

After starting PartsPilot:

```bash
docker compose ps
```

Confirm that the required services are running and healthy.

The API can then be checked with:

```bash
curl http://localhost:8001/
```

Swagger should also be available at:

```text
http://localhost:8001/docs
```

---

# GitHub Actions

PartsPilot currently uses separate CI workflows for the main application areas.

```text
Push / Pull Request
        │
        ▼
 GitHub Actions
        │
        ├── Backend CI
        │
        ├── Frontend CI
        │
        └── Docker CI
```

## Backend CI

The backend workflow validates the Python application and runs the automated backend test suite.

Its purpose is to catch backend regressions before changes are merged.

---

## Frontend CI

The frontend workflow installs the required Node dependencies and performs a production build.

This verifies that the React and TypeScript application can compile successfully.

---

## Docker CI

The Docker workflow validates that the application images can be built successfully.

This provides an additional infrastructure-level check alongside the backend and frontend workflows.

---

# Recommended Pre-Commit Checks

Not every change requires every available check.

Before committing, run the checks relevant to the code that changed.

### Backend changes

```bash
cd backend
pytest
python3 -m compileall .
```

### Frontend changes

```bash
cd frontend
npm run build
```

### Docker changes

```bash
docker compose config --quiet
docker compose build
```

### Repository-wide check

From the project root:

```bash
git diff --check
```

No output from `git diff --check` means no whitespace errors were detected.

---

# Testing Strategy

PartsPilot's testing strategy is incremental.

The priority is to protect important application behaviour rather than adding tests solely to increase a coverage percentage.

Higher-priority areas include:

1. Authentication
2. Inventory CRUD operations
3. Request validation
4. Search and filtering
5. Sorting and pagination
6. Inventory analytics
7. Error handling

Tests should be added alongside important bug fixes and new functionality where practical.

---

# Future Testing

Planned testing improvements include:

- Expanded FastAPI endpoint coverage
- Authentication tests
- Inventory CRUD tests
- Analytics endpoint tests
- Validation and error-case tests
- Database integration tests
- Frontend component tests
- Frontend interaction tests
- Improved Docker runtime validation

Testing will continue to develop gradually as PartsPilot moves into maintenance.

---

# Debugging Failed Checks

When a CI check fails, reproduce the failing command locally before changing unrelated code.

A useful workflow is:

```text
CI failure
    │
    ▼
Identify failing workflow
    │
    ▼
Read exact error
    │
    ▼
Run failing command locally
    │
    ▼
Fix smallest relevant issue
    │
    ▼
Run validation again
    │
    ▼
Push change
```

Common failures may include:

- Missing Python dependencies
- Missing Node modules
- Incorrect imports
- TypeScript compilation errors
- Test collection errors
- Environment configuration issues
- Docker build failures

See [Troubleshooting](./troubleshooting.md) for broader diagnostic guidance.

---

## Related Documentation

- [Project Details](./project-details.md)
- [Architecture](./architecture.md)
- [API Reference](./api-reference.md)
- [Setup Guide](./setup.md)
- [Roadmap](./roadmap.md)
- [Troubleshooting](./troubleshooting.md)