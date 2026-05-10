import { Task, TasksResponse, TaskResponse } from "./types";

const API_BASE = "/api/v1/tasks";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data: TasksResponse = await res.json();
  return data.data.tasks;
}

export async function createTask(
  task: Omit<Task, "id">
): Promise<Task> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) {
    throw new Error("Failed to create task");
  }
  const data: TaskResponse = await res.json();
  return data.data.task;
}

export async function updateTask(
  id: number,
  updates: Partial<Task>
): Promise<Task> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    throw new Error("Failed to update task");
  }
  const data: TaskResponse = await res.json();
  return data.data.task;
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok && res.status !== 204) {
    throw new Error("Failed to delete task");
  }
}
