import { useEffect, useState } from "react"

import { apiFetch } from "../services/api"
import type { Item } from "../types/inventory"

type InventoryStats = {
  total_products: number
  total_quantity: number
  total_inventory_value: number
  average_item_price: number
  in_stock_count: number
  low_stock_count: number
  out_of_stock_count: number
}

type CategoryValues = Record<string, string>

type MetricCardProps = {
  label: string
  value: string
  detail: string
  tone?: "neutral" | "success" | "warning"
  icon: React.ReactNode
}

function MetricCard({
  label,
  value,
  detail,
  tone = "neutral",
  icon,
}: MetricCardProps) {
  const detailClass =
    tone === "success"
      ? "text-emerald-600"
      : tone === "warning"
        ? "text-orange-500"
        : "text-slate-500"

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-600">
          {icon}
        </div>
      </div>

      <p
        className={`mt-3 text-xs font-medium ${detailClass}`}
      >
        {detail}
      </p>
    </article>
  )
}

function DashboardIcon({
  type,
}: {
  type: "value" | "stock" | "products" | "quantity"
}) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
    "aria-hidden": true,
  }

  if (type === "value") {
    return (
      <svg {...props}>
        <path d="M6 5h9a4 4 0 0 1 0 8H8" />
        <path d="M6 19h10" />
        <path d="M9 3v16" />
      </svg>
    )
  }

  if (type === "stock") {
    return (
      <svg {...props}>
        <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" />
        <path d="m4 7.5 8 4.5 8-4.5" />
        <path d="M12 12v9" />
      </svg>
    )
  }

  if (type === "products") {
    return (
      <svg {...props}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10" />
        <path d="M7 12h10" />
        <path d="M7 16h6" />
      </svg>
    )
  }

  return (
    <svg {...props}>
      <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" />
      <path d="M8 10h8" />
      <path d="M8 14h8" />
    </svg>
  )
}

function getStatusClasses(status: string) {
  if (status === "In Stock") {
    return "bg-emerald-50 text-emerald-700"
  }

  if (status === "Low Stock") {
    return "bg-orange-50 text-orange-700"
  }

  return "bg-red-50 text-red-700"
}

