import { NavLink } from "react-router-dom"

type IconProps = {
  name:
    | "dashboard"
    | "inventory"
    | "suppliers"
    | "reports"
    | "settings"
}

function Icon({ name }: IconProps) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  }

  if (name === "dashboard") {
    return (
      <svg {...commonProps}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    )
  }

  if (name === "inventory") {
    return (
      <svg {...commonProps}>
        <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" />
        <path d="m4 7.5 8 4.5 8-4.5" />
        <path d="M12 12v9" />
      </svg>
    )
  }

  if (name === "suppliers") {
    return (
      <svg {...commonProps}>
        <path d="M3 21V8l6-3v16" />
        <path d="M9 21V3l12 5v13" />
        <path d="M6 11h1" />
        <path d="M6 15h1" />
        <path d="M13 10h2" />
        <path d="M17 10h1" />
        <path d="M13 14h2" />
        <path d="M17 14h1" />
        <path d="M13 18h2" />
        <path d="M17 18h1" />
      </svg>
    )
  }

  if (name === "reports") {
    return (
      <svg {...commonProps}>
        <path d="M4 20V10" />
        <path d="M10 20V4" />
        <path d="M16 20v-7" />
        <path d="M22 20V7" />
      </svg>
    )
  }

  if (name === "settings") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.7 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1a1.7 1.7 0 0 0 1.1 1.6 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.17.36.38.7.6 1 .27.3.64.46 1.1.46h.1v4h-.1A1.7 1.7 0 0 0 19.4 15Z" />
      </svg>
    )
  }

  return null
}  

const navigation = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: "dashboard" as const,
  },
  {
    to: "/inventory",
    label: "Inventory",
    icon: "inventory" as const,
  },
  {
    to: "/suppliers",
    label: "Suppliers",
    icon: "suppliers" as const,
  },
  {
    to: "/reports",
    label: "Reports",
    icon: "reports" as const,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: "settings" as const,
  },
]

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-3.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120]",
    isActive
      ? "bg-violet-500/15 !text-white ring-1 ring-inset ring-violet-400/25"
      : "!text-slate-100 hover:bg-white/10 hover:!text-white",
  ].join(" ")


function Sidebar() {
  return (
    <>
      {/* Desktop sidebar */}
      <aside 
        className="hidden min-h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#0b1120] px-4 py-5 lg:flex"
        aria-label="PartsPilot application sidebar"
      >
        <div className="flex items-center gap-3 px-2">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-xl text-violet-300"
            aria-hidden="true"
          >
            ⌬
          </div>

          <div>
            <p className="font-bold tracking-tight text-white">
              PartsPilot
            </p>

            <p className="mt-0.5 text-[11px] text-slate-400">
              Inventory Intelligence
            </p>
          </div>
        </div>

        <div className="my-6 border-t border-white/8" />

        <p className="mb-4 px-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Workspace
        </p>

        <nav 
          className="space-y-3"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={navLinkClasses}
            >
              <span className="h-[22px] w-[22px] shrink-0 text-current">
                <Icon name={item.icon} />
              </span>
              
              <span className="text-current">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile bottom navigation */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
        aria-label="Application navigation"
      >
        <div className="grid grid-cols-5">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex min-h-[4.25rem] flex-col items-center justify-center gap-1 rounded-lg px-1 text-[10px] font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500",
                  isActive
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-600 hover:text-slate-950",
                ].join(" ")
              }
            >
            <span className="h-5 w-5 text-current">
              <Icon name={item.icon} />
            </span>

            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  </>
)}

export default Sidebar