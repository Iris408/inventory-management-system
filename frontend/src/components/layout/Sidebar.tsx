import { NavLink } from "react-router-dom"

type SidebarProps = {
  onLogout: () => void
}

function Sidebar({ onLogout }: SidebarProps) {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    [
      "w-full rounded-xl px-4 py-3 text-left text-sm transition",
      isActive
        ? "bg-blue-50 font-semibold text-blue-700"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700",
    ].join(" ")

  return (
    <aside className="hidden min-h-screen w-56 flex-col border-r border-slate-200 bg-white px-4 py-6 lg:flex">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white">
          𓎚 PP
        </div>

        <div>
          <p className="font-bold text-slate-900">
            PartsPilot
          </p>

          <p className="text-xs text-slate-500">
            Inventory Analytics Platform
          </p>
        </div>
      </div>

      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={navLinkClasses}
        >
         𓃑 Dashboard
        </NavLink>

        <NavLink
          to="/inventory"
          className={navLinkClasses}
        >
          📦📦 Inventory
        </NavLink>

        <NavLink
          to="/reports"
          className={navLinkClasses}
        >
          📊 Reports
        </NavLink>

        <NavLink
          to="/suppliers"
          className={navLinkClasses}
        >
          ☰ Suppliers
        </NavLink>

        <NavLink
          to="/settings"
          className={navLinkClasses}
        >
          ⚙️ Settings
        </NavLink>
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="mt-auto w-full rounded-xl px-4 py-3 text-left text-sm text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
      >
        Logout
      </button>
    </aside>
  )
}

export default Sidebar