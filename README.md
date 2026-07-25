![Backend CI](https://github.com/Iris408/inventory-management-system/actions/workflows/backend-ci.yml/badge.svg)
![Frontend CI](https://github.com/Iris408/inventory-management-system/actions/workflows/frontend-ci.yml/badge.svg)
![Docker CI](https://github.com/Iris408/inventory-management-system/actions/workflows/docker-ci.yml/badge.svg)

# Inventory Management System

A production-style full-stack inventory dashboard built with React, TypeScript, Tailwind CSS, FastAPI, PostgreSQL, Docker, and GitHub Actions.

The application supports authenticated inventory management, stock tracking, search, filtering, sorting, analytics, and low-stock monitoring through a responsive admin dashboard.

## Live Demo

| Service | Link |
| --- | --- |
| Frontend | [Inventory Dashboard](https://inventory-management-system-iris408.vercel.app/) |
| Backend API | [Root Endpoint](https://inventory-management-system-1wcw.onrender.com/) |
| Swagger Docs | [API Documentation](https://inventory-management-system-1wcw.onrender.com/docs) |

### Demo Login

Use the following demo account to explore the deployed dashboard:

| Field | Credential |
| --- | --- |
| Username | `demo_recruiter` |
| Password | `InventoryDemo2026!` |

> This account uses sample inventory data and is provided for demonstration purposes only.

## Current Status

| Area | Status |
| --- | --- |
| React / TypeScript frontend | ✅ Complete |
| FastAPI backend | ✅ Complete |
| PostgreSQL database | ✅ Connected |
| Inventory CRUD | ✅ Working |
| Search / filter / sort | ✅ Working |
| Stock status tracking | ✅ Working |
| Dashboard analytics | ✅ Working |
| Docker support | ✅ Complete |
| GitHub Actions CI | ✅ Complete |
| Deployment | ✅ Live |

The core full-stack application is complete and deployed. Future development will focus on reporting, supplier management, role-based access, testing, and production infrastructure.

## Features

- Full-stack inventory dashboard
- User login and authenticated dashboard access
- Create, view, edit, and delete inventory items
- Search products by name
- Filter products by category
- Sort products by ID, price, or quantity
- Track stock status: in stock, low stock, and out of stock
- Dashboard summary cards for product count, quantity, stock status, and inventory value
- Category summary and recent items panels
- Inventory value analytics
- Category-level quantity and value summaries
- Highest-value and lowest-stock item insights
- Recent inventory item tracking
- Pagination for larger inventory datasets
- Swagger API documentation
- Backend, frontend, and Docker CI workflows

## Tech Stack

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS, Fetch API, Local storage token handling |
| Backend | Python, FastAPI, PostgreSQL, SQLAlchemy, Uvicorn, JWT authentication, REST API |
| DevOps / Tooling | Docker, Docker Compose, GitHub Actions, Git, GitHub, Render, Vercel |

## Screenshots

| Dashboard Overview | Add Item Form | Edit Item Form |
| --- | --- | --- |
| ![Dashboard Overview](screenshots/01-dashboard-overview.png) | ![Add Item Form](screenshots/02-add-item-form.png) | ![Edit Item Form](screenshots/03-edit-item-form.png) |

| Search / Filter / Sort | Mobile Dashboard | Swagger API Docs |
| --- | --- | --- |
| ![Search Filter Sort](screenshots/04-search-filter-sort.png) | ![Mobile Dashboard](screenshots/05-mobile-dashboard.png) | ![Swagger API Docs](screenshots/06-api-docs.png) |

## Quick Start

Clone the repository:

```bash
git clone https://github.com/Iris408/inventory-management-system.git
cd inventory-management-system
```

Run with Docker Compose:

```bash
docker compose up --build
```

Backend API:

```text
http://127.0.0.1:8000/docs
```

Frontend:

```text
http://localhost:5174
```

## Roadmap

- Add supplier management
- Add inventory reporting and export
- Expand role-based access control
- Add automated frontend and API tests
- Add multi-currency support
- Add localisation support
- Deploy production infrastructure on AWS

## Project Structure

```text
inventory-management-system/
├── backend/
│   ├── app/
│   ├── main.py
│   ├── tests/
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── docs/
│   ├── api-reference.md
│   ├── project-details.md
│   └── setup.md
├── screenshots/
├── docker-compose.yml
├── LICENSE
└── README.md
```

## Documentation

More detailed project documentation is available in the `docs/` folder.

| Document | Description |
| --- | --- |
| [Setup Guide](./docs/setup.md) | Environment variables, local setup, Docker setup, and test commands |
| [API Reference](./docs/api-reference.md) | Authentication, inventory, and analytics endpoints |
| [Project Details](./docs/project-details.md) | Architecture, dashboard refresh notes, limitations, future improvements, and learning notes |

## CI/CD

GitHub Actions validates the project on every push and pull request.

Current workflows include:

- Backend dependency installation and Python validation
- Backend test execution
- Frontend dependency installation and production build
- Docker image build validation

## Author

Built by Iris408