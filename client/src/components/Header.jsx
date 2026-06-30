export default function Header({ taskCount }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#c8ff00] flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#0a0a0a]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#f5f5f5]">
              TASK<span className="text-[#c8ff00]">R</span>
            </h1>
            <p className="text-[11px] text-[#666666] font-medium tracking-wider uppercase">
              {taskCount} görev aktif
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

