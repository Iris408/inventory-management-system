# API Reference

This document lists the main API endpoints used by the Inventory Management System.

## Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/login` | Login and receive access token |

## Inventory Items

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/items` | Get all inventory items |
| POST | `/items` | Create a new inventory item |
| GET | `/items/{id}` | Get one inventory item |
| PUT | `/items/{id}` | Update an inventory item |
| DELETE | `/items/{id}` | Delete an inventory item |

## Analytics Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/items/low-stock` | Get low-stock items |
| GET | `/items/summary/value` | Get inventory summary value |
| GET | `/items/stats` | Get inventory stats |
| GET | `/items/category-summary` | Get category summary |
| GET | `/items/category-value` | Get category value |
| GET | `/items/highest-value` | Get highest-value items |
| GET | `/items/recent` | Get recent items |

## Utility Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Backend root status check |
| GET | `/docs` | Swagger API documentation |

## API Notes

The frontend sends authenticated requests to the backend using a stored access token.

Main backend responsibilities:

- Validate item data
- Handle authenticated API requests
- Manage inventory CRUD operations
- Query PostgreSQL through SQLAlchemy
- Return stock status and dashboard analytics data