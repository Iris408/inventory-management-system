import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

type AppLayoutProps = {
  onLogout: () => void
}

function AppLayout({ onLogout }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 lg:flex">
      <Sidebar onLogout={onLogout} />

      <main className="min-w-0 flex-1 p-4 sm:p-5 lg:p-6 xl:p-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AppLayout