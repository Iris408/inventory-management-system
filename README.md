![Backend CI](https://github.com/Iris408/inventory-management-system/actions/workflows/backend-ci.yml/badge.svg)
![Frontend CI](https://github.com/Iris408/inventory-management-system/actions/workflows/frontend-ci.yml/badge.svg)
![Docker CI](https://github.com/Iris408/inventory-management-system/actions/workflows/docker-ci.yml/badge.svg)

# Inventory Management System / 在庫管理システム

Inventory Management System is a full-stack dashboard application built with React, TypeScript, Tailwind CSS, FastAPI, PostgreSQL, Docker, and GitHub Actions CI.

The app allows users to manage inventory items, track stock levels, view inventory value, search/filter/sort products, and monitor low-stock or out-of-stock items through a refreshed admin-style dashboard UI.

Inventory Management Systemは、React、TypeScript、Tailwind CSS、FastAPI、PostgreSQL、Docker、GitHub Actions CIを使用したフルスタック在庫管理ダッシュボードアプリです。

---

## Live Demo / ライブデモ

Frontend:

- [Inventory Dashboard](https://inventory-management-system-iris408.vercel.app/)

Backend API:

- [Backend Root Endpoint](https://inventory-management-system-1wcw.onrender.com/)
- [Swagger API Docs](https://inventory-management-system-1wcw.onrender.com/docs)

---

## Portfolio Status / ポートフォリオステータス

| Area | Status |
|---|---|
| React / TypeScript frontend | ✅ Complete |
| Admin-style dashboard refresh | ✅ Complete |
| FastAPI backend | ✅ Complete |
| PostgreSQL database | ✅ Connected |
| Inventory CRUD | ✅ Working |
| Search / filter / sort | ✅ Working |
| Stock status tracking | ✅ Working |
| Docker support | ✅ Complete |
| GitHub Actions CI | ✅ Added |
| Deployment | ✅ Live |
| README portfolio polish | ✅ Complete |

---

## Features / 機能

- Full-stack inventory dashboard
- User login/authenticated dashboard access
- Create inventory items
- View inventory items
- Edit inventory items
- Delete inventory items
- Search products by name
- Filter products by category
- Sort products by ID, price, or quantity
- Track stock status:
  - In Stock
  - Low Stock
  - Out of Stock
- Dashboard summary cards:
  - Total products
  - Total quantity
  - Inventory value
  - In-stock items
  - Low-stock items
  - Out-of-stock items
- Category summary panel
- Recent items panel
- Responsive admin dashboard layout
- Dockerized backend/database setup
- Swagger API documentation

---

## Tech Stack / 技術スタック

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Fetch API
- Local storage token handling

### Backend

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Uvicorn
- JWT authentication
- REST API

### DevOps / Tooling

- Docker
- Docker Compose
- GitHub Actions
- Git / GitHub
- Render
- Vercel

---

## Architecture / アーキテクチャ

```txt
Frontend: React + TypeScript + Tailwind CSS
        ↓
FastAPI Backend
        ↓
PostgreSQL Database
```

### Frontend

The frontend provides an admin-style dashboard where users can manage inventory data visually.

Main frontend responsibilities:

- Display dashboard metrics
- Handle login form state
- Store authentication token in local storage
- Send authenticated API requests
- Render inventory table
- Handle add/edit/delete UI
- Apply search, filter, and sort controls
- Display stock status badges

### Backend

The backend is built with FastAPI and exposes REST API endpoints for inventory management.

Main backend responsibilities:

- Handle authenticated API requests
- Validate item data
- Manage inventory CRUD operations
- Query PostgreSQL through SQLAlchemy
- Return stock status and item data to the frontend

### Database

PostgreSQL stores inventory item records including:

- Item name
- Category
- Quantity
- Price
- Stock status
- Created date
- Updated date

---

## Dashboard Refresh / ダッシュボード更新

The dashboard was refreshed from a basic CRUD table into a more polished admin-style interface.

Updated UI features include:

- Sidebar navigation
- Top search bar
- Dashboard header
- Metric cards
- Stock overview section
- Category summary panel
- Recent items panel
- Cleaner inventory table
- Improved empty states
- Responsive layout

This refresh was added to show stronger frontend and full-stack dashboard skills.

---

## API Endpoints / APIエンドポイント

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Login and receive access token |
| GET | `/items` | Get all inventory items |
| POST | `/items` | Create a new inventory item |
| GET | `/items/{id}` | Get one inventory item |
| PUT | `/items/{id}` | Update an inventory item |
| DELETE | `/items/{id}` | Delete an inventory item |
| GET | `/docs` | Swagger API documentation |
| GET | `/` | Backend root status check |

Analytics endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/items/low-stock` | Get low-stock items |
| GET | `/items/summary/value` | Get inventory summary value |
| GET | `/items/stats` | Get inventory stats |
| GET | `/items/category-summary` | Get category summary |
| GET | `/items/category-value` | Get category value |
| GET | `/items/highest-value` | Get highest-value items |
| GET | `/items/recent` | Get recent items |

---

## Environment Variables / 環境変数

### Frontend

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:8000
```

For production, use the deployed backend URL:

```env
VITE_API_URL=https://inventory-management-system-1wcw.onrender.com
```

### Backend

Create a `.env` file inside the backend folder:

```env
DATABASE_URL=
SECRET_KEY=
ALGORITHM=
ACCESS_TOKEN_EXPIRE_MINUTES=
```

Never commit real `.env` files or production secrets to GitHub.

---

## Running Locally / ローカル実行

This project uses separate frontend and backend folders.

Example structure:

```txt
inventory-management-system/
  backend/
  frontend/
```

---

## Backend Setup / バックエンドセットアップ

Move into the backend folder:

```bash
cd backend
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Run the FastAPI server:

```bash
uvicorn app.main:app --reload --port 8000
```

Open Swagger UI:

```txt
http://127.0.0.1:8000/docs
```

---

## Frontend Setup / フロントエンドセットアップ

Move into the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the frontend locally:

```bash
npm run dev -- --host 0.0.0.0 --port 5174
```

Open the frontend:

```txt
http://localhost:5174
```

---

## Docker Setup / Dockerセットアップ

If using Docker Compose for the backend and PostgreSQL database:

```bash
docker compose up --build
```

If containers are already running and need to be restarted:

```bash
docker compose down
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

---

## Running Tests / テスト実行

### Backend

```bash
pytest
```

or inside Docker:

```bash
docker compose exec api pytest
```

### Frontend

Build check:

```bash
npm run build
```

This confirms the React/TypeScript frontend compiles successfully.

---

## Screenshots / スクリーンショット

| Dashboard Overview | Add Item Form | Edit Item Form |
|---|---|---|
| ![Dashboard Overview](screenshots/01-dashboard-overview.png) | ![Add Item Form](screenshots/02-add-item-form.png) | ![Edit Item Form](screenshots/03-edit-item-form.png) |

| Search / Filter / Sort | Mobile Dashboard | Swagger API Docs |
|---|---|---|
| ![Search Filter Sort](screenshots/04-search-filter-sort.png) | ![Mobile Dashboard](screenshots/05-mobile-dashboard.png) | ![Swagger API Docs](screenshots/06-api-docs.png) |

---

## Suggested Demo Flow / デモ手順

1. Open the live frontend.
2. Log in with the demo account:
   - Username: `Admin`
   - Password: `Password123`
3. View the dashboard overview.
4. Add a new inventory item.
5. Edit an existing item.
6. Search for an item by name.
7. Filter items by category.
8. Sort items by price or quantity.
9. Delete a test item.
10. Open Swagger API docs to view backend endpoints.

---

## Known Limitations / 現在の制限

- Demo login/account setup may need manual backend configuration.
- Free hosting services may sleep after inactivity.
- Dashboard analytics are currently calculated from loaded inventory items.
- Reports, suppliers, and settings sidebar links are visual placeholders for future expansion.
- Test coverage can be expanded further.
- Advanced role-based access control can be added later.
- Production monitoring/logging can be improved.

---

## Future Improvements / 今後の改善

### Frontend

- Split `App.tsx` into smaller reusable components
- Add dedicated pages for Reports, Suppliers, and Settings
- Add charts for inventory value and stock trends
- Add loading skeletons
- Add toast notifications
- Improve mobile navigation
- Add dark mode

### Backend

- Add more analytics endpoints
- Add pagination
- Add stronger validation
- Add role-based access control
- Add refresh token support
- Add structured logging

### Testing / CI

- Add backend endpoint tests
- Add frontend component tests
- Add CI build checks for both frontend and backend
- Add Docker CI checks

### Deployment

- Improve production Docker configuration
- Add uptime monitoring
- Add clearer production environment variable setup

---

## Project Purpose / プロジェクトの目的

This project was built to practise full-stack development skills using a realistic inventory management use case.

It demonstrates:

- Frontend dashboard development
- Backend API design
- PostgreSQL database integration
- Authenticated API requests
- CRUD operations
- Search/filter/sort functionality
- Docker-based development
- Deployment and CI workflow practice

このプロジェクトは、実際の在庫管理システムを想定して、フルスタック開発スキルを練習するために作成しました。