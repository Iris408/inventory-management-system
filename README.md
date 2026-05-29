# Inventory Management System | 在庫管理システム

A full-stack inventory management system built with React, FastAPI, PostgreSQL, and Docker.

The dashboard provides real-time inventory tracking, analytics, product management, filtering, sorting, and stock monitoring through a responsive frontend interface connected to a REST API backend.

This project focuses on practical full-stack engineering concepts including:
- API development
- Database-driven applications
- JWT authentication and protected API routes
- Swagger/OAuth2 login support
- React state management
- Docker containerization
- Backend/frontend integration
- Responsive UI design

---

## Tech Stack | 技術スタック

| Frontend | Backend | Database | DevOps |
|---|---|---|---|
| React | FastAPI | PostgreSQL | Docker |
| TypeScript | Python | SQLAlchemy | Docker Compose |
| Tailwind CSS | REST APIs | | Git/GitHub |

---

## Project Structure

inventory-management-system/
├── backend/        # FastAPI backend, database models, schemas, and API routes
├── frontend/       # React + TypeScript dashboard interface
├── screenshots/    
├── docker-compose.yml
├── README.md
└── LICENSE

---

## Dashboard Features

| Backend | Frontend |
|---|---|
| REST API CRUD operations | React inventory dashboard |
| PostgreSQL database integration | Tailwind responsive UI |
| SQLAlchemy ORM | Search and category filtering |
| Search and filtering | Sorting controls |
| Sorting and analytics | Analytics cards |
| Created/updated timestamps | Real-time API integration |
| Docker containerisation | Edit/Delete functionality |
| RESTful API architecture | Loading and error handling |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login and receive JWT access token |
| GET | /items | Get all items |
| POST | /items | Create item |
| PUT | /items/{id} | Update item |
| DELETE | /items/{id} | Delete item |

---

### Inventory Status Feature

The dashboard calculates stock status automatically based on item quantity:

- `0` = Out of Stock
- `1–5` = Low Stock
- `6+` = In Stock

The status is returned by the FastAPI backend and displayed in the React dashboard.

### Screenshots

<p align="left">
  <img src="./screenshots/dashboard.png" width="300"/>
</p>

<p align="center">
  <img src="./screenshots/new_item.png" width="300"/>
</p>

<p align="right">
  <img src="./screenshots/edit_item.png" width="300"/>
</p>

---

## Running Locally

### Backend

```bash
docker-compose up --build
```

### Frontend

```bash
npm install
npm run dev
```
---

## Future Improvements

- AWS Deployment
- CI/CD Pipeline
- Terraform Infrastructure
- Kubernetes Deployment
- Role-based access control
- Charts and advanced analytics

---

## Author

Built by Ashleigh Magloire

GitHub: http://github.com/Iris408
