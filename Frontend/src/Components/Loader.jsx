function Loader({ message = "Consulting the prophecy..." }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FFFDF8]">

      <div className="relative w-24 h-24 mb-8">

        <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#D8C9E8] via-[#E8DFF2] to-[#F6EFE3] animate-ping opacity-40" />

        <div className="absolute inset-2 rounded-full bg-linear-to-br from-[#B89FD6] via-[#C9B8E0] to-[#E8DFF2] animate-pulse shadow-lg shadow-[#4C3D63]/20" />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl animate-bounce" style={{ animationDuration: "1.6s" }}>
            🌙
          </span>
        </div>

        <div className="absolute -top-1 -right-1 text-base animate-pulse" style={{ animationDelay: "0.3s" }}>
          ✨
        </div>
        <div className="absolute -bottom-1 -left-1 text-sm animate-pulse" style={{ animationDelay: "0.7s" }}>
          ✨
        </div>

      </div>

      <p className="text-[#4C3D63] text-lg font-semibold tracking-wide mb-2">
        {message}
      </p>

      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#C9B8E0] animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 rounded-full bg-[#B89FD6] animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 rounded-full bg-[#A887D0] animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>

    </div>
  );
}

export default Loader;