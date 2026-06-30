export default function DeleteConfirm({ isOpen, task, onConfirm, onCancel }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="w-full max-w-sm bg-[#111] border border-[#2a2a2a] rounded-2xl animate-slide-up overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#ff3b3b]/10 border border-[#ff3b3b]/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-[#ff3b3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-[#f5f5f5] mb-2">Görevi Sil</h3>
          <p className="text-sm text-[#a3a3a3] mb-1">
            <span className="font-semibold text-[#f5f5f5]">"{task.title}"</span>
          </p>
          <p className="text-sm text-[#666] mb-6">Bu işlem geri alınamaz.</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 py-3 bg-[#1e1e1e] border border-[#2a2a2a] text-[#a3a3a3] text-sm font-semibold rounded-xl hover:bg-[#2a2a2a] hover:text-[#f5f5f5] transition-all">
              İptal
            </button>
            <button id="confirm-delete-btn" onClick={() => onConfirm(task.id)} className="flex-1 py-3 bg-[#ff3b3b] hover:bg-[#ff5252] text-white text-sm font-bold rounded-xl transition-all active:scale-[0.98]">
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
