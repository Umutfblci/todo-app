"use client";

import { useState } from "react";
import { AddTaskForm } from "@/components/add-task-form";
import { TaskList } from "@/components/task-list";
import { CheckSquare } from "lucide-react";
import { Task } from "@/lib/types";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleToggleTask = (id: number, completed: boolean) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t))
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
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

        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />

        {tasks.length > 0 && (
          <footer className="mt-8 text-center text-sm text-[var(--muted-foreground)]">
            {tasks.filter((t) => t.completed).length} of {tasks.length} tasks
            completed
          </footer>
        )}
      </div>
    </main>
  );
}
