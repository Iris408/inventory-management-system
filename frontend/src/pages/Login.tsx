import { useState } from "react"
import LoginFooter from "../components/LoginFooter"
import { LOGIN_URL } from "../services/api"

const DEMO_USERNAME = "partspilot"
const DEMO_PASSWORD = "PartsPilotDemo2026!"

type LoginForm = {
  username: string
  password: string
}

type LoginProps = {
  onLogin: (token: string) => void
}

type PreviewMetricProps = {
  label: string
  value: string
  detail: string
}

function PreviewMetric({
  label,
  value,
  detail,
}: PreviewMetricProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {detail}
      </p>
    </div>
  )
}

type ActivityItemProps = {
  name: string
  detail: string
  status: string
}

function ActivityItem({
  name,
  detail,
  status,
}: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-800">
          {name}
        </p>

        <p className="text-xs text-slate-500">
          {detail}
        </p>
      </div>

      <span className="text-xs font-semibold text-blue-600">
        {status}
      </span>
    </div>
  )
}

function Login({ onLogin }: LoginProps) {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
  })

  const [loginError, setLoginError] = useState<string | null>(null)

  function fillDemoCredentials() {
    setLoginError(null)

    setLoginForm({
      username: DEMO_USERNAME,
      password: DEMO_PASSWORD,
    })
  }

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
        throw new Error("Login failed")
      }

      const data = await response.json()

      const accessToken = data.access_token || data.token

      if (!accessToken) {
        throw new Error("No token returned")
      }

      localStorage.setItem("TOKEN_STORAGE_KEY", accessToken)

      onLogin(accessToken)

      setLoginForm({
        username: "",
        password: "",
      })
    } catch {
      setLoginError(
        "Login failed. Check your credentials and try again."
      )
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6fa] lg:grid lg:h-screen lg:grid-rows-[1fr_auto] lg:overflow-hidden">
      <div className="min-h-0 md:grid md:grid-cols-1 lg:grid-cols-[40%_60%]">
        {/* Left: login panel */}
        <section className="flex min-h-screen flex-col bg-gradient-to-b from-[#3B3F4A] to-[#74625D] px-5 py-6 sm:px-8 md:min-h-0 md:py-10 lg:h-full lg:px-10 lg:py-5">
          <div className="flex flex-1 items-start justify-center pt-3 lg:pt-5">
            <div className="w-full max-w-md">
              <div className="mb-5 text-center">
                <div
                  className="text-4xl text-white"
                  aria-hidden="true"
                >
                  𓎚
                </div>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                  PartsPilot
                </h1>

                <p className="mx-auto mt-2 max-w-sm text-sm font-medium leading-6 text-slate-200">
                  Manage vehicle parts, monitor stock levels, track inventory
                  value, and gain operational insights.
                </p>
              </div>

              {loginError && (
                <div
                  role="alert"
                  className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {loginError}
                </div>
              )}

              <div className="mb-4 border border-blue-200 bg-blue-50 p-3 shadow-sm sm:p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-blue-950">
                      Demo Account
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-700">
                      Use the demo account below to explore the PartsPilot
                      dashboard.
                    </p>
                  </div>

                  <span className="bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                    Free
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-xs text-blue-900">
                  <p>
                    Username:{" "}
                    <code className="font-semibold">
                      {DEMO_USERNAME}
                    </code>
                  </p>

                  <p>
                    Password:{" "}
                    <code className="font-semibold">
                      {DEMO_PASSWORD}
                    </code>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="mt-3 w-full border border-blue-300 bg-white px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Use demo credentials
                </button>
              </div>

              <form
                className="space-y-3"
                onSubmit={(event) => {
                  event.preventDefault()
                  login()
                }}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="mb-1 block text-sm font-medium text-slate-100"
                  >
                    Username
                  </label>

                  <input
                    id="username"
                    name="username"
                    autoComplete="username"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                    placeholder="Enter your username"
                    value={loginForm.username}
                    onChange={(event) =>
                      setLoginForm({
                        ...loginForm,
                        username: event.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1 block text-sm font-medium text-slate-100"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    type="password"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(event) =>
                      setLoginForm({
                        ...loginForm,
                        password: event.target.value,
                      })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#74625D]"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Right: dashboard preview */}
        <section className="relative hidden overflow-hidden bg-[#eaf0f7] px-5 py-8 md:flex md:flex-col md:px-8 lg:h-full lg:px-8 lg:py-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.16),_transparent_42%)]" />

          <div className="relative flex flex-1 items-center justify-center overflow-hidden">
            <div className="w-full max-w-4xl">
              <div className="mb-4 max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
                  Inventory intelligence
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 xl:text-4xl">
                  See what is in stock, what is moving, and what needs attention.
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600 xl:text-base">
                  PartsPilot brings inventory operations, stock alerts and
                  business analytics into one clear dashboard.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-300/50">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Dashboard overview
                    </p>

                    <h3 className="mt-1 text-xl font-semibold text-slate-900">
                      PartsPilot Analytics
                    </h3>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Live
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <PreviewMetric
                    label="Inventory value"
                    value="£128,450"
                    detail="+8.4% this month"
                  />

                  <PreviewMetric
                    label="Low-stock items"
                    value="14"
                    detail="Needs attention"
                  />

                  <PreviewMetric
                    label="Active products"
                    value="186"
                    detail="Across 12 categories"
                  />
                </div>

                <div className="mt-4 grid gap-3 xl:grid-cols-[1.4fr_1fr]">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      Inventory value
                    </p>

                    <p className="text-xs text-slate-500">
                      Six-month overview
                    </p>

                    <div className="mt-4 flex h-28 items-end gap-3 xl:h-32">
                      {[42, 54, 48, 70, 63, 86, 78, 94].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-t-md bg-blue-500/80"
                            style={{ height: `${height}%` }}
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      Recent stock activity
                    </p>

                    <div className="mt-4 space-y-3">
                      <ActivityItem
                        name="Brake pads"
                        detail="24 units received"
                        status="+24"
                      />

                      <ActivityItem
                        name="Oil filters"
                        detail="8 units dispatched"
                        status="-8"
                      />

                      <ActivityItem
                        name="Alternators"
                        detail="Low-stock threshold"
                        status="Alert"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-3">
                <p>✓ Track stock levels</p>
                <p>✓ Monitor operational value</p>
                <p>✓ Identify low-stock risks</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <LoginFooter />
    </div>
  )
}

export default Login