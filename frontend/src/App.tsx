import { useEffect, useState } from "react"

type Item = {
  id: number
  name: string
  category: string
  quantity: number
  price: number
  stock_status: string
}

type NewItem = {
  name: string
  category: string
  quantity: number
  price: number
}

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

  async function fetchItems() {
    try {
      setError(null)

      const params = new URLSearchParams()

      if (search) params.append("search", search)
      if (category) params.append("category", category)

      params.append("sort_by", sortBy)
      params.append("order", order)

      const response = await fetch(`http://127.0.0.1:8000/items?${params.toString()}`)
      if (!response.ok) throw new Error("Failed to fetch")

      const data: Item[] = await response.json()
      setItems(data)  

      const unique: string[] = [...new Set(data.map((item: Item) => item.category))]
      setCategories(unique)

    } finally {
      setInitialLoad(false)
    }
  }

  async function addItem() {
    try {
      const response = await fetch("http://127.0.0.1:8000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error("Failed to add item")
      setForm({ name: "", category: "", quantity: 0, price: 0 })
      setShowForm(false)
      fetchItems()
    } catch {
      setError("Could not add item.")
    }
  }

  async function updateItem() {
  if (!editItem) return
  try {
    const response = await fetch(`http://127.0.0.1:8000/items/${editItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editItem.name,
        category: editItem.category,
        quantity: editItem.quantity,
        price: editItem.price,
      }),
    })
    if (!response.ok) throw new Error("Failed to update")
    setEditItem(null)
    fetchItems()
  } catch {
    setError("Could not update item.")
  }
}

  async function deleteItem(id: number) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/items/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete item")
    fetchItems()
  } catch {
    setError("Could not delete item.")
  }
} 

  useEffect(() => {
    fetchItems()
  }, [search, category, sortBy, order])

  function getStatusStyle(status: string) {
    if (status === "In Stock") return "bg-green-100 text-green-800"
    if (status === "Low Stock") return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  if (initialLoad) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 text-lg">Loading inventory...</p>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Inventory Dashboard</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? "Cancel" : "+ Add Item"}
        </button>
      </div>

      {/* Add Item Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">New Item</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Quantity"
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
            />
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Price (£)"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            />
          </div>
          <button
            onClick={addItem}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Save Item
          </button>
        </div>
      )}

      {editItem && (
  <div className="bg-white rounded-xl shadow p-6 mb-6 border-l-4 border-blue-500">
    <h2 className="text-lg font-semibold text-gray-700 mb-4">Edit Item #{editItem.id}</h2>
    <div className="grid grid-cols-2 gap-4">
      <input
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Name"
        value={editItem.name}
        onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
      />
      <input
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Category"
        value={editItem.category}
        onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
      />
      <input
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Quantity"
        type="number"
        value={editItem.quantity}
        onChange={(e) => setEditItem({ ...editItem, quantity: Number(e.target.value) })}
      />
      <input
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Price (£)"
        type="number"
        value={editItem.price}
        onChange={(e) => setEditItem({ ...editItem, price: Number(e.target.value) })}
      />
    </div>
    <div className="flex gap-3 mt-4">
      <button
        onClick={updateItem}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
      <button
        onClick={() => setEditItem(null)}
        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        Cancel
      </button>
    </div>
  </div>
)}

{/* Search & Filter */}
<div className="flex gap-4 mb-6">
  <input
    className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    placeholder="Search by name..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <input
    className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    placeholder="Filter by category..."
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  />
  <select
    className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">All Categories</option>
    {categories.map((cat) => (
      <option key={cat} value={cat}>{cat}</option>
    ))}
  </select>
  {(search || category) && (
    <button
      onClick={() => { setSearch(""); setCategory("") }}
      className="text-sm text-gray-500 hover:text-gray-700 whitespace-nowrap"
    >
      Clear filters
    </button>
  )}
</div>

{/* Sort Controls */}
<div className="flex gap-4 mb-4">
  <select
    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="id">Sort by ID</option>
    <option value="price">Sort by Price</option>
    <option value="quantity">Sort by Quantity</option>
  </select>
  <select
    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
    value={order}
    onChange={(e) => setOrder(e.target.value)}
  >
    <option value="ascending">Ascending</option>
    <option value="descending">Descending</option>
  </select>
</div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  No items found. Add one above!
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-500">{item.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-gray-600">{item.quantity}</td>
                  <td className="px-6 py-4 text-gray-600">£{item.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(item.stock_status)}`}>
                      {item.stock_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => setEditItem(item)}
                      className="text-blue-500 hover:text-blue-700 text-xs font-semibold transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
