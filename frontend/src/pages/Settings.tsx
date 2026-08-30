function Settings() {
  return (
    <div className="space-y-7">
      {/* Page heading */}
      <header aria-labelledby="settings-title">
        <p className="text-sm font-semibold text-violet-600">
          Workspace
        </p>

        <h1
          id="settings-title"
          className="mt-1 text-3xl font-bold tracking-tight text-slate-950"
        >
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          View account, security and application
          information for your PartsPilot workspace.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Account */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
            <h2 className="font-bold text-slate-900">
              Account
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current workspace access.
            </p>
          </div>

          <dl className="divide-y divide-slate-100 px-5 sm:px-6">
            <div className="flex items-center justify-between gap-4 py-4">
              <dt className="text-sm text-slate-500">
                Account
              </dt>

              <dd className="text-sm font-semibold text-slate-800">
                Demo Account
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <dt className="text-sm text-slate-500">
                Workspace
              </dt>

              <dd className="text-sm font-semibold text-slate-800">
                PartsPilot Free
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <dt className="text-sm text-slate-500">
                Authentication
              </dt>

              <dd>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  Authenticated
                </span>
              </dd>
            </div>
          </dl>
        </section>

        {/* Application */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
            <h2 className="font-bold text-slate-900">
              Application
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              PartsPilot environment information.
            </p>
          </div>

          <dl className="divide-y divide-slate-100 px-5 sm:px-6">
            <div className="flex items-center justify-between gap-4 py-4">
              <dt className="text-sm text-slate-500">
                Product
              </dt>

              <dd className="text-sm font-semibold text-slate-800">
                PartsPilot
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <dt className="text-sm text-slate-500">
                Frontend
              </dt>

              <dd className="text-right text-sm font-semibold text-slate-800">
                React + TypeScript
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <dt className="text-sm text-slate-500">
                API
              </dt>

              <dd className="text-sm font-semibold text-slate-800">
                FastAPI
              </dd>
            </div>
          </dl>
        </section>
      </div>

      {/* Security */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <h2 className="font-bold text-slate-900">
            Security &amp; data
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            How authentication and demonstration
            data are handled.
          </p>
        </div>

        <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-700"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                  />
                  <path
                    d="M8 10V7a4 4 0 0 1 8 0v3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <h3 className="font-semibold text-slate-900">
                Authentication
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              PartsPilot uses hashed passwords and
              token-based authentication to protect
              authenticated application routes.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-700"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <ellipse
                    cx="12"
                    cy="5"
                    rx="7"
                    ry="3"
                  />
                  <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
                  <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
                </svg>
              </span>

              <h3 className="font-semibold text-slate-900">
                Demonstration data
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              This deployed application is intended
              for demonstration and portfolio use.
              Real personal, customer or business
              information should not be entered.
            </p>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="overflow-hidden rounded-2xl bg-[#0b1120] text-white">
        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
            Engineering
          </p>

          <h2 className="mt-3 text-xl font-bold">
            Built as a full-stack application
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            PartsPilot combines a React and TypeScript
            frontend with a FastAPI and PostgreSQL
            backend, JWT authentication, Docker
            development tooling and automated CI
            workflows.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Settings