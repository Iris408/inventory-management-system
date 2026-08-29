import { Link } from "react-router-dom"

function Privacy() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          ← Back to PartsPilot
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold text-blue-600">
            PartsPilot
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Privacy
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Information about data used in the PartsPilot portfolio demo.
          </p>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Demo Notice
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            PartsPilot is a portfolio project. The demo account uses shared,
            publicly listed credentials and displays fictional inventory data
            for demonstration purposes only. No real vehicles, parts, or
            business data are involved.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            No personal information is required to use the shared demo
            experience. Any inventory data entered using the demo account may
            be visible to other users of that account and may be periodically
            reset.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            PartsPilot is not currently intended for production or commercial
            use.
          </p>
        </section>
      </div>
    </main>
  )
}

export default Privacy