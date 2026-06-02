# Inventory Management System | 在庫管理システム

A full-stack inventory management system built with React, FastAPI, PostgreSQL, and Docker.

The dashboard provides real-time inventory tracking, analytics, product management, filtering, sorting, and stock monitoring through a responsive frontend interface connected to a REST API backend.

This project focuses on practical full-stack engineering concepts including: API development, Database-driven applications, JWT authentication and protected API routes, Swagger/OAuth2 login support, React state management, Docker containerization, Backend/frontend integration

---

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

## Tech Stack | 技術スタック

| Frontend | Backend | Database | DevOps |
|---|---|---|---|
| React | FastAPI | PostgreSQL | Docker |
| TypeScript | Python | SQLAlchemy | Docker Compose |
| Tailwind CSS | REST APIs | | Git/GitHub |

---

## Project Structure
```text
inventory-management-system/
├── backend/       
├── frontend/      
├── screenshots/    
├── docker-compose.yml
├── README.md
└── LICENSE
```

---

## Features

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

## Current Status

✅ React + TypeScript frontend
✅ FastAPI backend
✅ PostgreSQL database integration
✅ CRUD operations
✅ Search and filtering
✅ Analytics dashboard
✅ Dockerised backend services
🚧 Frontend Docker support (in progress)
🚧 CI/CD pipeline (planned)
🚧 AWS deployment (planned)

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

## Installation

### Clone Repository
```bash
git clone https://github.com/Iris408/inventory-management-system.git
cd inventory-management-system
```

### Backend

```bash
docker-compose up --build
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Usage

1. Start the backend and database with Docker.
2. Start the react frontend.
3. Open the frontend dashboard.
4. Create, edit, update and delete inventory items.
5. Use analytics cards, filtering and sorting controls to manage inventory.

---

## Future Improvements

- JWT Authentication
- Frontend docker containerization
- Docker Compose Full Stack
- CI/CD Pipeline
- AWS Deployment
- Terraform 
- Kubernetes