import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api/taskApi";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import DeleteConfirm from "./components/DeleteConfirm";
import EmptyState from "./components/EmptyState";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Görevler yüklenirken hata oluştu. Backend çalışıyor mu?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  // Handlers
  const handleAddClick = () => { setEditTask(null); setModalOpen(true); };

  const handleEdit = (task) => { setEditTask(task); setModalOpen(true); };

  const handleSubmit = async (data, id) => {
    if (id) {
      const updated = await updateTask(id, data);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } else {
      const created = await createTask(data);
      setTasks((prev) => [...prev, created]);
    }
  };

  const handleDeleteConfirm = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setDeleteTarget(null);
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Header taskCount={0} />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-9 w-20 bg-[#141414] rounded-xl animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 bg-[#141414] rounded-2xl border border-[#2a2a2a] animate-pulse" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-[#ff3b3b]/10 border border-[#ff3b3b]/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#ff3b3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#f5f5f5] mb-2">Bağlantı Hatası</h2>
          <p className="text-sm text-[#666] mb-6">{error}</p>
          <button onClick={fetchTasks} className="px-6 py-3 bg-[#c8ff00] text-[#0a0a0a] text-sm font-bold rounded-xl hover:bg-[#d4ff33] transition-all">
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header taskCount={tasks.length} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {tasks.length === 0 ? (
          <EmptyState onAddClick={handleAddClick} />
        ) : (
          <TaskList
            tasks={tasks}
            filter={filter}
            onFilterChange={setFilter}
            onEdit={handleEdit}
            onDelete={setDeleteTarget}
          />
        )}
      </main>

      {/* FAB — Add Task Button */}
      <button
        id="add-task-fab"
        onClick={handleAddClick}
        className="fixed bottom-8 right-8 z-50 group flex items-center gap-3 px-6 py-4 bg-[#c8ff00] hover:bg-[#d4ff33] text-[#0a0a0a] text-base font-bold rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(200,255,0,0.3)] hover:shadow-[0_0_50px_rgba(200,255,0,0.45)]"
      >
        <svg
          className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span>Yeni Görev</span>
      </button>

      {/* Modals */}
      <TaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} editTask={editTask} />
      <DeleteConfirm isOpen={!!deleteTarget} task={deleteTarget} onConfirm={handleDeleteConfirm} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
