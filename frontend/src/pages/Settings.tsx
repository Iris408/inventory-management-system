function Settings() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-900">
        Settings
      </h1>

      <div className="mt-8 max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Security & Data
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          PartsPilot uses hashed passwords, token-based session authentication,
          and HTTPS encryption for all data in transit. Demo account data is
          isolated from production data, reset periodically, and never shared
          with third parties. This project is built for demonstration purposes
          and is not intended to store real business or personal data.
        </p>
      </div>
    </div>
  )
}

export default Settings