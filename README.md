# Inventory Management System

A full-stack inventory management system built with React, FastAPI, PostgreSQL, Docker, Docker Compose and JWT Authentication.

The dashboard provides inventory tracking, analytics, product management, filtering, sorting, and stock monitoring through a responsive frontend interface connected to a REST API backend.

# 在庫管理システム

React、FastAPI、PostgreSQL、Docker、Docker Compose、およびJWT認証を使用して構築されたフルスタックの在庫管理システム。

ダッシュボードは、レスポンシブなフロントエンドインターフェースとREST APIバックエンドを介して、リアルタイムの在庫追跡、分析、製品管理、フィルタリング、ソート、在庫監視機能を提供します。

---

### Screenshots

<table>
  <tr>
    <td>
      <img src="./screenshots/dashboard.png" width="400"/>
      <br/>
      <strong>Dashboard Overview</strong>
    </td>
    <td>
      <img src="./screenshots/dashboard_login.png" width="400"/>
      <br/>
      <strong>Login Page</strong>
    </td>
  </tr>
  <tr>
    <td>
      <img src="./screenshots/new_item.png" width="400"/>
      <br/>
      <strong>Add New Item</strong>
    </td>
    <td>
      <img src="./screenshots/edit_item.png" width="400"/>
      <br/>
      <strong>Edit Item</strong>
    </td>
  </tr>
</table>

---

## Current Status

| Area | Status |
|---|---|
| React + TypeScript frontend | ✅ Complete |
| FastAPI backend | ✅ Complete |
| PostgreSQL database integration | ✅ Complete |
| CRUD operations | ✅ Complete |
| Search and filtering | ✅ Complete |
| Analytics dashboard | ✅ Complete |
| Dockerised backend services | ✅ Complete |
| Frontend Docker support | ✅ Complete |
| Frontend login and token storage | ✅ Complete |
| Authenticated frontend CRUD requests | ✅ Complete |
| CI/CD pipeline | 🚧 Planned |
| AWS deployment | 🚧 Planned |

## Recent Update
The Inventory Management System now includes a frontend authentication flow for protected inventory routes.

この在庫管理システムには、保護された在庫ルートのためのフロントエンド認証フローが追加されました。

### Updates

- Added frontend login and token storage
- Added authenticated API requests for inventory data
- Fixed frontend `401 Unauthorized` errors
- Fixed add item functionality from the frontend dashboard
- Fixed edit and update item functionality from the frontend dashboard
- Confirmed delete item functionality works from the frontend dashboard
- Confirmed Docker Compose backend/frontend integration works

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
| Docker containerisation | Add/Edit/Delete functionality |
| RESTful API architecture | Loading and error handling |

---

## Authentication Notes

The inventory routes are protected and require a valid JWT token. The frontend stores the token after login and send it with protected requests using the **Authorization** header:
```text
Authorization: Bearer <token>
```
This allows the dashboard to securely load, add, edit, update and delete inventory items.

在庫管理ルートは保護されており、有効なJWTトークンが必要です。フロントエンドはログイン後にトークンを保存し、**Authorization**ヘッダーを使用して保護されたリクエストとともに送信します。

```text
Authorization: Bearer <トークン>
```
これにより、ダッシュボードは在庫アイテムの安全な読み込み、追加、編集、更新、削除が可能になります。

---

# Installation

## Docker Ports

| Service | Local URL |
| --- | --- |
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Swagger UI | http://localhost:8000/docs |
| PostgreSQL | localhost:5433 |

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