import { useCallback, useEffect, useState } from "react"

import { apiFetch } from "../services/api"

import type { CategorySummary, CategoryValue, HighestValueItem, InventoryStats, LowestStockItem } from "../types/reports"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value)
}

function Reports() {
  const [stats, setStats] =
    useState<InventoryStats | null>(null)

  const [highestValue, setHighestValue] =
    useState<HighestValueItem | null>(null)

  const [lowestStock, setLowestStock] =
    useState<LowestStockItem | null>(null)

  const [categorySummary, setCategorySummary] =
    useState<CategorySummary>({})

  const [categoryValue, setCategoryValue] =
    useState<CategoryValue>({})

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const fetchReports = useCallback(
    async () => {
      setLoading(true)
      setError(null)

      try {
        const [statsResponse, highestValueResponse, lowestStockResponse, categorySummaryResponse, categoryValueResponse] = await Promise.all([
          apiFetch("/items/stats"),
          apiFetch("/items/highest-value"),
          apiFetch("/items/lowest-stock"),
          apiFetch("/items/category-summary"),
          apiFetch("/items/category-value"),
        ])

        const responses = [statsResponse, highestValueResponse, lowestStockResponse, categorySummaryResponse, categoryValueResponse]

        if (
          responses.some(
            (response) => !response.ok
          )
        ) {
          throw new Error(
            "Unable to load report data"
          )
        }

        const [statsData, highestValueData, lowestStockData, categorySummaryData, categoryValueData] = await Promise.all([
          statsResponse.json(),
          highestValueResponse.json(),
          lowestStockResponse.json(),
          categorySummaryResponse.json(),
          categoryValueResponse.json(),
        ])

        setStats(statsData)
        setHighestValue(highestValueData)
        setLowestStock(lowestStockData)
        setCategorySummary(categorySummaryData)
        setCategoryValue(categoryValueData)

        setJustRefreshed(true)

        window.setTimeout(() => {
          setJustRefreshed(false)
        }, 1500)

      } catch (err) {
        console.error(err)

        setError(
          "Reports could not be loaded. Please try again."
        )
      } finally {
        setLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  const categoryEntries =
    Object.entries(categoryValue)
      .map(([category, value]) => ({
        category,
        value: Number(value),
        quantity:
          categorySummary[category] ?? 0,
      }))
      .sort(
        (a, b) => b.value - a.value
      )

  const maximumCategoryValue =
    Math.max(
      ...categoryEntries.map(
        (item) => item.value
      ),
      1
    )

  const [justRefreshed, setJustRefreshed] =
    useState(false)  

  function exportReportCsv() {
    if (!stats) {
      return
    }

    const rows = [
      ["Metric", "Value"],
      ["Total products", stats.total_products],
      ["Total units", stats.total_quantity],
      ["Inventory value", stats.total_inventory_value],
      ["Average item price", stats.average_item_price],
      ["In stock", stats.in_stock_count],
      ["Low stock", stats.low_stock_count],
      ["Out of stock", stats.out_of_stock_count],
      [],
      ["Category", "Units", "Value"],
      ...categoryEntries.map((item) => [
        item.category,
        item.quantity,
        item.value,
      ]),
    ]

    const csv = rows
      .map((row) =>
        row
          .map(
            (value) =>
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

    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(url)
  }  

  return (
    <div className="space-y-7">
      {/* Page heading */}
      <header
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        aria-labelledby="reports-title"
      >
        <div>
          <p className="text-sm font-semibold text-violet-600">
            Analytics
          </p>

          <h1
            id="reports-title"
            className="mt-1 text-3xl font-bold tracking-tight text-slate-950"
          >
            Reports
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Review inventory value,
            stock levels and category
            performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {justRefreshed && !loading && (
            <span
              role="status"
              aria-live="polite"
              className="animate-pulse text-sm font-semibold text-emerald-600"
            >
              Updated ✓
            </span>
          )}

          <button
            type="button"
            onClick={exportReportCsv}
            disabled={!stats || loading}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Export CSV
          </button>

          <button
            type="button"
            onClick={fetchReports}
            disabled={loading}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Refreshing…"
              : "Refresh data"}
          </button>
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

      {/* KPI cards */}
      <section
        aria-label="Inventory report summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <ReportMetric
          label="Inventory value"
          value={
            stats
              ? formatCurrency(
                  stats.total_inventory_value
                )
              : "—"
          }
          detail="Current stock value"
          loading={loading}
        />

        <ReportMetric
          label="Average item price"
          value={
            stats
              ? formatCurrency(
                  stats.average_item_price
                )
              : "—"
          }
          detail="Across all products"
          loading={loading}
        />

        <ReportMetric
          label="Total units"
          value={
            stats
              ? stats.total_quantity.toLocaleString(
                  "en-GB"
                )
              : "—"
          }
          detail="Units currently recorded"
          loading={loading}
        />

        <ReportMetric
          label="Active products"
          value={
            stats
              ? stats.total_products.toLocaleString(
                  "en-GB"
                )
              : "—"
          }
          detail="Inventory product records"
          loading={loading}
        />
      </section>

      {/* Highlights */}
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
            Highest inventory value
          </p>

          {loading ? (
            <p
              className="mt-5 text-sm text-slate-500"
              role="status"
            >
              Loading…
            </p>
          ) : highestValue ? (
            <>
              <h2 className="mt-5 text-xl font-bold text-slate-900">
                {highestValue.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {highestValue.category}
              </p>

              <p className="mt-6 text-2xl font-bold text-slate-950">
                {formatCurrency(
                  Number(
                    highestValue.inventory_value
                  )
                )}
              </p>
            </>
          ) : (
            <p className="mt-5 text-sm text-slate-500">
              No inventory data available.
            </p>
          )}
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
            Lowest stock
          </p>

          {loading ? (
            <p
              className="mt-5 text-sm text-slate-500"
              role="status"
            >
              Loading…
            </p>
          ) : lowestStock ? (
            <>
              <h2 className="mt-5 text-xl font-bold text-slate-900">
                {lowestStock.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {lowestStock.category}
              </p>

              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-2xl font-bold text-slate-950">
                    {lowestStock.quantity}
                  </p>

                  <p className="text-xs text-slate-500">
                    units remaining
                  </p>
                </div>

                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                  {
                    lowestStock.stock_status
                  }
                </span>
              </div>
            </>
          ) : (
            <p className="mt-5 text-sm text-slate-500">
              No inventory data available.
            </p>
          )}
        </article>
      </section>

      {/* Category analysis */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <h2 className="font-bold text-slate-900">
            Inventory by category
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Stock quantity and value
            across inventory categories.
          </p>
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          {loading ? (
            <p
              role="status"
              className="text-sm text-slate-500"
            >
              Loading category data…
            </p>
          ) : categoryEntries.length ===
            0 ? (
            <p className="text-sm text-slate-500">
              No category data available.
            </p>
          ) : (
            categoryEntries.map(
              ({
                category,
                value,
                quantity,
              }) => {
                const width =
                  (value /
                    maximumCategoryValue) *
                  100

                return (
                  <div key={category}>
                    <div className="mb-2 flex items-end justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {category}
                        </p>

                        <p className="text-xs text-slate-500">
                          {quantity} units
                        </p>
                      </div>

                      <p className="text-sm font-semibold text-slate-700">
                        {formatCurrency(
                          value
                        )}
                      </p>
                    </div>

                    <div
                      className="h-2 overflow-hidden rounded-full bg-slate-100"
                      aria-hidden="true"
                    >
                      <div
                        className="h-full rounded-full bg-violet-500"
                        style={{
                          width: `${width}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              }
            )
          )}
        </div>
      </section>

      {/* Power BI */}
      <section className="overflow-hidden rounded-2xl bg-[#0b1120] text-white">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
              Advanced reporting
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Power BI analytics
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              PartsPilot also includes a
              dedicated Power BI dashboard
              for deeper inventory analysis
              and visual reporting.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <span className="inline-flex items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2.5 text-sm font-semibold text-emerald-300">
              Dashboard complete
            </span>

            <span className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300">
              Power BI report preview
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

type ReportMetricProps = {
  label: string
  value: string
  detail: string
  loading: boolean
}

function ReportMetric({
  label,
  value,
  detail,
  loading,
}: ReportMetricProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
        {loading ? "—" : value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {detail}
      </p>
    </article>
  )
}

export default Reports