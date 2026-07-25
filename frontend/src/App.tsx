import { useEffect, useState } from "react"

type Item = {
  id: number
  name: string
  category: string
  quantity: number
  price: number
  stock_status: string
  created_at: string
  updated_at: string
}

type NewItem = {
  name: string
  category: string
  quantity: number
  price: number
}

type LoginForm = {
  username: string
  password: string
}

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(
  /\/+$/,
  ""
)

const LOGIN_URL = `${API_URL}/auth/login`
const DEMO_USERNAME = "demo_recruiter"
const DEMO_PASSWORD = "InventoryDemo2026!"

function App() {
  const [initialLoad, setInitialLoad] = useState(true)
  const [sortBy, setSortBy] = useState("id")
  const [order, setOrder] = useState("ascending")
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [editItem, setEditItem] = useState<Item | null>(null)
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState<NewItem>({
    name: "",
    category: "",
    quantity: 0,
    price: 0,
  })

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("inventory_token")
  )

  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
  })

  function fillDemoCredentials() {
    setLoginError(null)

    setLoginForm({
      username: DEMO_USERNAME,
      password: DEMO_PASSWORD,
    })
  }

  const [loginError, setLoginError] = useState<string | null>(null)

  async function login() {
    try {
      setLoginError(null)

      const formData = new URLSearchParams()
      formData.append("username", loginForm.username)
      formData.append("password", loginForm.password)

      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Login Failed:", response.status, errorText)
        throw new Error("Login failed")
      }

      const data = await response.json()
      const accessToken = data.access_token || data.token

      if (!accessToken) {
        throw new Error("No token returned")
      }

      localStorage.setItem("inventory_token", accessToken)
      setToken(accessToken)

      setLoginForm({
        username: "",
        password: "",
      })
    } catch {
      setLoginError("Login failed. Check your credentials and try again.")
    }
  }

  async function logout() {
    localStorage.removeItem("inventory_token")
    setToken(null)
    setItems([])
  }

  function getAuthHeaders() {
    if (!token) {
      throw new Error("No authentication token found")
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }

  async function fetchItems() {
    try {
      setError(null)

      const params = new URLSearchParams()

      if (search) params.append("search", search)
      if (category) params.append("category", category)

      params.append("sort_by", sortBy)
      params.append("order", order)

      if (!token) {
        setError("Please log in to view inventory.")
        return
      }

      const response = await fetch(`${API_URL}/items?${params.toString()}`, {
        headers: getAuthHeaders(),
      })

      if (response.status === 401) {
        logout()
        throw new Error("Unauthorized. Please log in again.")
      }

      if (!response.ok) {
        throw new Error("Failed to fetch")
      }

      const data: Item[] = await response.json()

      setItems(data)

      const unique: string[] = [...new Set(data.map((item) => item.category))]
      setCategories(unique)
    } catch {
      setError(
        "Could not load inventory. Please check your login or backend connection."
      )
    } finally {
      setInitialLoad(false)
    }
  }

  async function addItem() {
    try {
      setError(null)

      const itemData = {
        name: form.name,
        category: form.category,
        quantity: Number(form.quantity),
        price: Number(form.price),
      }

      const response = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(itemData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Add item failed:", response.status, errorText)
        throw new Error("Failed to add item")
      }

      setForm({
        name: "",
        category: "",
        quantity: 0,
        price: 0,
      })

      setShowForm(false)
      await fetchItems()
    } catch {
      setError("Could not add item.")
    }
  }

  async function updateItem() {
    if (!editItem) return

    try {
      setError(null)

      const itemData = {
        name: editItem.name,
        category: editItem.category,
        quantity: Number(editItem.quantity),
        price: Number(editItem.price),
      }

      const response = await fetch(`${API_URL}/items/${editItem.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(itemData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Update item failed:", response.status, errorText)
        throw new Error("Failed to update")
      }

      setEditItem(null)
      await fetchItems()
    } catch {
      setError("Could not update item.")
    }
  }

  async function deleteItem(id: number) {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error("Failed to delete item")
      }

      await fetchItems()
    } catch {
      setError("Could not delete item.")
    }
  }

  useEffect(() => {
    if (token) {
      fetchItems()
    } else {
      setInitialLoad(false)
    }
  }, [token, search, category, sortBy, order])

  function getStatusStyle(status: string) {
    if (status === "In Stock") return "bg-green-100 text-green-800"
    if (status === "Low Stock") return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const totalProducts = items.length

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const inventoryValue = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const inStockItems = items.filter(
    (item) => item.stock_status === "In Stock"
  )

  const lowStockItems = items.filter(
    (item) => item.stock_status === "Low Stock"
  )

  const outOfStockItems = items.filter(
    (item) => item.stock_status === "Out of Stock"
  )

  const recentItems = [...items]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 4)

  const categorySummary = categories.map((cat) => {
    const categoryItems = items.filter((item) => item.category === cat)

    return {
      category: cat,
      count: categoryItems.length,
      value: categoryItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    }
  })

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold mb-4">
              IMS
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Inventory Dashboard
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Log in to manage products, stock levels, and inventory value.
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
              {loginError}
            </div>
          )}

          <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Portfolio demo
                </p>

                <p className="mt-1 text-xs leading-5 text-blue-700">
                  Use the recruiter demo account to explore the inventory dashboard.
                </p>
              </div>

              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                Demo
              </span>
            </div>

            <div className="mt-3 space-y-1 text-xs text-blue-800">
              <p>
                Username: <code className="font-semibold">{DEMO_USERNAME}</code>
              </p>

              <p>
                Password: <code className="font-semibold">{DEMO_PASSWORD}</code>
              </p>
            </div>

            <button
              type="button"
              onClick={fillDemoCredentials}
              className="mt-4 w-full rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              Use demo credentials
            </button>
          </div>

          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              login()
            }}
          >
            <input
              className="border border-slate-300 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              value={loginForm.username}
              onChange={(e) =>
                setLoginForm({ ...loginForm, username: e.target.value })
              }
            />

            <input
              className="border border-slate-300 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (initialLoad) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100">
        <p className="text-slate-500 text-lg">Loading inventory...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 lg:flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 min-h-screen flex-col px-5 py-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
            IMS
          </div>

          <div>
            <p className="font-bold text-slate-900">Inventory</p>
            <p className="text-xs text-slate-500">Management System</p>
          </div>
        </div>

        <nav className="space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-50 text-blue-700 font-semibold">
            Dashboard
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50">
            Inventory
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50">
            Reports
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50">
            Suppliers
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50">
            Settings
          </button>
        </nav>

        <button
          onClick={logout}
          className="mt-auto w-full text-left px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Topbar */}
        <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <input
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search product by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition text-sm font-semibold"
            >
              {showForm ? "Cancel" : "+ Add Item"}
            </button>

            <button
              onClick={logout}
              className="bg-slate-100 text-slate-700 px-4 py-3 rounded-xl hover:bg-slate-200 transition text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Header */}
        <section className="mb-6">
          <p className="text-sm font-semibold text-blue-600 mb-1">
            Inventory Management
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2 max-w-2xl">
            Track stock levels, inventory value, low-stock products, and product
            categories in one place.
          </p>
        </section>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Add Item Form */}
        {showForm && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              New Item
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

              <input
                className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
              />

              <input
                className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Quantity"
                type="number"
                value={form.quantity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    quantity: Number(e.target.value),
                  })
                }
              />

              <input
                className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Price (£)"
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: Number(e.target.value),
                  })
                }
              />
            </div>

            <button
              onClick={addItem}
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold"
            >
              Save Item
            </button>
          </div>
        )}

        {/* Edit Item Form */}
        {editItem && (
          <div className="bg-white border border-blue-200 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Edit Item #{editItem.id}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    name: e.target.value,
                  })
                }
              />

              <input
                className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Category"
                value={editItem.category}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    category: e.target.value,
                  })
                }
              />

              <input
                className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Quantity"
                type="number"
                value={editItem.quantity}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    quantity: Number(e.target.value),
                  })
                }
              />

              <input
                className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Price (£)"
                type="number"
                value={editItem.price}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    price: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={updateItem}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
              >
                Save Changes
              </button>

              <button
                onClick={() => setEditItem(null)}
                className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-200 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">Total Products</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {totalProducts}
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Products currently tracked
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">Total Quantity</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {totalQuantity}
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Units available across inventory
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">Inventory Value</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              £{inventoryValue.toFixed(2)}
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Estimated stock value
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">In Stock Items</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {inStockItems.length}
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Healthy stock levels
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">Low Stock Items</p>
            <h2 className="text-3xl font-bold text-amber-500 mt-2">
              {lowStockItems.length}
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Needs attention soon
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">Out of Stock Items</p>
            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {outOfStockItems.length}
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Requires restocking
            </p>
          </div>
        </section>

        {/* Analytics Panels */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-slate-900">Stock Overview</h2>
              <span className="text-xs text-slate-400">
                Live inventory summary
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-xs text-green-700">In Stock</p>
                <p className="text-2xl font-bold text-green-700">
                  {inStockItems.length}
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-4">
                <p className="text-xs text-amber-700">Low Stock</p>
                <p className="text-2xl font-bold text-amber-700">
                  {lowStockItems.length}
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-4">
                <p className="text-xs text-red-700">Out of Stock</p>
                <p className="text-2xl font-bold text-red-700">
                  {outOfStockItems.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-bold text-slate-900 mb-5">
              Category Summary
            </h2>

            <div className="space-y-3">
              {categorySummary.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No categories available yet.
                </p>
              ) : (
                categorySummary.slice(0, 5).map((cat) => (
                  <div
                    key={cat.category}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>
                      <p className="font-medium text-slate-700">
                        {cat.category}
                      </p>
                      <p className="text-xs text-slate-400">
                        {cat.count} item{cat.count === 1 ? "" : "s"}
                      </p>
                    </div>

                    <p className="font-semibold text-slate-800">
                      £{cat.value.toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-600"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-600"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="id">Sort by ID</option>
              <option value="price">Sort by Price</option>
              <option value="quantity">Sort by Quantity</option>
            </select>

            <select
              className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-600"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>

          {(search || category) && (
            <button
              onClick={() => {
                setSearch("")
                setCategory("")
              }}
              className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              Clear filters
            </button>
          )}
        </section>

        {/* Table */}
        <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">Inventory Items</h2>
              <p className="text-sm text-slate-500">
                Manage products, quantities, prices, and stock status.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4">Updated At</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center">
                      <p className="font-semibold text-slate-600">
                        No inventory items found
                      </p>

                      <p className="text-sm text-slate-400 mt-1">
                        Add your first item to start tracking stock levels.
                      </p>
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 text-slate-500">{item.id}</td>

                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {item.name}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {item.category}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {item.quantity}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        £{item.price.toFixed(2)}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {new Date(item.updated_at).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                            item.stock_status
                          )}`}
                        >
                          {item.stock_status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => setEditItem(item)}
                            className="text-blue-600 hover:text-blue-800 text-xs font-bold transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent Items */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
          <h2 className="font-bold text-slate-900 mb-4">Recent Items</h2>

          {recentItems.length === 0 ? (
            <p className="text-sm text-slate-400">
              No recent items available yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {recentItems.map((item) => (
                <div key={item.id} className="border border-slate-200 rounded-xl p-4">
                  <p className="font-semibold text-slate-800">{item.name}</p>

                  <p className="text-xs text-slate-400 mt-1">
                    {item.category}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-slate-500">
                      Qty: {item.quantity}
                    </span>

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        item.stock_status
                      )}`}
                    >
                      {item.stock_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App