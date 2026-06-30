import { useState, useEffect, useRef } from "react";

export default function TaskModal({ isOpen, onClose, onSubmit, editTask }) {
  const [form, setForm] = useState({ title: "", description: "", priority: "medium", deadline: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleRef = useRef(null);
  const isEdit = !!editTask;

  useEffect(() => {
    if (isOpen) {
      if (editTask) {
        setForm({ title: editTask.title || "", description: editTask.description || "", priority: editTask.priority || "medium", deadline: editTask.deadline || "" });
      } else {
        setForm({ title: "", description: "", priority: "medium", deadline: "" });
      }
      setErrors({});
      setTimeout(() => titleRef.current?.focus(), 100);
    }
  }, [isOpen, editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setErrors({ title: "Başlık zorunludur" }); return; }
    setIsSubmitting(true);
    try {
      await onSubmit({ title: form.title.trim(), description: form.description.trim(), priority: form.priority, deadline: form.deadline || undefined }, editTask?.id);
      onClose();
    } catch (err) { console.error(err); }
    finally { setIsSubmitting(false); }
  };

  if (!isOpen) return null;

  const priorities = [
    { value: "high", label: "Yüksek", color: "#ff3b3b" },
    { value: "medium", label: "Orta", color: "#ffb800" },
    { value: "low", label: "Düşük", color: "#00e676" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in" style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-lg bg-[#111] border border-[#2a2a2a] rounded-2xl animate-slide-up overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a]">
          <h2 className="text-lg font-bold text-[#f5f5f5]">{isEdit ? "Görevi Düzenle" : "Yeni Görev"}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#2a2a2a] text-[#666] hover:text-[#f5f5f5] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="task-title" className="block text-[12px] font-semibold text-[#a3a3a3] uppercase tracking-wider mb-2">Başlık *</label>
            <input ref={titleRef} id="task-title" type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Görevin adı..." className={`w-full px-4 py-3 bg-[#1e1e1e] border rounded-xl text-sm text-[#f5f5f5] placeholder-[#666] outline-none transition-colors ${errors.title ? "border-[#ff3b3b]" : "border-[#2a2a2a] focus:border-[#c8ff00]"}`} />
            {errors.title && <p className="mt-1.5 text-xs text-[#ff3b3b]">{errors.title}</p>}
          </div>
          <div>
            <label htmlFor="task-desc" className="block text-[12px] font-semibold text-[#a3a3a3] uppercase tracking-wider mb-2">Açıklama</label>
            <textarea id="task-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Detayları ekle..." rows={3} className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl text-sm text-[#f5f5f5] placeholder-[#666] outline-none transition-colors focus:border-[#c8ff00] resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#a3a3a3] uppercase tracking-wider mb-2">Öncelik</label>
              <div className="flex gap-2">
                {priorities.map((p) => (
                  <button key={p.value} type="button" onClick={() => setForm({ ...form, priority: p.value })} className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${form.priority === p.value ? "border-transparent text-[#0a0a0a]" : "bg-transparent border-[#2a2a2a] text-[#666] hover:border-[#3a3a3a]"}`} style={form.priority === p.value ? { backgroundColor: p.color } : {}}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="task-deadline" className="block text-[12px] font-semibold text-[#a3a3a3] uppercase tracking-wider mb-2">Son Tarih</label>
              <input id="task-deadline" type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="w-full px-4 py-2.5 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl text-[13px] text-[#f5f5f5] outline-none transition-colors focus:border-[#c8ff00] [color-scheme:dark]" />
            </div>
          </div>
          <button id="submit-task-btn" type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-[#c8ff00] hover:bg-[#d4ff33] text-[#0a0a0a] text-sm font-bold rounded-xl transition-all hover:shadow-[0_0_24px_rgba(200,255,0,0.25)] disabled:opacity-50 active:scale-[0.98]">
            {isSubmitting ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Görev Ekle"}
          </button>
        </form>
      </div>
    </div>
  );
}
