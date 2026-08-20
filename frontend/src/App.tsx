import { useState } from "react"
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom"

import AppLayout from "./components/layout/AppLayout"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Inventory from "./pages/Inventory"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"
import Suppliers from "./pages/Suppliers"

function App() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("TOKEN_STORAGE_KEY")
  )

  function logout() {
    localStorage.removeItem("TOKEN_STORAGE_KEY")
    setToken(null)
  }

  // =========================================
  // EN: Show login page when no token exists
  // JP: トークンがない場合はログイン画面を表示
  // =========================================
  if (!token) {
    return <Login onLogin={setToken} />
  }

  return (
    <Routes>
      {/* =========================================
      EN: Shared authenticated application layout
      JP: 認証後の共通アプリレイアウト
      ========================================= */}

      <Route
        element={
          <AppLayout onLogout={logout} />
        }
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/inventory"
          element={<Inventory />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/suppliers"
          element={<Suppliers />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Route>

      {/* =========================================
      EN: Default route
      JP: デフォルトルート
      ========================================= */}

      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

      {/* =========================================
      EN: Unknown routes return to dashboard
      JP: 不明なルートはダッシュボードへ戻す
      ========================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />
    </Routes>
  )
}

export default App