"use client";

import { Check, Trash2, Circle } from "lucide-react";
import { Task } from "@/lib/types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const handleToggle = () => {
    onToggle(task.id, !task.completed);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div
      className={`group flex items-start gap-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-all hover:border-[var(--primary)]/30 ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      <button
        onClick={handleToggle}
        className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          task.completed
            ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]"
            : "border-[var(--muted-foreground)] hover:border-[var(--primary)]"
        }`}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed ? (
          <Check className="h-4 w-4" />
        ) : (
          <Circle className="h-4 w-4 opacity-0" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <h3
          className={`text-base font-medium text-[var(--foreground)] ${
            task.completed ? "line-through" : ""
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p
            className={`mt-1 text-sm text-[var(--muted-foreground)] ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.description}
          </p>
        )}
      </div>

      <button
        onClick={handleDelete}
        className="flex-shrink-0 rounded-lg p-2 text-[var(--muted-foreground)] opacity-0 transition-all hover:bg-[var(--destructive)]/10 hover:text-[var(--destructive)] group-hover:opacity-100"
        aria-label="Delete task"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}
