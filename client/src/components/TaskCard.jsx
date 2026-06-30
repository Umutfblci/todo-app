import PriorityBadge from "./PriorityBadge";

export default function TaskCard({ task, onEdit, onDelete }) {
  const bgMap = {
    high: "bg-[#ff3b3b]",
    medium: "bg-[#ffb800]",
    low: "bg-[#00e676]",
  };

  const hoverBgMap = {
    high: "hover:bg-[#e63535]",
    medium: "hover:bg-[#e6a600]",
    low: "hover:bg-[#00cc69]",
  };

  const glowMap = {
    high: "hover:shadow-[0_0_40px_-5px_rgba(255,59,59,0.35)]",
    medium: "hover:shadow-[0_0_40px_-5px_rgba(255,184,0,0.35)]",
    low: "hover:shadow-[0_0_40px_-5px_rgba(0,230,118,0.35)]",
  };

  const priority = task.priority || "low";

  const formatDeadline = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

    const formatted = date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
    });

    if (diff < 0) return { text: `${formatted} — Gecikmiş`, urgent: true };
    if (diff === 0) return { text: `${formatted} — Bugün`, urgent: true };
    if (diff <= 2) return { text: `${formatted} — ${diff} gün kaldı`, urgent: true };
    return { text: formatted, urgent: false };
  };

  const deadline = formatDeadline(task.deadline);

  // Text colors — black on colored backgrounds
  const textPrimary = "text-black";
  const textSecondary = "text-black/70";
  const textMuted = "text-black/50";
  const borderColor = "border-black/15";

  return (
    <div
      className={`
        relative group rounded-2xl ${bgMap[priority]} border border-transparent
        p-6 overflow-hidden transition-all duration-300 ease-out text-center
        ${hoverBgMap[priority]} hover:-translate-y-1
        ${glowMap[priority] || ""}
        card-stagger animate-fade-in-up
      `}
    >
      {/* Top Row: Priority + Actions */}
      <div className="flex items-center justify-between mb-3">
        <PriorityBadge priority={priority} />

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {/* Edit Button */}
          <button
            id={`edit-task-${task.id}`}
            onClick={() => onEdit(task)}
            className={`p-2 rounded-lg hover:bg-black/15 ${textMuted} hover:text-white transition-colors duration-150`}
            title="Düzenle"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>

          {/* Delete Button */}
          <button
            id={`delete-task-${task.id}`}
            onClick={() => onDelete(task)}
            className={`p-2 rounded-lg hover:bg-black/15 ${textMuted} hover:text-white transition-colors duration-150`}
            title="Sil"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className={`text-[15px] font-semibold ${textPrimary} mb-1.5 leading-snug break-words`}>
        {task.title || "Başlıksız Görev"}
      </h3>

      {/* Description */}
      {task.description && (
        <p className={`text-[13px] ${textSecondary} leading-relaxed mb-3 line-clamp-2 break-words`}>
          {task.description}
        </p>
      )}

      {/* Deadline */}
      {deadline && (
        <div className={`flex items-center justify-center gap-1.5 mt-auto pt-3 border-t ${borderColor}`}>
          <svg
            className={`w-3.5 h-3.5 ${textMuted}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <span className={`text-[12px] font-medium ${textMuted}`}>
            {deadline.text}
          </span>
        </div>
      )}
    </div>
  );
}
