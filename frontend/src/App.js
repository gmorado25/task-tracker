import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import TaskList from './components/Tasks/TaskList';
import AddTask from './components/Tasks/AddTask';
import { DragDropContext } from 'react-beautiful-dnd';
import FolderList from './components/Folders/FolderList';
import {
  fetchTasks,
  addTask as addTaskService,
  toggleTask as toggleTaskService,
  deleteTask as deleteTaskService,
  reorderTasks
} from './services/taskService';
import {
  fetchFolders,
  addFolder as addFolderService
} from './services/folderService';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const filter = searchParams.get('filter') || 'all';

  // Fetch folders
  useEffect(() => {
    const loadFolders = async () => {
      const data = await fetchFolders();
      setFolders(data);
      const general = data.find(f => f.name === 'General Tasks'); // Always select "General Tasks" folder by default
      if (general) setSelectedFolderId(general._id);
      else if (data.length) setSelectedFolderId(data[0]._id);
    };
    loadFolders();
  }, []);

  // Fetch tasks for selected folder
  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks(selectedFolderId);
      setTasks(data);
    };
    if (selectedFolderId) loadTasks();
  }, [selectedFolderId]);

  // Task CRUD
  const addTask = async (text, dueDate, priority) => {
    const newTask = await addTaskService(text, dueDate, priority, selectedFolderId);
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = async (id) => {
    const updatedTask = await toggleTaskService(id);
    setTasks(tasks.map(task => task._id === id ? updatedTask : task));
  };

  const deleteTask = async (id) => {
    await deleteTaskService(id);
    setTasks(tasks.filter(task => task._id !== id));
  };

  // Folder CRUD
  const addFolder = async (name) => {
    const newFolder = await addFolderService(name);
    setFolders(prev => [...prev, newFolder]);
    setSelectedFolderId(newFolder._id);
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
    await reorderTasks(reordered.map(t => t._id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 dark:text-pastel-blue">Task Tracker</h1>
      <button
        onClick={() => document.documentElement.classList.toggle('dark')}
        className="fixed top-4 right-4 bg-gray-300 dark:bg-gray-700 p-2 rounded"
      >
        Toggle Theme
      </button>
      <FolderList
        folders={folders}
        selectedFolderId={selectedFolderId}
        onSelect={setSelectedFolderId}
        onAdd={addFolder}
      />
      <AddTask addTask={addTask} />
      <div className="flex gap-2 mb-4">
        <button onClick={() => updateFilter('all')} className="px-2 py-1 bg-gray-300 rounded dark:bg-gray-600">All</button>
        <button onClick={() => updateFilter('active')} className="px-2 py-1 bg-gray-300 rounded dark:bg-gray-600">Active</button>
        <button onClick={() => updateFilter('completed')} className="px-2 py-1 bg-gray-300 rounded dark:bg-gray-600">Completed</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
      </DragDropContext>
    </div>
  );
}

export default App;