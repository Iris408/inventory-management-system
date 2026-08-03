export default function LoginFooter() {
  return (
    <footer className="flex flex-col gap-3 border-t border-slate-300 bg-white/95 px-5 py-4 text-center text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
      <div>
        <p>© 2026 PartsPilot</p>
        <p className="mt-0.5">An Iris &amp; Oak software project</p>
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 md:justify-end">
        <span>Secure access</span>
        <span>Operational insights</span>
        <span>Responsive dashboard</span>
      </div>
    </footer>
  )
}