import TaskCard from "./TaskCard";

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

export default function TaskList({ tasks, filter, onFilterChange, onEdit, onDelete }) {
  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.priority === filter);

  const sortedTasks = [...filteredTasks].sort(
    (a, b) =>
      (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3)
  );

  const filters = [
    { key: "all", label: "Tümü" },
    { key: "high", label: "Yüksek", color: "#ff3b3b" },
    { key: "medium", label: "Orta", color: "#ffb800" },
    { key: "low", label: "Düşük", color: "#00e676" },
  ];

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.key}
            id={`filter-${f.key}`}
            onClick={() => onFilterChange(f.key)}
            className={`
              flex items-center gap-2 px-6 py-3 text-[15px] font-semibold rounded-xl
              border transition-all duration-200 whitespace-nowrap
              ${
                filter === f.key
                  ? "bg-[#f5f5f5] text-[#0a0a0a] border-transparent"
                  : "bg-transparent text-[#a3a3a3] border-[#2a2a2a] hover:border-[#3a3a3a] hover:text-[#f5f5f5]"
              }
            `}
          >
            {f.color && (
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: f.color }}
              />
            )}
            {f.label}
            {f.key === "all" && (
              <span className="ml-1 text-[11px] opacity-60">
                ({tasks.length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Task Grid */}
      {sortedTasks.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <p className="text-[#666666] text-sm">
            Bu filtrede görev bulunamadı.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
