import { useEffect, useMemo, useState } from "react"

import { apiFetch } from "../services/api"
import type { Item } from "../types/inventory"

function Reports() {
  const [items, setItems] = useState<Item[]>([])
  const [category, setCategory] = useState("")
  const [stockStatus, setStockStatus] = useState("")
  const [sortBy, setSortBy] = useState("updated")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // =========================================
  // EN: Load inventory data for reporting
  // JP: レポート用の在庫データを読み込みます
  // =========================================
  useEffect(() => {
    async function fetchReportItems() {
      try {
        setError(null)
        setIsLoading(true)

        const response = await apiFetch("/items")

        if (!response.ok) {
          throw new Error("Failed to fetch report inventory")
        }

        const data: Item[] = await response.json()

        setItems(data)
      } catch {
        setError("Could not load report data.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchReportItems()
  }, [])

  // =========================================
  // EN: Build category filter options
  // JP: カテゴリーフィルターの選択肢を作成します
  // =========================================
  const categories = useMemo(
    () =>
      [...new Set(items.map((item) => item.category))].sort(),
    [items]
  )

  // =========================================
  // EN: Apply report filters and sorting
  // JP: レポートのフィルターと並び替えを適用します
  // =========================================
  const filteredItems = useMemo(() => {
    const result = items.filter((item) => {
      const matchesCategory =
        !category || item.category === category

      const matchesStockStatus =
        !stockStatus || item.stock_status === stockStatus

      return matchesCategory && matchesStockStatus
    })

    return [...result].sort((a, b) => {
      if (sortBy === "value") {
        return b.quantity * b.price - a.quantity * a.price
      }

      if (sortBy === "quantity") {
        return b.quantity - a.quantity
      }

      if (sortBy === "price") {
        return b.price - a.price
      }

      return (
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
)
    })
  }, [items, category, stockStatus, sortBy])

  // =========================================
  // EN: Calculate report KPIs from filtered data
  // JP: フィルター済みデータからKPIを計算します
  // =========================================
  const reportStats = useMemo(() => {
    return filteredItems.reduce(
      (stats, item) => {
        stats.inventoryValue += item.quantity * item.price
        stats.totalStock += item.quantity

        if (item.stock_status === "Low Stock") {
          stats.lowStock += 1
        }

        if (item.stock_status === "Out of Stock") {
          stats.outOfStock += 1
        }

        return stats
      },
      {
        inventoryValue: 0,
        totalStock: 0,
        lowStock: 0,
        outOfStock: 0,
      }
    )
  }, [filteredItems])

  function resetFilters() {
    setCategory("")
    setStockStatus("")
    setSortBy("updated")
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

  // =========================================
  // EN: Export currently filtered report as CSV
  // JP: 現在のフィルター結果をCSVとして出力します
  // =========================================
  function exportCsv() {
    const headers = [
      "ID",
      "Part",
      "Category",
      "Quantity",
      "Unit Price",
      "Inventory Value",
      "Stock Status",
    ]

    const rows = filteredItems.map((item) => [
      item.id,
      item.name,
      item.category,
      item.quantity,
      item.price.toFixed(2),
      (item.quantity * item.price).toFixed(2),
      item.stock_status,
    ])

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n")

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.download = "partspilot-inventory-report.csv"
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* =========================================
      EN: Page header
      JP: ページヘッダー
      ========================================= */}
      <section>
        <p className="text-sm font-medium text-blue-600">
          PartsPilot Reporting
        </p>

        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Reports
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Review inventory performance, stock levels, and value across
              PartsPilot.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={exportCsv}
              disabled={filteredItems.length === 0}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Export CSV
            </button>

            <button
              type="button"
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Power BI Analytics
            </button>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* =========================================
      EN: Report filters
      JP: レポートフィルター
      ========================================= */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Category
            </span>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400"
            >
              <option value="">All</option>

              {categories.map((categoryName) => (
                <option
                  key={categoryName}
                  value={categoryName}
                >
                  {categoryName}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Stock status
            </span>

            <select
              value={stockStatus}
              onChange={(event) =>
                setStockStatus(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400"
            >
              <option value="">All</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">
                Out of Stock
              </option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Sort by
            </span>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-400"
            >
              <option value="updated">
                Recently updated
              </option>
              <option value="value">
                Inventory value
              </option>
              <option value="quantity">
                Quantity
              </option>
              <option value="price">
                Cost per Unit
              </option>
            </select>
          </label>

          <div className="flex items-end">
            <button
              type="button"
              onClick={resetFilters}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Reset filters
            </button>
          </div>
        </div>
      </section>

      {/* =========================================
      EN: Report KPI cards
      JP: レポートKPIカード
      ========================================= */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Inventory Value
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            £
            {reportStats.inventoryValue.toLocaleString(
              "en-GB",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Stock
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {reportStats.totalStock.toLocaleString("en-GB")}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Low Stock
          </p>

          <p className="mt-2 text-2xl font-bold text-amber-600">
            {reportStats.lowStock}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Out of Stock
          </p>

          <p className="mt-2 text-2xl font-bold text-red-600">
            {reportStats.outOfStock}
          </p>
        </article>
      </section>

      {/* =========================================
      EN: Main report table
      JP: メインレポートテーブル
      ========================================= */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Inventory Report
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review current quantity, value, stock status, and inventory
              information.
            </p>
          </div>

          <p className="text-sm font-medium text-slate-500">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Part",
                  "SKU",
                  "Category",
                  "Quantity",
                  "Cost per Unit",
                  "Inventory value",
                  "Status",
                  "Last Updated",
                ].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="whitespace-nowrap px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-sm text-slate-400"
                  >
                    Loading inventory report...
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center"
                  >
                    <p className="font-semibold text-slate-600">
                      No inventory matches these filters
                    </p>

                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-2 text-sm font-semibold text-blue-600"
                    >
                      Reset filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">
                      {item.name}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-600">
                     {item.sku}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {item.category}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {item.quantity}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      £{item.price.toFixed(2)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-700">
                      £
                      {(item.quantity * item.price).toFixed(
                        2
                      )}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          item.stock_status
                        )}`}
                      >
                        {item.stock_status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                      {new Date(item.updated_at).toLocaleDateString("en-GB")}
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

export default Reports