function Dashboard() {
  const [stats, setStats] =
    useState<InventoryStats | null>(null)

  const [recentItems, setRecentItems] =
    useState<Item[]>([])

  const [lowStockItems, setLowStockItems] =
    useState<Item[]>([])

  const [categoryValues, setCategoryValues] =
    useState<CategoryValues>({})

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const [animateBars, setAnimateBars] =
    useState(false)

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true)
        setError(null)

        const [
          statsResponse,
          recentResponse,
          lowStockResponse,
          categoryValueResponse,
        ] = await Promise.all([
          apiFetch("/items/stats"),
          apiFetch("/items/recent?limit=5"),
          apiFetch("/items/low-stock"),
          apiFetch("/items/category-value"),
        ])

        if (
          !statsResponse.ok ||
          !recentResponse.ok ||
          !lowStockResponse.ok ||
          !categoryValueResponse.ok
        ) {
          throw new Error(
            "Failed to load dashboard"
          )
        }

        const statsData: InventoryStats =
          await statsResponse.json()

        const recentData: Item[] =
          await recentResponse.json()

        const lowStockData: Item[] =
          await lowStockResponse.json()

        const categoryValueData: CategoryValues =
          await categoryValueResponse.json()

        setStats(statsData)
        setRecentItems(recentData)
        setLowStockItems(lowStockData)
        setCategoryValues(categoryValueData)

        setAnimateBars(false)

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            setAnimateBars(true)
          })
        })
      } catch {
        setError(
          "Could not load dashboard data."
        )
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const totalStockStatuses =
    stats
      ? stats.in_stock_count +
        stats.low_stock_count +
        stats.out_of_stock_count
      : 0

  const inStockPercent =
    totalStockStatuses > 0
      ? (stats!.in_stock_count /
          totalStockStatuses) *
        100
      : 0

  const lowStockPercent =
    totalStockStatuses > 0
      ? (stats!.low_stock_count /
          totalStockStatuses) *
        100
      : 0

  const categoryEntries =
    Object.entries(categoryValues).map(
      ([category, value]) => ({
        category,
        value: Number(value),
      })
    )

  const maxCategoryValue = Math.max(
    ...categoryEntries.map(
      (entry) => entry.value
    ),
    1
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <header 
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        aria-labelledby="dashboard-title"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
            Overview
          </p>

          <h1 
            id="dashboard-title"
            className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Monitor inventory performance,
            stock levels and operational
            activity.
          </p>
        </div>

        <div 
          className="flex items-center gap-2 text-xs text-slate-500"
          role="status"
          aria-live="polite"
        >
          <span
            className={`h-2 w-2 rounded-full ${
              error
                ? "bg-red-500"
                : loading
                  ? "bg-orange-400"
                  : "bg-emerald-500"
            }`}
            aria-hidden="true"
          />

          {loading
            ? "Loading inventory"
            : error
              ? "Data unavailable"
              : "Inventory connected"}
        </div>
      </header>

      {error && (
        <div 
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Metrics */}
      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Inventory overview"
      >
        <MetricCard
          label="Inventory value"
          value={
            stats
              ? `£${stats.total_inventory_value.toLocaleString(
                  "en-GB",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`
              : "—"
          }
          detail="Current stock valuation"
          tone="success"
          icon={
            <DashboardIcon type="value" />
          }
        />

        <MetricCard
          label="Low-stock items"
          value={
            stats
              ? String(stats.low_stock_count)
              : "—"
          }
          detail={
            stats?.low_stock_count
              ? "Needs attention"
              : "Stock levels healthy"
          }
          tone={
            stats?.low_stock_count
              ? "warning"
              : "success"
          }
          icon={
            <DashboardIcon type="stock" />
          }
        />

        <MetricCard
          label="Active products"
          value={
            stats
              ? String(stats.total_products)
              : "—"
          }
          detail="Inventory product lines"
          icon={
            <DashboardIcon type="products" />
          }
        />

        <MetricCard
          label="Total units"
          value={
            stats
              ? stats.total_quantity.toLocaleString(
                  "en-GB"
                )
              : "—"
          }
          detail="Units currently recorded"
          icon={
            <DashboardIcon type="quantity" />
          }
        />
      </section>

      {/* Analytics */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.8fr)]">
        {/* Category value */}
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] sm:p-6">
          <div>
            <p className="text-sm font-semibold text-slate-950">
              Inventory value by category
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Current stock valuation across
              automotive categories
            </p>
          </div>

          <div className="mt-7 space-y-5">
            {categoryEntries.length === 0 ? (
              <p className="py-12 text-center text-sm text-slate-400">
                No category data available.
              </p>
            ) : (
              categoryEntries.map(
                ({ category, value }) => {
                  const width =
                    (value /
                      maxCategoryValue) *
                    100

                  return (
                    <div key={category}>
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <span className="text-sm font-medium text-slate-700">
                          {category}
                        </span>

                        <span className="text-xs font-semibold text-slate-500">
                          £
                          {value.toLocaleString(
                            "en-GB",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full origin-left rounded-full bg-violet-500 transition-[width] duration-700 ease-out"
                          style={{
                            width: animateBars
                              ? `${width}%`
                              : "0%",
                          }}
                        />
                      </div>
                    </div>
                  )
                }
              )
            )}
          </div>
        </article>

        <div className="space-y-6">
          {/* Stock status */}
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] sm:p-6">
            <div>
              <p className="text-sm font-semibold text-slate-950">
                Stock status
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Current inventory health
              </p>
            </div>

            <div
              aria-hidden="true"
              className="mt-8 grid place-items-center"
            >
              <div
                className="relative grid h-44 w-44 place-items-center rounded-full"
                style={{
                  background:
                    totalStockStatuses > 0
                      ? `conic-gradient(
                          #10b981 0 ${inStockPercent}%,
                          #fb923c ${inStockPercent}% ${
                            inStockPercent +
                            lowStockPercent
                          }%,
                          #ef4444 ${
                            inStockPercent +
                            lowStockPercent
                          }% 100%
                        )`
                      : "#f1f5f9",
                }}
              >
                <div className="grid h-32 w-32 place-items-center rounded-full bg-white">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-950">
                      {stats?.total_products ??
                        "—"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Products
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-slate-500">
                  <i className="h-2 w-2 rounded-full bg-emerald-500" />
                  In stock
                </span>

                <strong className="text-sm text-slate-800">
                  {stats?.in_stock_count ??
                    "—"}
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-slate-500">
                  <i className="h-2 w-2 rounded-full bg-orange-400" />
                  Low stock
                </span>

                <strong className="text-sm text-slate-800">
                  {stats?.low_stock_count ??
                    "—"}
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-slate-500">
                  <i className="h-2 w-2 rounded-full bg-red-500" />
                  Out of stock
                </span>

                <strong className="text-sm text-slate-800">
                  {stats?.out_of_stock_count ??
                    "—"}
                </strong>
              </div>
            </div>
          </article>


        </div>
      </section>

      {/* Lower section */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {/* Recent inventory */}
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/[0.02]">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <p className="text-sm font-semibold text-slate-950">
              Recent inventory
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Latest products added to
              PartsPilot
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {recentItems.length === 0 ? (
              <p className="p-6 text-sm text-slate-400">
                No recent inventory.
              </p>
            ) : (
              recentItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {item.sku} ·{" "}
                      {item.category}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-700">
                      {item.quantity}
                    </p>

                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-1 text-[10px] font-semibold ${getStatusClasses(
                        item.stock_status
                      )}`}
                    >
                      {item.stock_status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>

        {/* Attention */}
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/[0.02]">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <p className="text-sm font-semibold text-slate-950">
              Needs attention
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Products at or below minimum
              stock threshold
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {lowStockItems.length === 0 ? (
              <div className="p-6">
                <p className="text-sm font-medium text-emerald-700">
                  No low-stock products.
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Current stock levels are
                  above their minimum
                  thresholds.
                </p>
              </div>
            ) : (
              lowStockItems
                .slice(0, 5)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Minimum:{" "}
                        {item.min_threshold}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-orange-600">
                        {item.quantity}
                      </p>

                      <p className="text-[10px] text-slate-400">
                        remaining
                      </p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </article>
      </section>
    </div>
  )
}

export default Dashboard