export interface Task {
  id: number;
  title: string;
  description?: string;
  completed?: boolean;
  createdAt?: string;
}

export interface TasksResponse {
  status: string;
  results: number;
  data: {
    tasks: Task[];
  };
}

export interface TaskResponse {
  status: string;
  data: {
    task: Task;
  };
}
