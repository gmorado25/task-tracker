import React, { useEffect, useState } from 'react';
import TaskList from './components/Tasks/TaskList';
import Modal from '../components/Modal';
import AddTask from './components/Tasks/AddTask';
import { deleteFolder as deleteFolderService } from '../services/folderService';
import { DragDropContext } from 'react-beautiful-dnd';
import FolderList from './components/Folders/FolderList';
import {
    fetchTasks,
    addTask as addTaskService,
    toggleTask as toggleTaskService,
    deleteTask as deleteTaskService,
    reorderTasks
} from '../services/taskService';
import {
    fetchFolders,
    addFolder as addFolderService
} from '../services/folderService';
import { useSearchParams } from 'react-router-dom';

function Dashboard() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [tasks, setTasks] = useState([]);
    const [folders, setFolders] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [viewAll, setViewAll] = useState(false);
    const [showAddFolder, setShowAddFolder] = useState(false);
    const [showAddTask, setShowAddTask] = useState(false);
    const [expandedFolderId, setExpandedFolderId] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const filter = searchParams.get('filter') || 'all';

    useEffect(() => {
        const loadFolders = async () => {
            const data = await fetchFolders();
            setFolders(data);
            const general = data.find(f => f.name === 'General Tasks');
            if (general) setSelectedFolderId(general._id);
            else if (data.length) setSelectedFolderId(data[0]._id);
        };
        loadFolders();
    }, []);

    useEffect(() => {
        const loadTasks = async () => {
            const data = await fetchTasks(selectedFolderId);
            setTasks(data);
        };
        if (selectedFolderId) loadTasks();
    }, [selectedFolderId]);

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

    const addFolder = async (name) => {
        const newFolder = await addFolderService(name);
        setFolders(prev => [...prev, newFolder]);
        setSelectedFolderId(newFolder._id);
    };

    const deleteFolder = async (id) => {
        await deleteFolderService(id);
        setFolders(folders.filter(f => f._id !== id));
        if (selectedFolderId === id) {
            setSelectedFolderId(folders.length > 1 ? folders.find(f => f._id !== id)._id : null);
        }
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
    <div className="flex gap-2 mb-4 items-center">
      <button
        className="bg-pastel-blue text-black font-semibold px-4 py-2 rounded hover:bg-pastel-green transition"
        onClick={() => setShowAddFolder(true)}
      >
        Add Folder
      </button>
      <button
        className="bg-pastel-blue text-black font-semibold px-4 py-2 rounded hover:bg-pastel-green transition"
        onClick={() => setShowAddTask(true)}
      >
        Add Task
      </button>
      {/* Filter Dropdown */}
      <div className="relative ml-auto">
        <button
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          onClick={() => setShowFilters(f => !f)}
          aria-label="Filter"
        >
          {/* Filter SVG */}
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 017 17v-3.586a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
        </button>
        {showFilters && (
          <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
            <button onClick={() => updateFilter('all')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">All</button>
            <button onClick={() => updateFilter('active')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Active</button>
            <button onClick={() => updateFilter('completed')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Completed</button>
          </div>
        )}
      </div>
      <button
        className={`px-4 py-2 rounded font-semibold transition ${viewAll ? 'bg-pastel-green' : 'bg-gray-200 dark:bg-gray-700'}`}
        onClick={() => setViewAll(v => !v)}
      >
        {viewAll ? 'Viewing All Tasks' : 'View All Tasks'}
      </button>
    </div>
    {/* View indicator */}
    {!viewAll && expandedFolderId && (
      <div className="mb-2 text-sm text-gray-500 font-semibold">
        Folder view: {folders.find(f => f._id === expandedFolderId)?.name}
      </div>
    )}
    {viewAll && (
      <div className="mb-2 text-sm text-gray-500 font-semibold">
        Viewing all tasks
      </div>
    )}
    {/* Folder Stack and All Tasks View inside DragDropContext */}
    <DragDropContext onDragEnd={handleDragEnd}>
      {!viewAll && (
        <ul className="mb-6">
          {folders.map(folder => (
            <li key={folder._id} className="mb-2 border rounded shadow-sm bg-white dark:bg-gray-900">
              <div className="flex items-center px-2 py-2">
                <button
                  onClick={() => setExpandedFolderId(expandedFolderId === folder._id ? null : folder._id)}
                  className="flex items-center flex-1 text-left gap-2"
                >
                  {expandedFolderId === folder._id ? (
                    // Down arrow
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    // Right arrow
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    {folder.name}
                  </span>
                </button>
                <button
                  onClick={() => deleteFolder(folder._id)}
                  className="ml-2 p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 transition"
                  title="Delete Folder"
                >
                  {/* Trash icon */}
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {expandedFolderId === folder._id && (
                <div className="pl-8 pb-3">
                  <TaskList
                    tasks={tasks.filter(t => t.folder === folder._id)}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    droppableId={folder._id}
                    grouped
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      {viewAll && (
        <div className="mb-6 border rounded shadow-sm bg-white dark:bg-gray-900 p-4">
          <h2 className="text-xl font-semibold mb-2">All Tasks</h2>
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            droppableId="all-tasks"
            grouped={false}
          />
        </div>
      )}
    </DragDropContext>
    {/* Modals */}
    <Modal
      open={showAddFolder}
      onClose={() => setShowAddFolder(false)}
      title="Add Folder"
      onAction={() => document.getElementById('add-folder-form').requestSubmit()}
      actionLabel="Add Folder"
    >
      <form
        id="add-folder-form"
        onSubmit={async (e) => {
          e.preventDefault();
          const name = e.target.folderName.value;
          await addFolder(name);
          setShowAddFolder(false);
        }}
      >
        <input name="folderName" placeholder="Enter folder name" className="p-2 border rounded w-full mb-4" required />
      </form>
    </Modal>
    <Modal
      open={showAddTask}
      onClose={() => setShowAddTask(false)}
      title="Add Task"
      onAction={() => document.getElementById('add-task-form').requestSubmit()}
      actionLabel="Add Task"
    >
      <AddTask
        addTask={async (text, dueDate, priority, folderId) => {
          await addTask(text, dueDate, priority, folderId);
          setShowAddTask(false);
        }}
        folders={folders}
        defaultFolderId={selectedFolderId}
      />
    </Modal>
  </div>
    );
}

export default Dashboard;