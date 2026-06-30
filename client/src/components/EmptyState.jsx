export default function EmptyState({ onAddClick }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 animate-fade-in-up">
      {/* Icon */}
      <div className="w-20 h-20 rounded-2xl bg-[#141414] border border-[#2a2a2a] flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-[#666666]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-[#f5f5f5] mb-2">
        Henüz görev yok
      </h3>
      <p className="text-sm text-[#666666] text-center max-w-xs mb-8">
        İlk görevini ekleyerek başla. Organize ol, hedeflerine ulaş.
      </p>

      <button
        onClick={onAddClick}
        className="flex items-center gap-2 px-6 py-3 bg-[#c8ff00] hover:bg-[#d4ff33] text-[#0a0a0a] text-sm font-bold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-[0_0_24px_rgba(200,255,0,0.25)]"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        İlk Görevini Ekle
      </button>
    </div>
  );
}
