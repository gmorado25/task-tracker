import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState([]);
  const filter = searchParams.get('filter') || 'all';

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (text, dueDate, priority) => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, dueDate, priority })
    });
    const newTask = await res.json();
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = async (id) => {
    const res = await fetch(`/api/tasks/${id}`, { method: 'PATCH' });
    const updatedTask = await res.json();
    setTasks(tasks.map(task => task._id === id ? updatedTask : task));
  };

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task._id !== id));
  };

  const updateFilter = (newFilter) => {
    setSearchParams({ filter: newFilter });
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setTasks(reordered);

    // ✅ New: Save order to backend
    await fetch('/api/tasks/reorder', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reorderedIds: reordered.map(t => t._id) })
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Habit Tracker</h1>
      <AddTask addTask={addTask} />
      <div style={{ marginBottom: '16px' }}>
        <button onClick={() => updateFilter('all')}>All</button>
        <button onClick={() => updateFilter('active')}>Active</button>
        <button onClick={() => updateFilter('completed')}>Completed</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
      </DragDropContext>
    </div>
  );
}

export default App;