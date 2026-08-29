export default function LoginFooter() {
  return (
    <footer className="flex flex-col gap-3 border-t border-slate-300 bg-white/95 px-5 py-4 text-center text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
      <div>
        <p>© 2026 PartsPilot</p>

        <p className="mt-0.5">
          Built by{" "}
          <a
            href="https://irisoak.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-700 transition hover:text-blue-600 hover:underline"
          >
            Iris &amp; Oak
          </a>
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 md:justify-end">
        <a
          href="/privacy"
          className="transition hover:text-blue-600 hover:underline"
        >
          Privacy
        </a>

        <a
          href="https://github.com/Iris408/partspilot/tree/main/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-blue-600 hover:underline"
        >
          Documentation
        </a>

        <a
          href="https://github.com/Iris408/partspilot"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-blue-600 hover:underline"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}