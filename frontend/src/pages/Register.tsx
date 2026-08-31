import { Link } from "react-router-dom"

function Register() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f6fa] px-5 py-10">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60 sm:p-10">
        <div
          className="mx-auto text-5xl text-slate-700"
          aria-hidden="true"
        >
          ⌬
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          PartsPilot
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Account registration coming soon
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600">
          Self-service account creation is not currently available.
          PartsPilot is presently available as a demonstration product.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/login"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to sign in
          </Link>

          <Link
            to="/"
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Return to PartsPilot
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Register