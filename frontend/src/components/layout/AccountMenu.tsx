import { useEffect, useRef, useState } from "react"

type AccountMenuProps = {
  onLogout: () => void
}

function AccountMenu({
  onLogout,
}: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuRef =
    useRef<HTMLDivElement | null>(null)

  const triggerRef =
    useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    )

    document.addEventListener(
      "keydown",
      handleKeyDown
    )

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      )

      document.removeEventListener(
        "keydown",
        handleKeyDown
      )
    }
  }, [])

  function handleLogout() {
    setIsOpen(false)
    onLogout()
  }

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() =>
          setIsOpen((current) => !current)
        }
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="account-menu"
        className="
          flex items-center gap-3 rounded-xl
          px-2 py-1.5 text-left transition
          hover:bg-slate-100
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-violet-500
          focus-visible:ring-offset-2
        "
      >
        <span
          className="
            flex h-9 w-9 items-center justify-center
            rounded-full bg-violet-100
            text-sm font-bold text-violet-700
          "
          aria-hidden="true"
        >
          PP
        </span>

        <span className="hidden sm:block">
          <span className="block text-sm font-semibold text-slate-900">
            Demo Account
          </span>

          <span className="block text-xs text-slate-500">
            PartsPilot
          </span>
        </span>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-4 w-4 text-slate-400 transition ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path
            d="m6 9 6 6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="account-menu"
          role="menu"
          aria-label="Account menu"
          className="
            absolute right-0
            top-[calc(100%+0.5rem)]
            z-50 w-56 overflow-hidden
            rounded-xl border
            border-slate-200
            bg-white p-1.5
            shadow-xl
            shadow-slate-900/10
          "
        >
          <div className="border-b border-slate-100 px-3 py-3">
            <p className="text-sm font-semibold text-slate-900">
              Demo Account
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              PartsPilot Workspace
            </p>
          </div>

          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="
              mt-1 flex w-full items-center gap-2
              rounded-lg px-3 py-2.5
              text-left text-sm font-medium
              text-red-600 transition
              hover:bg-red-50
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500
              focus-visible:ring-inset
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M10 17l5-5-5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M15 12H3"
                strokeLinecap="round"
              />

              <path
                d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

export default AccountMenu