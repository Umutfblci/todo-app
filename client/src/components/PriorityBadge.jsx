export default function PriorityBadge({ priority }) {
  const labels = {
    high: "HIGH",
    medium: "MED",
    low: "LOW",
  };

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold tracking-widest rounded-md bg-black/15 text-black/80 border border-black/10 uppercase"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-black/60 animate-pulse" />
      {labels[priority] || "LOW"}
    </span>
  );
}
