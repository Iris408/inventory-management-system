# Inventory Management System | 在庫管理システム

A full-stack inventory management system built with React, FastAPI, PostgreSQL, and Docker.

The dashboard provides real-time inventory tracking, analytics, product management, filtering, sorting, and stock monitoring through a responsive frontend interface connected to a REST API backend.

This project focuses on practical full-stack engineering concepts including:
- API development
- Database-driven applications
- React state management
- Docker containerisation
- Backend/frontend integration
- Responsive UI design

---

## Features

### Backend
- REST API CRUD operations
- PostgreSQL database integration
- SQLAlchemy ORM
- Search and filtering
- Sorting and analytics
- Created/updated timestamps
- Docker containerisation

### Frontend

- React inventory dashboard
- Tailwind responsive UI
- Search and category filtering
- Sorting controls
- Analytics cards
- Real-time API integration
- Edit/Delete functionality
- Loading and error handling

---

## Tech Stack | 技術スタック 

| Frontend | Backend | Database | DevOps |
|---|---|---|---|
| React | FastAPI | PostgreSQL | Docker |
| TypeScript | Python | SQLAlchemy | Docker Compose |
| Tailwind CSS | REST APIs | | Git/GitHub |

---

## Dashboard Features

- Inventory analytics
- Product status tracking
- Responsive UI
- Dynamic filtering
- CRUD management
- Real-time updates

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /items | Get all items |
| POST | /items | Create item |
| PUT | /items/{id} | Update item |
| DELETE | /items/{id} | Delete item |

---

## Future Improvements

- JWT Authentication
- AWS Deployment
- CI/CD Pipeline
- Terraform Infrastructure
- Kubernetes Deployment
- Role-based access control
- Charts and advanced analytics

---

## Screenshots

### Dashboard

![Inventory Dashboard](./screenshots/dashboard.png)
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

## Author

Built by Ashleigh Magloire

GitHub: http://github.com/Iris408

---

## License

This project is licensed under the MIT License.
