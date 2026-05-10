"use client";

import { Task } from "@/lib/types";
import { TaskItem } from "./task-item";
import { ClipboardList } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-[var(--muted-foreground)]">
        <ClipboardList className="mb-4 h-16 w-16 opacity-40" />
        <p className="text-lg">No tasks yet</p>
        <p className="text-sm">Add your first task above</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pendingTasks.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
            Pending ({pendingTasks.length})
          </h2>
          <div className="space-y-2">
            {pendingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
            Completed ({completedTasks.length})
          </h2>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
