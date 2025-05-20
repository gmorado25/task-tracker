import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
  fetch('/api/tasks')
    .then(res => res.json())
    .then(data => {
      console.log('Fetched tasks:', data);
      setTasks(data);
    })
    .catch(err => console.error('Error loading tasks:', err));
}, []);

  const addTask = async (text) => {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  const newTask = await res.json();
  setTasks(prev => [...prev, newTask]);
};

  const toggleTask = async (id) => {
    const res = await fetch(`/api/tasks/${id}`, { method: 'PATCH' });
    const updatedTask = await res.json();
    setTasks(tasks.map(task => task.id === id ? updatedTask : task));
  };

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Task Tracker</h1>
      <AddTask addTask={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;