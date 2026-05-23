# Container Issue Recap & Resolution

## Problem Summary
The `inventory-backend` container (running FastAPI with Uvicorn) was failing to start with exit code 1 because the `DATABASE_URL` environment variable was not set when using `docker run`.

## Error Details

### Initial Error
```
sqlalchemy.exc.ArgumentError: Expected string or URL object, got None
```

**Root Cause:** The app's `database.py` loads `DATABASE_URL` from the environment:
```python
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
```

When running with `docker run` without `-e DATABASE_URL=...`, the environment variable was `None`, causing SQLAlchemy to fail.

## Solution: Docker Compose Setup

Instead of managing environment variables manually with `docker run`, we containerized both the FastAPI app and PostgreSQL using `docker-compose.yml`.

### Files Created

#### 1. `docker-compose.yml`
Located at project root: `/Users/amagloire/Desktop/backend_learning/inventory-management-system/docker-compose.yml`

**Services:**
- **db** (PostgreSQL 15)
  - Username: `inventory_user`
  - Password: `inventory_password`
  - Database: `inventory_db`
  - Port: `5432`
  - Persistent volume: `postgres_data`
  - Health check: Validates PostgreSQL readiness

- **api** (FastAPI/Uvicorn)
  - Built from `./backend/Dockerfile`
  - Loads `DATABASE_URL` from `.env` file
  - Port: `8000` (mapped to host)
  - Depends on: `db` service (waits for healthcheck)
  - Command: `uvicorn app.main:app --host 0.0.0.0 --port 8000`

#### 2. `.env` File
Located at project root: `/Users/amagloire/Desktop/backend_learning/inventory-management-system/.env`

**Content:**
```
DATABASE_URL=postgresql://inventory_user:[REDACTED]@db:5432/inventory_db
```

**Key Points:**
- Hostname is `db` (Docker service name, not localhost)
- Database name is `inventory_db`
- Credentials match PostgreSQL environment variables in compose file

## How It Works

1. **Service Startup Order:**
   - PostgreSQL (`db`) starts first
   - Health check waits for PostgreSQL to accept connections
   - FastAPI (`api`) only starts after health check passes

2. **Environment Variable Resolution:**
   - `docker-compose.yml` specifies `env_file: .env`
   - All variables in `.env` are loaded into the API container
   - `DATABASE_URL` is now available to SQLAlchemy

3. **Networking:**
   - Both services connect to the default Compose network
   - API container can reach database at hostname `db:5432`
   - Data persists in `postgres_data` volume across container restarts

## Usage

### Start Services
```bash
cd /Users/amagloire/Desktop/backend_learning/inventory-management-system
docker-compose up -d
```

### View Logs
```bash
docker-compose logs -f api      # FastAPI logs
docker-compose logs -f db       # PostgreSQL logs
docker-compose logs -f          # All services
```

### Stop Services
```bash
docker-compose down             # Stop containers
docker-compose down -v          # Stop and remove volumes (data deleted)
```

### Rebuild After Changes
```bash
docker-compose up -d --build
```

## Verification

The API should be accessible at `http://localhost:8000` with logs showing:
```
INFO:     Started server process [1]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

PostgreSQL connection errors (`database "inventory_user" does not exist`) indicate the password in `.env` doesn't match the one in `docker-compose.yml` — verify both use the same credentials.

## Key Files Structure

```
inventory-management-system/
├── docker-compose.yml          ← Created (orchestrates services)
├── .env                         ← Updated (database URL)
└── backend/
    ├── Dockerfile              ← Existing
    ├── requirements.txt         ← Existing (includes psycopg2-binary, SQLAlchemy)
    └── app/
        ├── main.py             ← Existing (FastAPI app)
        ├── database.py          ← Existing (loads DATABASE_URL from env)
        └── ...
```

## Next Steps (Optional)

1. **Add .dockerignore** – Exclude `venv/`, `__pycache__/`, `.git/` from build context
2. **Add healthcheck** – Define HTTP endpoint check in compose file
3. **Database migrations** – Use Alembic or manual scripts in entrypoint
4. **Multi-stage builds** – Optimize image size
5. **CI/CD integration** – Deploy with GitHub Actions or similar
6. **Push to registry** – Docker Hub or private registry for production deployment
