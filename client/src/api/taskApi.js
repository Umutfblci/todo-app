import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/v1/tasks",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = async () => {
  const response = await API.get("/");
  return response.data.data.tasks;
};

export const createTask = async (taskData) => {
  const response = await API.post("/", taskData);
  return response.data.data.task;
};

export const updateTask = async (id, taskData) => {
  const response = await API.patch(`/${id}`, taskData);
  return response.data.data.task;
};

export const deleteTask = async (id) => {
  await API.delete(`/${id}`);
};
