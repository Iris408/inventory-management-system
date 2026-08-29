import { useEffect, useState } from "react"

import { apiFetch } from "../services/api"
import type { Item, NewItem } from "../types/inventory"

function PartsInventory() {
  const [items, setItems] = useState<Item[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("id")
  const [order, setOrder] = useState("ascending")
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<Item | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

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

      params.append("limit", String(itemsPerPage))
      params.append("offset", String((page - 1) * itemsPerPage))

      if (search) {
        params.append("search", search)
      }

      if (category) {
        params.append("category", category)
      }

      params.append("sort_by", sortBy)
      params.append("order", order)

      const response = await apiFetch(
        `/items?${params.toString()}`
      )

      if (!response.ok) {
        throw new Error("Failed to fetch inventory")
      }

      const data: Item[] = await response.json()

      setItems(data)

      const uniqueCategories = [
        ...new Set(data.map((item) => item.category)),
      ]

      setCategories(uniqueCategories)
    } catch {
      setError("Could not load inventory.")
    }
  }

  async function addItem() {
    try {
      setError(null)

      const response = await apiFetch("/items", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          quantity: Number(form.quantity),
          price: Number(form.price),
        }),
      })

      if (!response.ok) {
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
    if (!editItem) {
      return
    }

    try {
      setError(null)

      const response = await apiFetch(
        `/items/${editItem.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: editItem.name,
            category: editItem.category,
            quantity: Number(editItem.quantity),
            price: Number(editItem.price),
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to update item")
      }

      setEditItem(null)

      await fetchItems()
    } catch {
      setError("Could not update item.")
    }
  }

  async function deleteItem(id: number) {
    try {
      setError(null)

      const response = await apiFetch(
        `/items/${id}`,
        {
          method: "DELETE",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to delete item")
      }

      await fetchItems()
    } catch {
      setError("Could not delete item.")
    }
  }

  function getStatusStyle(status: string) {
    if (status === "In Stock") {
      return "bg-green-100 text-green-800"
    }

    if (status === "Low Stock") {
      return "bg-yellow-100 text-yellow-800"
    }

    return "bg-red-100 text-red-800"
  }

  useEffect(() => {
    fetchItems()
  }, [search, category, sortBy, order])

  useEffect(() => {
    setPage(1)
  }, [search, category, sortBy, order])

  return (
    <div>
      <section className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            PartsPilot Inventory
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Inventory Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Track and manage vehicle parts, stock levels and pricing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "+ Add New Item"}
        </button>
      </section>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {showForm && (
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            New Item
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
              placeholder="Name"
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value,
                })
              }
            />

            <input
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
              placeholder="Category"
              value={form.category}
              onChange={(event) =>
                setForm({
                  ...form,
                  category: event.target.value,
                })
              }
            />

            <input
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(event) =>
                setForm({
                  ...form,
                  quantity: Number(event.target.value),
                })
              }
            />

            <input
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
              type="number"
              placeholder="Price (£)"
              value={form.price}
              onChange={(event) =>
                setForm({
                  ...form,
                  price: Number(event.target.value),
                })
              }
            />
          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-4 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Save Item
          </button>
        </section>
      )}

      {editItem && (
        <section className="mb-6 rounded-2xl border border-blue-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Edit Item #{editItem.id}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
              value={editItem.name}
              onChange={(event) =>
                setEditItem({
                  ...editItem,
                  name: event.target.value,
                })
              }
            />

            <input
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
              value={editItem.category}
              onChange={(event) =>
                setEditItem({
                  ...editItem,
                  category: event.target.value,
                })
              }
            />

            <input
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
              type="number"
              value={editItem.quantity}
              onChange={(event) =>
                setEditItem({
                  ...editItem,
                  quantity: Number(event.target.value),
                })
              }
            />

            <input
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
              type="number"
              value={editItem.price}
              onChange={(event) =>
                setEditItem({
                  ...editItem,
                  price: Number(event.target.value),
                })
              }
            />
          </div>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={updateItem}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => setEditItem(null)}
              className="rounded-xl bg-slate-100 px-6 py-3 font-semibold text-slate-700"
            >
              Cancel
            </button>
          </div>
        </section>
      )}

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            className="rounded-lg border border-slate-300 px-4 py-3 text-sm"
            placeholder="Search by Item Name, SKU, or Category..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <select
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            <option value="">
              All Categories
            </option>

            {categories.map((categoryName) => (
              <option
                key={categoryName}
                value={categoryName}
              >
                {categoryName}
              </option>
            ))}
          </select>

          <select
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="id">
              Sort by ID
            </option>

            <option value="price">
              Sort by Price
            </option>

            <option value="quantity">
              Sort by Quantity
            </option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              setOrder(
                order === "ascending"
                  ? "descending"
                  : "ascending"
              )
            }
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
          >
            {order === "ascending"
              ? "Ascending"
              : "Descending"}
          </button>

          {(search || category) && (
            <button
              type="button"
              onClick={() => {
                setSearch("")
                setCategory("")
              }}
              className="text-sm font-semibold text-blue-600"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="font-bold text-slate-900">
            Inventory Management
          </h2>

          <p className="text-sm text-slate-500">
            Manage parts, stock statuses, quantities, and unit prices.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">
                  ID / SKU
                </th>

                <th className="px-6 py-4">
                  ItemName
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Quantity
                </th>

                <th className="px-6 py-4">
                  Cost per Unit
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center"
                  >
                    <p className="font-semibold text-slate-600">
                      No parts found
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Add your first item to begin managing your inventory.
                    </p>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-700">
                        #{item.id}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {item.sku}
                      </p>
                    </td>

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

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          item.stock_status
                        )}`}
                      >
                        {item.stock_status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setEditItem(item)}
                          className="text-medium font-bold text-blue-600"
                        >
                          ✎
                        </button>
                  
                        <button
                          type="button"
                          onClick={() => deleteItem(item.id)}
                          className="text-medium font-bold text-red-500"
                        >
                          ✖
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
    </div>
  )
}

export default PartsInventory