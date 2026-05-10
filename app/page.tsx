"use client";

import useSWR from "swr";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/lib/api";
import { AddTaskForm } from "@/components/add-task-form";
import { TaskList } from "@/components/task-list";
import { CheckSquare, Loader2 } from "lucide-react";

export default function Home() {
  const {
    data: tasks,
    error,
    isLoading,
    mutate,
  } = useSWR("tasks", fetchTasks, {
    refreshInterval: 5000,
  });

  const handleAddTask = async (title: string, description: string) => {
    const newTask = await createTask({
      title,
      description,
      completed: false,
    });
    mutate([...(tasks || []), newTask], false);
  };

  const handleToggleTask = async (id: number, completed: boolean) => {
    await updateTask(id, { completed });
    mutate(
      tasks?.map((t) => (t.id === id ? { ...t, completed } : t)),
      false
    );
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    mutate(
      tasks?.filter((t) => t.id !== id),
      false
    );
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <header className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="rounded-xl bg-[var(--primary)] p-3">
              <CheckSquare className="h-8 w-8 text-[var(--primary-foreground)]" />
            </div>
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Task Tracker
          </h1>
          <p className="mt-2 text-[var(--muted-foreground)]">
            Keep track of your daily tasks easily
          </p>
        </header>

        <div className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <AddTaskForm onAdd={handleAddTask} />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
          </div>
        ) : error ? (
          <div className="rounded-lg border border-[var(--destructive)]/30 bg-[var(--destructive)]/10 p-4 text-center text-[var(--destructive)]">
            <p>Failed to load tasks. Make sure the backend is running.</p>
            <p className="mt-1 text-sm opacity-80">
              Run &quot;node app.js&quot; in the project root
            </p>
          </div>
        ) : (
          <TaskList
            tasks={tasks || []}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        )}

        {tasks && tasks.length > 0 && (
          <footer className="mt-8 text-center text-sm text-[var(--muted-foreground)]">
            {tasks.filter((t) => t.completed).length} of {tasks.length} tasks
            completed
          </footer>
        )}
      </div>
    </main>
  );
}
