# PartsPilot API Reference

## Overview

PartsPilot provides a REST API built with FastAPI for authentication, inventory management, and inventory analytics.

The API is consumed by the React frontend and can also be explored interactively through FastAPI's Swagger/OpenAPI interface.

---

## Base URLs

### Local Development

```text
http://localhost:8000
```

### Docker Compose

```text
http://localhost:8001
```

### Deployed API

```text
https://inventory-management-system-1wcw.onrender.com
```

---

## Authentication

PartsPilot uses JWT-based authentication for protected API operations.

### Login

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/login` | Authenticate a user and receive an access token |

After successful authentication, the frontend stores the access token and includes it with protected API requests.

Authenticated requests use the following header:

```text
Authorization: Bearer <access_token>
```

---

# Inventory

## Inventory Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/items` | Retrieve inventory items |
| POST | `/items` | Create a new inventory item |
| GET | `/items/{id}` | Retrieve an individual inventory item |
| PUT | `/items/{id}` | Update an inventory item |
| DELETE | `/items/{id}` | Delete an inventory item |

Inventory operations support the main PartsPilot CRUD workflow used by the frontend dashboard.

---

## Inventory Data

Inventory records contain information including:

```text
id
name
category
quantity
price
created_at
updated_at
```

Additional values such as stock status and inventory value can be calculated from the underlying inventory data.

---

# Search, Filtering, Sorting and Pagination

The inventory API supports querying larger datasets through search, filtering, sorting, and pagination.

Current capabilities include:

- Search by product name
- Filter by category
- Sort inventory results
- Paginate inventory results

Sorting is used for fields such as:

- ID
- Price
- Quantity

The exact query parameters and available values can be inspected through the interactive Swagger documentation:

```text
/docs
```

This documentation is generated directly from the current FastAPI implementation and should be treated as the authoritative reference for request parameters.

---

# Analytics

PartsPilot provides dedicated analytics endpoints used by the application dashboard.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/items/low-stock` | Retrieve low-stock inventory |
| GET | `/items/summary/value` | Retrieve inventory value summary |
| GET | `/items/stats` | Retrieve overall inventory statistics |
| GET | `/items/category-summary` | Retrieve inventory summaries grouped by category |
| GET | `/items/category-value` | Retrieve inventory value grouped by category |
| GET | `/items/highest-value` | Retrieve highest-value inventory items |
| GET | `/items/recent` | Retrieve recently added inventory items |

These endpoints support dashboard metrics and operational inventory insights without requiring the frontend to calculate all analytics independently.

---

# Utility Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Backend root/status endpoint |
| GET | `/docs` | Interactive Swagger/OpenAPI documentation |
| GET | `/openapi.json` | Generated OpenAPI schema |

---

# Swagger / OpenAPI

FastAPI automatically generates interactive API documentation.

### Local

```text
http://localhost:8000/docs
```

### Docker

```text
http://localhost:8001/docs
```

### Deployed

```text
https://inventory-management-system-1wcw.onrender.com/docs
```

Swagger can be used to:

- Inspect available endpoints
- Review request parameters
- Review request and response schemas
- Test API requests
- Inspect validation requirements
- Authenticate against protected endpoints

---

# Request Validation

FastAPI validates incoming API requests before inventory operations are performed.

Invalid request data is rejected with an appropriate HTTP response rather than being written directly to PostgreSQL.

Validation helps protect:

- Required fields
- Expected data types
- Inventory request structure

The current validation rules can be inspected through the generated OpenAPI documentation.

---

# Common HTTP Responses

PartsPilot uses standard HTTP response codes.

| Status | Meaning |
| --- | --- |
| `200 OK` | Request completed successfully |
| `201 Created` | Resource created successfully |
| `401 Unauthorized` | Authentication is missing or invalid |
| `404 Not Found` | Requested resource could not be found |
| `422 Unprocessable Entity` | Request failed FastAPI validation |
| `500 Internal Server Error` | Unexpected server-side failure |

Exact responses may vary by endpoint.

---

# Data Flow

A typical authenticated inventory request follows this path:

```text
React Frontend
      │
      │ HTTP Request
      │ Authorization: Bearer <token>
      ▼
   FastAPI
      │
      │ Validation / Authentication
      ▼
 Application Logic
      │
      │ SQLAlchemy
      ▼
  PostgreSQL
      │
      ▼
 API Response
      │
      ▼
React Frontend
```

For broader system design information, see [Architecture](./architecture.md).

---

# Related Documentation

- [Project Details](./project-details.md)
- [Architecture](./architecture.md)
- [Setup Guide](./setup.md)
- [Testing](./testing.md)
- [Roadmap](./roadmap.md)
- [Troubleshooting](./troubleshooting.md)