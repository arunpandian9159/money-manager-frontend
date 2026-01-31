const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cream p-4">
      {/* Subtle Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-[0.03] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.8'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Card Container */}
      <div className="relative z-10 flex w-full max-w-[480px] flex-col overflow-hidden rounded-2xl bg-white shadow-card border border-stone-100">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout

